import { Table, MenuItem, Select, TableCell, TableBody, TableContainer, TableHead, TableRow, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { OrderType } from "../../../../data/interface/user"
import DrawerFilterStatistik from "./DrawerFilterStatistik"
import { AscSort, DescSort } from '../../../../components/icons/sort';
import Rating from "@mui/material/Rating"
import { getListFeedbackService, getListStatistikService, getListVisitorService, getSummaryCount, getVisitorDeviceService } from "../../../../services/statistik"
import excel from 'exceljs';
import { formatDate } from "../../../../utils/Helpers"
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';

export default function StatistikDesktop() {
    const [year, setYear] = useState(2024)
    const [order, setOrder] = useState<OrderType>('asc');
    const [orderBy, setOrderBy] = useState('created_at');

    const tabStatistik = [
        'Permohonan',
        'Kunjungan'
    ]

    const [activeTab, setActiveTab] = useState('Permohonan')
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    const [summary, setSummary] = useState({
        process: 0,
        done: 0,
        feedback: 0,
        visitor_this_month: 0
    })
    const [listStatistik, setListStatistik] = useState([])
    const [listVisitor, setListVisitor] = useState([])

    const [listFeedback, setListFeedback] = useState([])
    const [deviceVisitor, setDeviceVisitor] = useState([])

    const handleSortChange = () => {
        setPage(1)
        if (order === 'asc') {
            setOrder('desc');
        } else {
            setOrder('asc');
        }
    };

    async function getSummary() {
        const res = await getSummaryCount()
        setSummary({
            process: Number(res.process),
            done: Number(res.done),
            feedback: Number(res.feedback),
            visitor_this_month: Number(res.visitor_this_month)
        })
    }

    async function getListStatistik() {
        const res = await getListStatistikService(year)
        setListStatistik(res)
    }

    async function getListVisitor() {
        const res = await getListVisitorService(year)
        setListVisitor(res)
    }

    async function getListFeedback() {
        const res = await getListFeedbackService(page, perPage, order, orderBy)
        setListFeedback(res)
    }

    async function getVisitorDevice() {
        const res = await getVisitorDeviceService()
        setDeviceVisitor(res)
    }

    useEffect(() => {
        getListFeedback()
    }, [page, perPage, order, orderBy])

    useEffect(() => {
        getListStatistik()
        getListVisitor()
    }, [year])


    useEffect(() => {
        getSummary()
        getVisitorDevice()
    }, [])

    const downloadDataStatistik = () => {
        const filename = 'Statistika_KRK'; // You can customize the filename
        const wb = new excel.Workbook();
        const sheet = wb.addWorksheet('Data Pengajuan');

        // Set column headers
        sheet.addRow(['Bulan', 'Pengajuan Masuk', 'Pengajuan Selesai']);

        // Add data to the sheet
        listStatistik.forEach((item: any) => {
            sheet.addRow([item.bulan, item.pengajuan_masuk, item.pengajuan_selesai]);
        });

        // Set column widths for better readability
        sheet.getColumn('A').width = 15; // Bulan
        sheet.getColumn('B').width = 20; // Pengajuan Masuk
        sheet.getColumn('C').width = 20; // Pengajuan Selesai

        // Create the download link for the generated XLSX file
        wb.xlsx.writeBuffer().then(function (buffer) {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `${filename}.xlsx`;
            anchor.dispatchEvent(new MouseEvent('click'));
            window.URL.revokeObjectURL(url);
        });
    };

    const downloadDataVisitor = () => {
        const filename = 'Visitor_KRK'; // You can customize the filename
        const wb = new excel.Workbook();
        const sheet = wb.addWorksheet('Data Visitor');

        // Set column headers
        sheet.addRow(['Bulan', 'Kunjungan', 'Akun Baru', 'Rating Rata-Rata']);

        // Add data to the sheet
        listVisitor.forEach((item: any) => {
            sheet.addRow([item.bulan, item.total_visitors, item.total_user, item.avg_feedback]);
        });

        // Set column widths for better readability
        sheet.getColumn('A').width = 15; // Bulan
        sheet.getColumn('B').width = 20; // Pengajuan Masuk
        sheet.getColumn('C').width = 20; // Pengajuan Selesai
        sheet.getColumn('D').width = 20; // Pengajuan Selesai

        // Create the download link for the generated XLSX file
        wb.xlsx.writeBuffer().then(function (buffer) {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `${filename}.xlsx`;
            anchor.dispatchEvent(new MouseEvent('click'));
            window.URL.revokeObjectURL(url);
        });
    }


    const handleDownloadData = () => {
        if (activeTab == 'Permohonan') {
            downloadDataStatistik()
        } else {
            downloadDataVisitor()
        }
    }
    return (
        <>
            <div className="w-full mt-10 px-10">
                <div className=" flex justify-between px-40">
                    <div className="flex flex-col items-center">
                        <div className="text-[60px] font-semibold">{summary.visitor_this_month}</div>
                        <div className="text-[20px]">Kunjungan web bulan ini</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[60px] font-semibold">{summary.process}</div>
                        <div className="text-[20px]">Permohonan diproses</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[60px] font-semibold">{summary.done}</div>
                        <div className="text-[20px]">KRK terbit</div>
                    </div>
                </div>
                <div className="mt-16">
                    <div className="flex justify-center text-xl font-semibold">Data Statistik Web Aplikasi</div>
                </div>
                <div className="mt-10 w-2/3 pl-10">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex gap-4">
                            {tabStatistik.map((item) => (
                                <Button size="small" variant="contained" className={`!py-3 md:!py-0.5  !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap ${item == activeTab ? `!bg-gblue-500` : `!bg-[#ADADAD] !text-white`}`} onClick={() => setActiveTab(item)}>{item}</Button>
                            ))}

                        </div>
                        <div className="flex flex-row gap-4">
                            <Select variant='outlined' color='secondary' size='small' value={year} onChange={e => setYear(Number(e.target.value))} className='!rounded-xl' sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                            }}>
                                <MenuItem key={2022} value={2022}>{2022}</MenuItem>
                                <MenuItem key={2023} value={2023}>{2023}</MenuItem>
                                <MenuItem key={2024} value={2024}>{2024}</MenuItem>

                            </Select>
                            <Button size="small" className="!py-2 md:!py-0.2  !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" variant="contained" color="success" onClick={handleDownloadData}>Download Data</Button>
                        </div>
                    </div>
                    {
                        activeTab == 'Permohonan' ? (<div className="rounded-2xl overflow-hidden border mt-4">
                            <TableContainer >
                                <Table size="small">
                                    <TableHead className="bg-gdarkgray-500">
                                        <TableRow>
                                            <TableCell className="!font-heebo !text-base" align="center" width={20}>No</TableCell>
                                            <TableCell className="!font-heebo !text-base" align="center">Bulan</TableCell>
                                            <TableCell className="!font-heebo !text-base" align="center">Pengajuan Masuk</TableCell>
                                            <TableCell className="!font-heebo !text-base" align="center">Pengajuan Selesai</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listStatistik.map((item: any, key: any) => (
                                            <TableRow>
                                                <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{key + 1}</TableCell>
                                                <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.bulan}</TableCell>
                                                <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.pengajuan_masuk}</TableCell>
                                                <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.pengajuan_selesai}</TableCell>

                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>) : (
                            <>
                                <div className="rounded-2xl overflow-hidden border mt-4 mb-4">
                                    <TableContainer >
                                        <Table size="small">
                                            <TableHead className="bg-gdarkgray-500">
                                                <TableRow>
                                                    <TableCell className="!font-heebo !text-base" align="center" width={20}>No</TableCell>
                                                    <TableCell className="!font-heebo !text-base" align="center">Bulan</TableCell>
                                                    <TableCell className="!font-heebo !text-base" align="center">Kunjungan Web</TableCell>
                                                    <TableCell className="!font-heebo !text-base" align="center">Akun Baru</TableCell>
                                                    <TableCell className="!font-heebo !text-base" align="center">Rating Rata-Rata</TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listVisitor.map((item: any, key: any) => (
                                                    <TableRow>
                                                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{key + 1}</TableCell>
                                                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.bulan}</TableCell>
                                                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.total_visitors}</TableCell>
                                                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.total_user}</TableCell>
                                                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.avg_feedback}</TableCell>
                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <VisitorDevice data={deviceVisitor} />
                            </>
                        )
                    }

                </div>
                <div className="mt-16">
                    <div className="flex justify-center text-xl font-semibold">Ulasan Pengguna Kerenka</div>
                </div>
                <div className="mt-10">
                    <div className="flex">
                        <DrawerFilterStatistik
                            handleChangeOrderBy={setOrderBy}
                            orderBy={orderBy}
                        />
                        <div className="inline-block flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-[#4D4D4D] shadow-lg" onClick={() => handleSortChange()}>{order == 'asc' ? <AscSort /> : <DescSort className="w-[1rem]" />}</div>
                    </div>
                </div>
                <div className="mt-4 px-10 flex flex-col gap-4">
                    {
                        listFeedback.map((item: any, key: any) => (
                            <>
                                <div className="bg-[#4D4D4D] py-6 px-6 rounded-xl">
                                    <div className="flex justify-between items-center text-sm " key={key}>
                                        <div>
                                            {formatDate(item.created_at, 'DD MM YYYY HH:mm', 'long')}
                                        </div>
                                        <div>
                                            <Rating size="small" name="read-only" value={item.rating} readOnly />

                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold mt-6  text-[#F4BF37]">
                                        {item.user.name}
                                    </div>
                                    <div className=" text-lg font-semibold">
                                        Ulasan :
                                    </div>
                                    <div>
                                        {item.feedback}
                                    </div>

                                </div>

                            </>
                        ))
                    }
                </div>


            </div>
        </>
    )
}

interface VisitorDeviceProps {
    data: {
        value: number,
        user_agent: string,
        percent: number,
        label: string
    }[]
}

function VisitorDevice(props: VisitorDeviceProps) {
    const { data } = props
    const valueFormatter: any = (item: { total: number, value: number }) => `${item.value}`;


    return (
        <>
            <div className=" text-xl">Device Pengguna</div>
            <div>
                <PieChart
                    sx={{
                        [`& .${pieArcClasses.root}`]: {
                            stroke: "white", // Set border color
                        },
                    }}
                    height={300}
                    series={[
                        {
                            data: data,
                            innerRadius: 50,
                            arcLabel: (params: any) => `${params.percent.toFixed(2)}%`,
                            arcLabelMinAngle: 20,
                            valueFormatter,

                        },

                    ]}
                    skipAnimation={false}

                />
            </div>
        </>
    )
}
import { Table, TableBody, TableCell, Select, MenuItem, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { OrderType } from "../../../../data/interface/user"
import DrawerFilterStatistik from "./DrawerFilterStatistik"
import { AscSort, DescSort } from '../../../../components/icons/sort';
import Rating from "@mui/material/Rating"
import { getListFeedbackService, getListVisitorService, getListStatistikService, getSummaryCount } from "../../../../services/statistik"
import { formatDate } from "../../../../utils/Helpers"



export default function StatistikMobile() {
    const [year, setYear] = useState(2024)
    const [order, setOrder] = useState<OrderType>('asc');
    const [orderBy, setOrderBy] = useState('created_at');

    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    const [summary, setSummary] = useState({
        process: 0,
        done: 0,
        feedback: 0
    })
    const [listStatistik, setListStatistik] = useState([])
    const [listVisitor, setListVisitor] = useState([])
    const [listFeedback, setListFeedback] = useState([])
    const [activeTabMenu, setActiveMenu] = useState('permohonan')
    const tabMenu = [
        {
            key: 'permohonan',
            label: 'Permohonan'
        },
        {
            key: 'kunjungan',
            label: 'Kunjungan'
        },
        {
            key: 'rating',
            label: 'Rating'
        }
    ]


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
            feedback: Number(res.feedback)
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

    useEffect(() => {
        getListFeedback()
    }, [page, perPage, order, orderBy])

    useEffect(() => {
        getListStatistik()
        getListVisitor()
    }, [year])


    useEffect(() => {
        getSummary()
    }, [])

    return (
        <>
            <div className="mt-10 w-full">
                <div className="px-4">
                    <div className="flex w-full gap-2">
                        <div className="w-1/2 bg-[#4D4D4D] flex-col py-2  rounded-md flex justify-center items-center">
                            <div className="text-[#B3B3B3] text-xs">
                                Total Feedback
                            </div>
                            <div className="text-4xl font-semibold py-4">
                                {summary.feedback}
                            </div>
                        </div>
                        <div className="w-1/2 bg-[#4D4D4D] flex-col py-2  rounded-md flex justify-center items-center">
                            <div className="text-[#B3B3B3] text-xs">
                                Permohonan diproses
                            </div>
                            <div className="text-4xl font-semibold py-4">
                                {summary.process}
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 bg-[#4D4D4D] flex-col py-2  rounded-md flex justify-center items-center">
                        <div className="text-[#B3B3B3] text-xs">
                            Total KRK terbit bulan ini
                        </div>
                        <div className="text-4xl font-semibold py-4">
                            {summary.done}
                        </div>
                    </div>
                </div>
                <div className="text-lg font-semibold mt-8 flex justify-center">
                    Data Statistik Web Aplikasi
                </div>
                <div className="mt-8 w-full">
                    <Select variant='outlined' color='secondary' size='small' value={year} onChange={e => setYear(Number(e.target.value))} className='!rounded-xl !text-center !w-full' sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    }}>
                        <MenuItem key={2022} value={2022}>{2022}</MenuItem>
                        <MenuItem key={2023} value={2023}>{2023}</MenuItem>
                        <MenuItem key={2024} value={2024}>{2024}</MenuItem>
                        <MenuItem key={2024} value={2025}>{2025}</MenuItem>


                    </Select>
                </div>
                <div className="mt-4 flex gap-2  justify-center">
                    {tabMenu.map((menu) => (
                        <div className={`w-full justify-center items-center text-center border ${menu.key == activeTabMenu ? 'border-[#F4BF37] text-[#F4BF37]' : 'border-white text-white'} p-2 rounded-full cursor-pointer"`} onClick={() => setActiveMenu(menu.key)}>
                            {menu.label}
                        </div>
                    ))}
                </div>
                <div className="mt-4 bg-[#4D4D4D] p-4 rounded-xl">
                    {activeTabMenu == 'permohonan' ? (
                        <StatistikaTable data={listStatistik} />
                    ) : (<></>)}

                    {activeTabMenu == 'kunjungan' ? (
                        <KunjunganTable data={listVisitor} />
                    ) : (<></>)}

                    {activeTabMenu == 'rating' ? (
                        <RatingTable data={listVisitor} />
                    ) : (<></>)}
                </div>
                <div className="mt-8">
                    <div className="flex justify-center text-xl font-semibold">Ulasan Pengguna Kerenka</div>
                </div>
                <div className="mt-6">
                    <div className="flex">
                        <DrawerFilterStatistik
                            handleChangeOrderBy={setOrderBy}
                            orderBy={orderBy}
                        />
                        <div className="inline-block flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-[#4D4D4D] shadow-lg" onClick={() => handleSortChange()}>{order == 'asc' ? <AscSort /> : <DescSort className="w-[1rem]" />}</div>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    {
                        listFeedback.map((item: any, key: any) => (
                            <div className="bg-[#4D4D4D] py-6 px-6 rounded-xl" key={key}>
                                <div className="flex justify-between items-center text-sm ">
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
                        ))
                    }
                </div>
            </div>
        </>
    )
}

function StatistikaTable({ data }: any) {
    return (
        <TableContainer className="border border-[#B3B3B3]">
            <Table size="small">
                <TableHead className="bg-[#6666]">
                    <TableRow>
                        <TableCell className="!font-heebo !text-base" align="center">Bulan</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Baru</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Selesai</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: any, key: any) => (
                        <TableRow key={key}>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.bulan}</TableCell>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.pengajuan_masuk}</TableCell>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.pengajuan_selesai}</TableCell>

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

function KunjunganTable({ data }: any) {
    return (
        <TableContainer className="border border-[#B3B3B3]">
            <Table size="small">
                <TableHead className="bg-[#6666]">
                    <TableRow>
                        <TableCell className="!font-heebo !text-base" align="center">Bulan</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Kunjungan</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Akun Baru</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: any, key: any) => (
                        <TableRow key={key}>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.bulan}</TableCell>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.total_visitors}</TableCell>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.total_user}</TableCell>

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}


function RatingTable({ data }: any) {
    return (
        <TableContainer className="border border-[#B3B3B3]">
            <Table size="small">
                <TableHead className="bg-[#6666]">
                    <TableRow>
                        <TableCell className="!font-heebo !text-base" align="center">Bulan</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Rating rata-rata</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item: any, key: any) => (
                        <TableRow key={key}>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.bulan}</TableCell>
                            <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{item?.avg_feedback}</TableCell>

                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}
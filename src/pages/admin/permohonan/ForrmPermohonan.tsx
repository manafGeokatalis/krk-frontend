import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { createNotifcation } from "../../../utils/Helpers";
import { useRecoilState } from "recoil";
import { notification } from "../../../utils/Recoils";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button, Typography } from "@mui/material";
import { ucwords } from "../../../utils/Helpers";
import excel from 'exceljs';

type Props = {
    title?: string;
}
export default function FormPermohonan({ title = 'Form Permohonan' }: Props) {
    const params = useParams();
    const [_n, setN] = useRecoilState<any>(notification);
    const [data, setData] = useState<any>()
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const query: any = await axios.get(`/permohonan/${params.uuid}`);
            const datas = query?.data?.data;
            setData(datas)
        } catch (error: any) {
            setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));

        }
    }

    const downloadForm = (data: any) => {
        const filename = (`KerenkaMaBarForm[${data.registration_number}]`);
        const wb = new excel.Workbook();
        const sheet = wb.addWorksheet(data.registration_number);
        sheet.addRow(['', 'Form Permohonan Penerbitan Dokumen KRK (Keterangan Rencana Kabupaten)']);

        sheet.getColumn('A').width = 5;
        sheet.getColumn('B').width = 25;
        sheet.getColumn('C').width = 50;
        sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center' };

        sheet.getCell('B1').font = { bold: true };

        sheet.addRow(['', 'Data Pemohon']);
        sheet.getCell('B2').font = { bold: true };
        sheet.addRow([1, 'Nama Pemohon', data.name]);
        sheet.addRow([2, 'Email Pemohon *', data.email]);
        sheet.addRow([3, 'Whatsapp *', data.wa]);
        sheet.addRow([4, 'Whatsapp kuasa', data.wa_kuasa]);
        sheet.addRow([5, 'Provinsi', ucwords(data.provinsi?.name.toLowerCase())]);
        sheet.addRow([6, 'Kabupaten / Kota', ucwords(data.kabupaten?.name.toLowerCase())]);
        sheet.addRow([7, 'Kecamatan', data.kecamatan?.name]);
        sheet.addRow([8, 'Desa / Kelurahan',]);
        sheet.addRow([9, 'Alamat Lengkap', data.alamat]);

        sheet.addRow(['']);

        sheet.addRow(['', 'Lokasi Izin']);
        sheet.getCell('B13').font = { bold: true };
        sheet.addRow([1, 'Provinsi', ucwords(data.lokasi_provinsi.name.toLowerCase())]);
        sheet.addRow([2, 'Kabupaten / Kota', ucwords(data.lokasi_kabupaten.name.toLowerCase())]);
        sheet.addRow([3, 'Kecamatan', data.lokasi_kecamatan.name]);
        sheet.addRow([4, 'Desa / Kelurahan', data?.lokasi_kelurahan?.name ?? '']);
        sheet.addRow([5, 'Alamat Lengkap', data.lokasi_alamat]);
        sheet.addRow([6, 'NPWP wajib pajak', data.npwp]);
        sheet.addRow([7, 'Koordinat Lokasi', data.coordinate.split(',').join(', ')]);
        sheet.addRow([8, 'Luas tanah yang dimohonkan', String(data.luas_tanah)]);
        sheet.addRow([9, 'Fungsi Bangunan', data.fungsi_bangunan]);

        wb.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `${filename}.xlsx`;
            anchor.dispatchEvent(new MouseEvent('click'));
            window.URL.revokeObjectURL(url);
        });
    }
    return (
        <>
            <AuthLayout title={'Form Permohonan'}>
                <div className="flex md:items-left md:justify-left justify-center gap-3 mt-12 items-center">
                    <Typography variant="h4" className="hidden md:flex !font-quicksand !font-semibold">{title}</Typography>
                    <Typography variant="h5" className="flex md:hidden !font-quicksand !font-semibold">{title}</Typography>

                </div>
                <div className="flex flex-col md:text-base text-[12px] gap-5 mt-4 px-4 mt-6 md:mt-4 md:p-10">
                    <div className="flex justify-between">
                        <div>Form Permohonan Penerbitan Dokumen KRK (Keterangan Rencana Kabupaten)</div>
                        <div>
                            <Button size="small" variant="contained" className="!py-3 md:!py-0.5  !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap !bg-gblue-500" onClick={() => downloadForm(data)}>Download Form</Button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold">Data Pemohon</div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >1</div>
                            <div className="col-start-2 col-span-2">Data Pemohon :</div>
                            <div className="col-start-4 col-span-4">{data?.name}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >2</div>
                            <div className="col-start-2 col-span-2">Email Pemohon :</div>
                            <div className="col-start-4 col-span-4">{data?.email}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >3</div>
                            <div className="col-start-2 col-span-2">Whatsapp :</div>
                            <div className="col-start-4 col-span-4">{data?.wa}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >4</div>
                            <div className="col-start-2 col-span-2">Whatsapp kuasa :</div>
                            <div className="col-start-4 col-span-4">{data?.wa_kuasa}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >5</div>
                            <div className="col-start-2 col-span-2">Provinsi :</div>
                            <div className="col-start-4 col-span-4">{ucwords(data?.provinsi?.name.toLowerCase())}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >6</div>
                            <div className="col-start-2 col-span-2">Kabupaten / Kota :</div>
                            <div className="col-start-4 col-span-4">{ucwords(data?.kabupaten?.name.toLowerCase())}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >7</div>
                            <div className="col-start-2 col-span-2">Kecamatan :</div>
                            <div className="col-start-4 col-span-4">{ucwords(data?.kecamatan?.name)}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >8</div>
                            <div className="col-start-2 col-span-2">Desa / Kelurahan :</div>
                            <div className="col-start-4 col-span-4">{ucwords(data?.kelurahan?.name)}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >9</div>
                            <div className="col-start-2 col-span-2">Alamat Lengkap :</div>
                            <div className="col-start-4 col-span-4">{data?.lokasi_alamat}</div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold">Lokasi Izin</div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >1</div>
                            <div className="col-start-2 col-span-2">Provinsi :</div>
                            <div className="col-start-4 col-span-4">{ucwords(data?.lokasi_provinsi?.name.toLowerCase())}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >2</div>
                            <div className="col-start-2 col-span-2">Kabupaten / Kota :</div>
                            <div className="col-start-4 col-span-4">{ucwords(data?.lokasi_kabupaten?.name.toLowerCase())}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >3</div>
                            <div className="col-start-2 col-span-2">Kecamatan :</div>
                            <div className="col-start-4 col-span-4">{data?.lokasi_kecamatan?.name}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >4</div>
                            <div className="col-start-2 col-span-2">Desa / Kelurahan :</div>
                            <div className="col-start-4 col-span-4">{data?.lokasi_kelurahan?.name ?? ''}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >5</div>
                            <div className="col-start-2 col-span-2">Alamat Lengkap :</div>
                            <div className="col-start-4 col-span-4">{data?.lokasi_alamat}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >6</div>
                            <div className="col-start-2 col-span-2">NPWP wajib pajak :</div>
                            <div className="col-start-4 col-span-4">{data?.npwp}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >7</div>
                            <div className="col-start-2 col-span-2">Koordinat Lokasi :</div>
                            <div className="col-start-4 col-span-4">{data?.coordinate.split(',').join(', ')}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >8</div>
                            <div className="col-start-2 col-span-2">Luas tanah yang dimohonkan :</div>
                            <div className="col-start-4 col-span-4">{String(data?.luas_tanah)}</div>
                        </div>
                        <div className="grid mt-3 grid-cols-12">
                            <div >8</div>
                            <div className="col-start-2 col-span-2">Fungsi Bangunan:</div>
                            <div className="col-start-4 col-span-4">{data?.fungsi_bangunan}</div>
                        </div>

                    </div>
                </div>

            </AuthLayout>
        </>
    )
}
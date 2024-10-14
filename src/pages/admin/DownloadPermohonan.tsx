import { useParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/Helpers";
import GButton from "../../components/GButton";
import { Link } from "react-router-dom";
import { getExtension, downloadFile } from '../../utils/Helpers';
import { ucwords } from "../../utils/Helpers";
import excel from 'exceljs';

function DownloadPermohonan() {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState<any>(null);


    const getData = async () => {
        try {
            const query: any = await axios.get(`/permohonan/${params.uuid}`);
            const datas = query?.data?.data;
            setData(datas);

        } catch (error: any) {
            alert(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function handleDownload(fileName: string) {
        downloadFile(`/download/${fileName}`, {
            filename: `KerenkaMaBar[${data.registration_number}].${getExtension(fileName)}`,
            onProgress(progress) { console.log(progress) }
        })
    }
    function handleOpenNewTab(fileName: string) {
        const BASEURL = import.meta.env.VITE_API_BASE_URL
        window.open(`${BASEURL}/uploads/${fileName}`, '_blank');

    }

    const downloadForm = (dta: any) => {
        const filename = (`KerenkaMaBarForm[${dta.registration_number}]`);
        const wb = new excel.Workbook();
        const sheet = wb.addWorksheet(dta.registration_number);
        sheet.addRow(['', 'Form Permohonan Penerbitan Dokumen KRK (Keterangan Rencana Kabupaten)']);

        sheet.getColumn('A').width = 5;
        sheet.getColumn('B').width = 25;
        sheet.getColumn('C').width = 50;
        sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center' };

        sheet.getCell('B1').font = { bold: true };

        sheet.addRow(['', 'Data Pemohon']);
        sheet.getCell('B2').font = { bold: true };
        sheet.addRow([1, 'Nama Pemohon', dta.name]);
        sheet.addRow([2, 'Email Pemohon *', dta.email]);
        sheet.addRow([3, 'Whatsapp *', dta.wa]);
        sheet.addRow([4, 'Whatsapp kuasa', dta.wa_kuasa]);
        sheet.addRow([5, 'Provinsi', ucwords(dta.provinsi?.name.toLowerCase())]);
        sheet.addRow([6, 'Kabupaten / Kota', ucwords(dta.kabupaten?.name.toLowerCase())]);
        sheet.addRow([7, 'Kecamatan', dta.kecamatan?.name]);
        sheet.addRow([8, 'Desa / Kelurahan', dta.kelurahan?.name]);
        sheet.addRow([9, 'Alamat Lengkap', dta.alamat]);

        sheet.addRow(['']);

        sheet.addRow(['', 'Lokasi Izin']);
        sheet.getCell('B13').font = { bold: true };
        sheet.addRow([1, 'Provinsi', ucwords(dta.lokasi_provinsi?.name.toLowerCase())]);
        sheet.addRow([2, 'Kabupaten / Kota', ucwords(dta.lokasi_kabupaten?.name.toLowerCase())]);
        sheet.addRow([3, 'Kecamatan', dta.lokasi_kecamatan?.name]);
        sheet.addRow([4, 'Desa / Kelurahan', dta?.lokasi_kelurahan?.name ?? '']);
        sheet.addRow([5, 'Alamat Lengkap', dta.lokasi_alamat]);
        sheet.addRow([6, 'NPWP wajib pajak', dta.npwp]);
        sheet.addRow([7, 'Koordinat Lokasi', dta.coordinate.split(',').join(', ')]);
        sheet.addRow([8, 'Luas tanah yang dimohonkan', String(dta.luas_tanah)]);
        sheet.addRow([9, 'Fungsi Bangunan', dta.fungsi_bangunan]);

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
            <AuthLayout title={'Download Permohonan'}>
                <div>
                    <div className="flex md:items-left md:justify-left gap-3 mt-6 items-center">
                        <div >
                            <ArrowBackIcon className="cursor-pointer" onClick={() => navigate(-1)} />
                        </div>
                        <Typography variant="h6" className="flex md:hidden !font-quicksand !font-semibold">Dokumen Terunggah</Typography>

                    </div>
                    <div className="mt-4">
                        <div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                            <div className="py-2 px-4" >
                                <div className="flex justify-between text-sm ">
                                    <div>
                                        {data?.createdAt ? formatDate(data.createdAt, 'DD MM YYYY', 'long') : '-'}
                                    </div>
                                    <div>
                                        {data?.registration_number}
                                    </div>
                                </div>
                                <div className="flex  justify-center items-left mt-2 flex-col">
                                    <div className="text-lg text-[#F4BF37]">
                                        {data?.lokasi_kelurahan?.name}, {data?.fungsi_bangunan}
                                    </div>
                                    <div className="mt-6 text-sm flex flex-col gap-2 w-full">
                                        {data?.name}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="mt-4">
                        <div className="w-full">
                            <GButton className="w-full" onClick={() => downloadFile(`/download/permohonan/${data.uuid}/berkas`, {
                                filename: `KerenkaMaBarBerkas[${data?.registration_number}].zip`,
                                onProgress(progress: any) {
                                    console.log(progress)
                                },
                            })}>Download Semua</GButton>

                        </div>
                        <div className="mt-4 flex flex-col gap-3">
                            <div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            Form Permohonan
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            nama_file.pdf
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full" onClick={() => downloadForm(data)}>Download</GButton>

                                    </div>

                                </div>
                            </div>
                            {data?.ktp ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            KTP
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.ktp}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data.ktp)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data.ktp)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                            {data?.pbb ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            PBB
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.pbb}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data?.pbb)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data?.pbb)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                            {data?.sertifikat_tanah ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            Sertifikat Tanah
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.sertifikat_tanah}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data?.sertifikat_tanah)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data?.sertifikat_tanah)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                            {data?.skpt ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            SKPT
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.skpt}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data?.skpt)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data?.skpt)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                            {data?.suket_tidak_sengketa ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            Surat Keterangan Tidak Sengketa
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.suket_tidak_sengketa}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data?.suket_tidak_sengketa)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data?.suket_tidak_sengketa)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                            {data?.surat_kuasa_mengurus ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            Surat Kuasa Mengurus
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.surat_kuasa_mengurus}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data?.surat_kuasa_mengurus)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data?.surat_kuasa_mengurus)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                            {data?.surat_perjanjian ? (<div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                                <div className="py-2 px-4" >
                                    <div className="flex justify-between text-sm ">
                                        <div>
                                            Surat Perjanjian
                                        </div>

                                    </div>
                                    <div className="flex  justify-center items-left mt-2 flex-col">
                                        <div className="text-sm text-[#4B96CC]">
                                            {data?.surat_perjanjian}
                                        </div>

                                    </div>
                                    <div className="mt-4 flex flex-col gap-3">
                                        <GButton className="w-full !bg-[#FFCD4E] !text-white" onClick={() => handleOpenNewTab(data?.surat_perjanjian)}>Buka</GButton>

                                        <GButton className="w-full" onClick={() => handleDownload(data?.surat_perjanjian)}>Download</GButton>

                                    </div>

                                </div>
                            </div>) : (<></>)}

                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default DownloadPermohonan
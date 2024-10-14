import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';
import { getExtension, downloadFile } from '../../../utils/Helpers';

interface DialogDownloadFileProps {
    show: boolean;
    onClose: () => void;
    data: any;
    onDownloadAll: () => void;
    downloadForm: React.Dispatch<React.SetStateAction<any>>,

}

const DialogDownloadFile: React.FC<DialogDownloadFileProps> = ({ downloadForm, show, onClose, data, onDownloadAll }) => {

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


    return (
        <>
            <Dialog
                open={show}
                onClose={onClose}
                maxWidth={'md'}
                fullWidth={true}
            >
                <DialogContent className='!bg-gdarkgray-700 rounded-xl !flex !flex-col !gap-5 !py-10 !px-24'>
                    <div className='font-semibold text-2xl flex justify-center'>Dokumen Permohonan</div>
                    <div className='mt-6 flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <div>Form Permohonan</div>
                            <div className='flex flex-row gap-4'>
                                {/* <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => console.log('halo')} >Buka</Button> */}
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(data)} >Download</Button>

                            </div>
                        </div>

                        {data?.ktp ? (<div className='flex justify-between'>
                            <div>KTP</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.ktp)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.ktp)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.pbb ? (<div className='flex justify-between'>
                            <div>PBB</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.pbb)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.pbb)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.sertifikat_tanah ? (<div className='flex justify-between'>
                            <div>Sertifikat Tanah</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.sertifikat_tanah)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.sertifikat_tanah)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.skpt ? (<div className='flex justify-between'>
                            <div>SKPT</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.skpt)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.skpt)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.suket_tidak_sengketa ? (<div className='flex justify-between'>
                            <div>Surat Keterangan Tidak Sengketa</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.suket_tidak_sengketa)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.suket_tidak_sengketa)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.surat_kuasa_mengurus ? (<div className='flex justify-between'>
                            <div>Surat Kuasa Mengurus</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.surat_kuasa_mengurus)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.surat_kuasa_mengurus)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.surat_perjanjian ? (<div className='flex justify-between'>
                            <div>Surat Perjanjian</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.surat_perjanjian)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.surat_perjanjian)} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                    </div>
                    <div className='flex justify-center gap-4'>
                        <Button size="small" variant="contained" color="success" className="!py-0.5 !rounded-xl !px-5 !text-md !capitalize !whitespace-nowrap" onClick={onClose} >Tutup</Button>
                        <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-xl !px-5 !text-md !capitalize !whitespace-nowrap" onClick={() => onDownloadAll()} >Download Semua file</Button>

                    </div>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogDownloadFile;
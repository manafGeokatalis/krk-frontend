import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, Box, Typography } from '@mui/material';
import { getExtension, downloadFile } from '../../../utils/Helpers';
import { useNavigate } from 'react-router-dom';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
interface DialogDownloadFileProps {
    show: boolean;
    onClose: () => void;
    data: any;
    onDownloadAll: () => void;
    downloadForm: React.Dispatch<React.SetStateAction<any>>,
    downloadProgress: any

}
function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress color='primary' className='!text-blue' variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
const DialogDownloadFile: React.FC<DialogDownloadFileProps> = ({ downloadForm, show, onClose, data, onDownloadAll, downloadProgress }) => {
    const navigate = useNavigate();

    function handleDownload(fileName: string, fileNameDownload: string) {
        downloadFile(`/download/${fileName}`, {
            filename: fileNameDownload && fileNameDownload.length > 0 ? `${fileNameDownload}.${getExtension(fileName)}` : `KerenkaMaBar[${data.registration_number}].${getExtension(fileName)}`,
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
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => navigate(`/form-permohonan/${data.uuid}`)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(data)} >Download</Button>

                            </div>
                        </div>

                        {data?.ktp ? (<div className='flex justify-between'>
                            <div>KTP</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.ktp)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.ktp, 'ktp')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.pbb ? (<div className='flex justify-between'>
                            <div>PBB</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.pbb)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.pbb, 'pbb')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.sertifikat_tanah ? (<div className='flex justify-between'>
                            <div>Sertifikat Tanah</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.sertifikat_tanah)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.sertifikat_tanah, 'sertifikat_tanah')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.skpt ? (<div className='flex justify-between'>
                            <div>SKPT</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.skpt)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.skpt, 'skpt')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.suket_tidak_sengketa ? (<div className='flex justify-between'>
                            <div>Surat Keterangan Tidak Sengketa</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.suket_tidak_sengketa)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.suket_tidak_sengketa, 'suket_tidak_sengketa')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.surat_kuasa_mengurus ? (<div className='flex justify-between'>
                            <div>Surat Kuasa Mengurus</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.surat_kuasa_mengurus)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.surat_kuasa_mengurus, 'surat_kuasa_mengurus')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                        {data?.surat_perjanjian ? (<div className='flex justify-between'>
                            <div>Surat Perjanjian</div>
                            <div className='flex flex-row gap-4'>
                                <Button size="small" variant="contained" color="warning" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleOpenNewTab(data.surat_perjanjian)} >Buka</Button>
                                <Button size="small" variant="contained" color="info" className="!py-0.5 !text-white !rounded-md !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => handleDownload(data.surat_perjanjian, 'surat_perjanjian')} >Download</Button>

                            </div>
                        </div>) : (<></>)}

                    </div>
                    <div className='flex justify-center gap-4'>
                        <Button size="small" variant="contained" color="success" className="!py-0.5 !rounded-xl !px-5 !text-md !capitalize !whitespace-nowrap" onClick={onClose} >Tutup</Button>

                        <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-xl !px-5 !text-md !capitalize !whitespace-nowrap" onClick={() => onDownloadAll()} >Download Semua file
                            {/* {downloadProgress[data?.uuid] > 0 &&
                                <LinearProgress color="primary" variant="determinate" value={downloadProgress[data?.uuid]} className="mt-1" />
                            } */}

                            {downloadProgress[data?.uuid] > 0 && <CircularProgressWithLabel size="small" color="primary" variant="determinate" value={downloadProgress[data?.uuid]} className="mt-1 !text-blue !ml-10" />}



                        </Button>

                    </div>

                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogDownloadFile;
import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import GButton from '../../../components/GButton';
import { Done } from "@mui/icons-material";
import axios from 'axios';
import { notification } from "../../../utils/Recoils"
import { useRecoilState } from "recoil"
import { createNotifcation } from "../../../utils/Helpers"


interface ConfirmDialogMultipleUpdateProps {
    selected: any[],
    onClose: () => void
    show: boolean;
    onClearSelect: () => void

}



const ConfirmDialogMultipleUpdate: React.FC<ConfirmDialogMultipleUpdateProps> = ({ show = false, selected, onClose, onClearSelect }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<any>([
        { title: 'Permohonan telah diajukan', date: null, checked: false, file: null },
        { title: 'Proses Verifikasi dokumen persyaratan', date: null, checked: false, file: null },
        { title: 'Selesai Verifikasi dokumen', date: null, checked: false, file: null },
        { title: 'Persiapan Proses Pengukuran dan Cek Lapangan oleh Petugas', date: null, checked: false, file: null },
        { title: 'Selesai Pengukuran dan Cek Lapangan', date: null, checked: false, file: null },
        // { title: '5. Selesai Verifikasi Hasil Pengukuran dan Cek Lapangan', date: null, checked: false, file: null },
        // { title: '6. Nomor Agenda Telah Terbit, Persiapan Pengecekan Mandiri', date: null, checked: false, file: null },
        // { title: '7. Selesai Pengecekan Mandiri', date: null, checked: false, file: null },
        // { title: '8. Verifikasi hasil Pengecekan Mandiri', date: null, checked: false, file: null },
    ])
    const [rejected] = useState(false);
    const [_, setNotif] = useRecoilState(notification);


    useEffect(() => {
        setOpen(show);
    }, [show]);

    const handleClick = (index: number) => {
        for (let i = 0; i <= index; i++) {
            status[i].checked = true;
        }
        if (index < status.length - 1) {
            for (let i = index + 1; i < status.length; i++) {
                status[i].checked = false;
            }
        }

        setStatus([...status]);
    }

    const TimeLine = ({ events }: { events: Array<any> }) => {
        return (
            <div className="relative">
                <div className="absolute left-[0.6rem] top-3 bottom-[1rem] transform -translate-x-1/2 border-l-4 border-white"></div>
                {events.map((event, index) => (
                    <div key={index} className={"flex items-center mb-7 relative font-quicksand " + (rejected ? 'cursor-not-allowed' : 'cursor-pointer')} onClick={() => !rejected ? handleClick(index) : false}>
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-white z-10 font-bold">
                            {event.checked &&
                                <Done color="primary" className="!w-3 !h-3 !stroke-[5] !stroke-gblue-500" />
                            }
                        </div>
                        <div className={"ml-4 w-full rounded-lg px-3 py-2 flex flex-col md:justify-between " + (event.checked ? 'bg-white text-gblue-500' : 'text-white bg-gdarkgray-500')}>
                            <p className="order-2 md:order-1">{event.title}</p>
                            {/* <div className="order-1 md:order-2 flex flex-col gap-1 md:justify-end md:text-right">
                                <p className="text-[10px] md:text-[12px]">{event.date ? `Diproses tanggal ${formatDate(event.date, 'DD MM YYYY', 'long')}` : null}</p>
                                {(status.filter((obj: any) => obj.checked === true).length === 6 && index === 5) &&

                                    <div className="flex gap-1 justify-end items-center">
                                        {fileName !== '' &&
                                            <p className="font-semibold max-w-xs text-ellipsis overflow-hidden whitespace-nowrap">{fileName}</p>
                                        }
                                        {event?.file === null ?
                                            <GButton color="success" className="!flex !gap-2" onClick={() => {
                                                if (fileField.current) {
                                                    fileField.current.click();
                                                } else {
                                                    return false;
                                                }
                                            }}>
                                                <Upload /> Upload
                                            </GButton>
                                            : <>
                                                {downloadProgress > 0 &&
                                                    <CircularProgress size={25} variant="determinate" value={downloadProgress} />
                                                }
                                                <GButton color="success" className="!flex !gap-2" onClick={() => {
                                                    if (fileField.current) {
                                                        fileField.current.click();
                                                    } else {
                                                        return false;
                                                    }
                                                }}>
                                                    <Upload /> Ganti File
                                                </GButton>
                                                <GButton color="error" className="!flex !gap-2" onClick={() => downloadFile(`/download/${event.file}`, {
                                                    filename: `KerenkaMaBar[${data.registration_number}].${getExtension(event.file)}`,
                                                    onProgress(progress) {
                                                        setDownloadProgress(progress);
                                                        if (progress == 100) {
                                                            setTimeout(() => {
                                                                setDownloadProgress(0);
                                                            }, 1000);
                                                        }
                                                    },
                                                })} disabled={downloadProgress > 0}>
                                                    <Download /> Download
                                                </GButton>
                                            </>
                                        }
                                    </div>
                                }
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    async function handleSubmit() {
        const dataStatus = status.filter((obj: any) => obj.checked === true)
        const dataUuid = selected

        const payload = {
            id: dataUuid,
            status: dataStatus
        }

        const res: any = await axios.post(`/permohonan/update-status-bulk`, payload);
        if (res) {
            onClearSelect()
            setNotif(createNotifcation('Permohonan Berhasil diupdate'));

        }
        onClose()
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent className='!bg-gdarkgray-700 rounded-xl !flex !flex-col !gap-5 !p-10'>

                <div className='flex justify-center flex-col items-center gap-6 font-semibold'>
                    <div className='text-3xl'>Ubah Tahap untuk <span className='text-gyellow'>{selected.length}</span> Terpilih </div>
                    <div className='mt-10'>
                        <TimeLine events={status} />
                    </div>

                </div>
                <DialogActions className='!flex !mt-10 !gap-10 !justify-center'>
                    <GButton variant='contained' color='secondary' onClick={onClose} autoFocus>Tutup</GButton>
                    <GButton variant='contained' color='success' onClick={handleSubmit} autoFocus>Ubah Tahap Permohonan</GButton>

                </DialogActions>
            </DialogContent>

        </Dialog>
    )

}

export default ConfirmDialogMultipleUpdate
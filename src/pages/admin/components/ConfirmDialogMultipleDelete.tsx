import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import GButton from '../../../components/GButton';
import axios from 'axios';
import { createNotifcation } from "../../../utils/Helpers"
import { useRecoilState } from "recoil"
import { notification } from "../../../utils/Recoils"

interface ConfirmDialogMultipleDeleteProps {
    selected: any[],
    onClose: () => void
    show: boolean;
    onClearSelect: () => void


}


const ConfirmDialogMultipleDelete: React.FC<ConfirmDialogMultipleDeleteProps> = ({ show = false, selected, onClose, onClearSelect }) => {
    const [open, setOpen] = useState(false);
    const [_, setNotif] = useRecoilState(notification);

    useEffect(() => {
        setOpen(show);
    }, [show]);

    async function handleSubmit() {
        const dataUuid = selected
        const payload = {
            id: dataUuid,
        }

        const res: any = await axios.post(`/permohonan/delete-permohonan-bulk`, payload);
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
                    <div className='text-3xl'>Apakah anda yakin menghapus</div>
                    <div className='text-3xl text-gyellow'>{selected.length}</div>
                    <div className='text-3xl'>Permohonan Terpilih</div>

                </div>
                <DialogActions className='!flex !mt-10 !gap-10 !justify-center'>
                    <GButton variant='contained' color='secondary' onClick={onClose} autoFocus>Batal</GButton>
                    <GButton variant='contained' color='error' onClick={handleSubmit} autoFocus>Hapus Permohonan</GButton>

                </DialogActions>
            </DialogContent>

        </Dialog>
    )

}

export default ConfirmDialogMultipleDelete
import AuthLayout from "../../layouts/AuthLayout"
import { Typography, TextField } from "@mui/material"
import GButton from "../../components/GButton"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { notification } from "../../utils/Recoils";
import { createNotifcation } from "../../utils/Helpers";

function PermohonanDitolak() {
    const params = useParams();
    const [reject, setReject] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [_n, setN] = useRecoilState<any>(notification);


    const sendReject = async () => {
        setIsSubmit(true);
        try {
            const res: any = await axios.put(`/permohonan/${params.uuid}/reject`, { message: reject });

            if (res?.data) {
                setN(createNotifcation(res?.data?.message));
                setIsSubmit(false);
                navigate(`/permohonan/${params.uuid}`);
            }


        } catch (error: any) {
            setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
            setIsSubmit(false);
        }
    }


    return (
        <>
            <AuthLayout>
                <div className="flex md:items-left md:justify-left justify-center gap-3 mt-6 md:mt-12 items-center">
                    <Typography variant="h4" className="hidden md:flex !font-quicksand !font-semibold">Tolak Permohonan</Typography>
                    <Typography variant="h5" className="flex md:hidden !font-quicksand !font-semibold">Tolak Permohonan</Typography>

                </div>
                <div className="w-full mt-10">
                    <Typography className="!font-quicksand !font-semibold " fontSize={14}>Alasan Penolakan KRK (Wajib diis):</Typography>
                    <TextField className="w-full mt-4" type="text" multiline rows={4} sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    }} value={reject} onChange={e => setReject(e.target.value)} />
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-center mt-4">
                        <GButton className="w-full" color="error" type="submit" disabled={reject == '' || isSubmit} onClick={sendReject}>Simpan</GButton>
                        <GButton className="w-full" color="secondary" type="submit" onClick={() => navigate(-1)}>Cancel</GButton>
                    </div>
                </div>

            </AuthLayout>
        </>
    )
}

export default PermohonanDitolak
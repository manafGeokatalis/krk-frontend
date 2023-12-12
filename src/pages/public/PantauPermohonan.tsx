import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout"
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { notification } from "../../utils/Recoils";
import { createNotifcation } from "../../utils/Helpers";
import { useNavigate } from "react-router-dom";

type Props = {}

function PantauPermohonan({ }: Props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({
    registration_number: ''
  });
  const [_n, setN] = useRecoilState(notification);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      setIsSubmit(false);
      const query: any = await axios.post(`/check-permohonan`, form);
      navigate(`/pantau/${query?.data?.data.uuid}`);
    } catch (error: any) {
      setIsSubmit(false);
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }
  return (
    <AuthLayout title='Pantau Permohonan'>
      <div className="flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Pantau Permohonan</Typography>
      </div>
      <div className="flex justify-center w-full mt-32">
        <div className="w-full max-w-5xl">
          <Typography mb={1} className='!font-quicksand !font-semibold'>Masukkan nomor registrasi permohonan anda</Typography>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex items-center border border-white rounded overflow-hidden">
              <TextField fullWidth size="small" sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }} className="!h-9 !-mt-1" required disabled={isSubmit} onChange={e => setForm({ ...form, registration_number: e.target.value })} value={form.registration_number} />
              <Button color="secondary" type="submit" variant="contained" className="!rounded-none !bg-gray-100 !font-quicksand !capitalize !w-36 !text-base" disabled={isSubmit}>
                Cari
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default PantauPermohonan
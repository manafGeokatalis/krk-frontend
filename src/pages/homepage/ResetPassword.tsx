import GuestLayout from '../../layouts/GuestLayout'
import kerenka from '../../assets/kerenka.svg'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import GButton from '../../components/GButton'
import { useState } from 'react'
import { notification } from '../../utils/Recoils'
import { useRecoilState } from 'recoil'
import { createNotifcation } from '../../utils/Helpers'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

function ResetPassword() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [_n, setN] = useRecoilState(notification);
  const [query] = useSearchParams();
  const [form, setForm] = useState({
    password: '',
    confirm_password: '',
    token: query.get('token')
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      const res: any = await axios.post('/auth/reset-password', form);
      setN(createNotifcation(res?.data?.message));
      setSending(false);
      setSent(true);
      navigate('/reset-password');
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setSent(false);
      setSending(false);
    }
  }

  if (sent) {
    return (
      <GuestLayout title='Password Berhasil Direset'>
        <div className="flex w-full justify-center p-16 pb-20">
          <div className='w-full max-w-3xl flex flex-col gap-5'>
            <div className="flex flex-col gap-2 items-center">
              <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
              <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
            </div>
            <Card className='!bg-gdarkgray-500 !rounded-xl mt-10'>
              <CardContent className='!p-10'>
                <div className="flex flex-col gap-10 items-center">
                  <Typography variant='h5' className='!font-quicksand'>Password berhasil direset.</Typography>
                  <Typography className='!font-heebo !text-justify !font-light'>Silahkan login kembali menggunakan email dan password baru Anda.</Typography>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-center">
                      <a href={'/'}>
                        <Button className='!normal-case !text-gyellow-500 !text-lg'>Kembali ke Halaman Utama</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </GuestLayout>
    )
  }

  return (
    <GuestLayout title='Reset Password'>
      <div className="flex w-full justify-center p-16 pb-20">
        <div className='w-full max-w-3xl flex flex-col gap-5'>
          <div className="flex flex-col gap-2 items-center">
            <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
            <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
          </div>
          <Card className='!bg-gdarkgray-500 !rounded-xl mt-10'>
            <CardContent className='!p-10'>
              <div className="flex flex-col gap-10 items-center">
                <Typography variant='h5' className='!font-quicksand'>Reset Password Anda</Typography>
                <Typography className='!font-heebo !text-justify !font-light'>Silahkan masukkan password baru Anda.</Typography>
                <form onSubmit={handleSubmit} className='w-full flex justify-center'>
                  <div className="flex flex-col gap-5 w-full max-w-md">
                    <TextField type='password' name='password' variant='outlined' color='secondary' label="Password Baru" fullWidth sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} disabled={sending} required />
                    <TextField type='password' name='confirm_password' variant='outlined' color='secondary' label="Ulang Password Baru" fullWidth sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }} value={form.confirm_password} onChange={e => setForm({ ...form, confirm_password: e.target.value })} disabled={sending} required />
                    <GButton type='submit' className='!text-lg' disabled={sending}>{sending ? 'Mereset Password' : 'Reset Password'}</GButton>
                  </div>
                </form>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center">
                    <a href={'/'}>
                      <Button className='!normal-case !text-gyellow-500 !text-lg'>Kembali ke Halaman Utama</Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestLayout>
  )
}

export default ResetPassword
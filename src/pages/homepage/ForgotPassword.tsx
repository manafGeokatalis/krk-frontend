import GuestLayout from '../../layouts/GuestLayout'
import kerenka from '../../assets/kerenka.svg'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import GButton from '../../components/GButton'
import { useState } from 'react'
import { notification } from '../../utils/Recoils'
import { useRecoilState } from 'recoil'
import { createNotifcation } from '../../utils/Helpers'
import axios from 'axios'

function ForgotPassword() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [_n, setN] = useRecoilState(notification);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      const res: any = await axios.post('/auth/forgot-password', { email });
      setN(createNotifcation(res?.data?.message));
      setSending(false);
      setSent(true);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setSent(false);
      setSending(false);
    }
  }

  if (sent) {
    return (
      <GuestLayout title='Link Reset Password Terkirim'>
        <div className="flex w-full justify-center p-16 pb-20">
          <div className='w-full max-w-3xl flex flex-col gap-5'>
            <div className="flex flex-col gap-2 items-center">
              <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
              <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
            </div>
            <Card className='!bg-gdarkgray-500 !rounded-xl mt-10'>
              <CardContent className='!p-10'>
                <div className="flex flex-col gap-10 items-center">
                  <Typography variant='h5' className='!font-quicksand'>Link untuk mereset password berhasil dikirim</Typography>
                  <Typography className='!font-heebo !text-justify !font-light'>Silahkan cek email Anda untuk mereset password.</Typography>
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
    <GuestLayout title='Lupa Password'>
      <div className="flex w-full justify-center p-16 pb-20">
        <div className='w-full max-w-3xl flex flex-col gap-5'>
          <div className="flex flex-col gap-2 items-center">
            <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
            <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
          </div>
          <Card className='!bg-gdarkgray-500 !rounded-xl mt-10'>
            <CardContent className='!p-10'>
              <div className="flex flex-col gap-10 items-center">
                <Typography variant='h5' className='!font-quicksand'>Masukkan Email Anda yang sudah terdaftar</Typography>
                <Typography className='!font-heebo !text-justify !font-light'>Kami akan mengirimkan email yang berisi link untuk mereset password Anda.</Typography>
                <form onSubmit={handleSubmit} className='w-full flex justify-center'>
                  <div className="flex flex-col gap-5 w-full max-w-md">
                    <TextField type='email' name='email' variant='outlined' color='secondary' label="Alamat Email" fullWidth sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }} value={email} onChange={e => setEmail(e.target.value)} disabled={sending} required />
                    <GButton type='submit' className='!text-lg' disabled={sending}>{sending ? 'Mengirim Email' : 'Kirim Link'}</GButton>
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

export default ForgotPassword
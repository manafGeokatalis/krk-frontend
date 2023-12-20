import GuestLayout from '../../layouts/GuestLayout'
import kerenka from '../../assets/kerenka.svg'
import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import GButton from '../../components/GButton'
import { useEffect, useState } from 'react'
import { notification } from '../../utils/Recoils'
import { useRecoilState } from 'recoil'
import { createNotifcation } from '../../utils/Helpers'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { Verified } from '@mui/icons-material'

function EmailVerification() {
  const [sending, setSending] = useState(false);
  const [_n, setN] = useRecoilState(notification);
  const [query] = useSearchParams();
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (query.get('token')) {
      verificateEmail();
    }
  }, [query]);

  const verificateEmail = async () => {
    try {
      await axios.post('/auth/verification-email', { token: query.get('token') });
      setVerified(true);
      location.replace('/permohonan');
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setError(error?.response?.data?.message ?? 'Tidak dapat melakukan verifikasi! Silahkan coba beberapa saat lagi');
    }
  }

  const resendEmail = async () => {
    setSending(true);
    try {
      const res: any = await axios.post('/auth/send-email-verification');
      setN(createNotifcation(res?.data?.message));
      setSending(false);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setSending(false);
    }
  }

  if (query.get('token')) {
    return (
      <GuestLayout title='Memverifikasi Email'>
        <div className="flex w-full justify-center p-16 pb-20">
          <div className='w-full max-w-3xl flex flex-col gap-5'>
            <div className="flex flex-col gap-2 items-center">
              <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
              <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
            </div>
            <Card className='!bg-gdarkgray-500 !rounded-xl mt-10'>
              <CardContent className='!p-10'>
                <div className="flex flex-col gap-10 items-center">
                  {!error ?
                    <>
                      <Typography variant='h5' className='!font-quicksand'>Mohon Tunggu</Typography>
                      {!verified ? <CircularProgress size={50} color='warning' />
                        : <div className='text-6xl'><Verified color='warning' fontSize='inherit' /></div>}
                      <Typography className='!font-heebo !text-justify !font-light !text-xl'>Sedang melakukan verifikasi email</Typography>
                    </>
                    : <Typography variant='h5' className='!font-quicksand'>{error}</Typography>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </GuestLayout>
    )
  }

  return (
    <GuestLayout title='Verifikasi Email Anda'>
      <div className="flex w-full justify-center p-16 pb-20">
        <div className='w-full max-w-3xl flex flex-col gap-5'>
          <div className="flex flex-col gap-2 items-center">
            <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
            <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
          </div>
          <Card className='!bg-gdarkgray-500 !rounded-xl mt-10'>
            <CardContent className='!p-10'>
              <div className="flex flex-col gap-10 items-center">
                <Typography variant='h5' className='!font-quicksand'>Konfirmasi Alamat E-Mail</Typography>
                <Typography className='!font-heebo !text-justify !font-light'>Untuk dapat melakukan permohonan pengajuan KRK pada aplikasi ini, silahkan melakukan konfirmasi alamat email dengan membuka tautan yang telah kami kirimkan secara otomatis pada alamat email yang anda gunakan.</Typography>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center">
                    <a href={'/'}>
                      <GButton>Kembali ke Halaman Utama</GButton>
                    </a>
                  </div>
                  <Button variant='text' color='warning' className='!normal-case hover:!bg-transparent hover:!text-gyellow-600' onClick={resendEmail} disabled={sending}>{!sending ? 'Belum mendapatkan email? Klik untuk mengirim ulang' : 'Mengirim ulang email verifikasi'}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestLayout>
  )
}

export default EmailVerification
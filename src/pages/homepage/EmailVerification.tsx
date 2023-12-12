import GuestLayout from '../../layouts/GuestLayout'
import kerenka from '../../assets/kerenka.svg'
import { Button, Card, CardContent, Typography } from '@mui/material'
import GButton from '../../components/GButton'
import { useState } from 'react'
import { notification } from '../../utils/Recoils'
import { useRecoilState } from 'recoil'
import { createNotifcation } from '../../utils/Helpers'
import axios from 'axios'

function EmailVerification() {
  const [sending, setSending] = useState(false);
  const [_n, setN] = useRecoilState(notification)

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
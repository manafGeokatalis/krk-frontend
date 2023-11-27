import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import kerenka from '../../assets/kerenka.svg'
import GButton from '../../components/GButton'

function Section1() {
  return (
    <div className='flex items-center py-16'>
      <div className="flex flex-col gap-7 justify-center items-center px-24 w-full">
        <div className="flex flex-col gap-2">
          <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
          <Typography variant='h1' className='!text-base !font-quicksand !text-center !leading-tight !font-medium'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
        </div>
        <hr className='border-white w-full' />
        <GButton color='primary'>+ Ajukan Permohonan PKKPR</GButton>
      </div>
      <div className="w-full max-w-md">
        <Card className='!bg-gdarkgray !rounded-xl'>
          <CardContent className='!flex !flex-col !gap-10 !p-7'>
            <div className="flex flex-col gap-3">
              <TextField type='text' variant='outlined' color='secondary'
                InputProps={{
                  style: {
                    borderWidth: 2
                  }
                }}
                label='E-Mail' />
              <TextField type='password' variant='outlined' color='secondary' label='Password' />
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col gap-2">
                <GButton color='success'>Masuk</GButton>
                <p className='text-white text-sm font-quicksand hover:text-gray-300'>Lupa Password?</p>
              </div>
            </div>
            <div className="px-20">
              <hr />
            </div>
            <div className='flex justify-center'>
              <GButton>Buat Akun Baru</GButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

export default Section1
import { Typography } from '@mui/material'
import mabstart_image from '../../../assets/mabstar-image.png'
import GButton from '../../../components/GButton'

function Section5() {
  return (
   <div className='flex items-center justify-center'>
     <div className="py-16 max-w-[1500px] w-full md:w-[1500px] px-4 md:px-4 flex flex-col gap-20 items-center justify-center">
      <hr className='w-full ' />
      <div className="flex gap-20 flex-col md:flex-row">
        <div className="full rounded-3xl overflow-hidden shadow-lg drop-shadow-2xl shadow-gdarkgray-500 w-full">
          <img src={mabstart_image} alt="mabstar_image" className='w-full' />
        </div>
        <div className="flex flex-col gap-7 w-full justify-center items-center text-center">
          <Typography variant='h4' className='!font-quicksand !font-semibold'>Aplikasi Mab-Star</Typography>
          <Typography variant='h6' className='!font-heebo !font-thin !text-justify'>Mab-Star adalah web aplikasi manajemen Rencana Spasial Pembangunan di Kabupaten Manggarai Barat. Mab-Star menyediakan tampilan berbagai peta seperti Pola Ruang, Struktur Ruang, Zonasi Ruang, Peta Ketentuan Intensitas Pemanfaatan Ruang dan Ketentuan Tinggi Bangunan serta peta-peta perencanaan pembangunan lain di Kabupaten Manggarai Barat</Typography>
          <a href="https://mab-star.com/" target='_blank'>
            <GButton color='success' className='text-lg !rounded-full !px-7 !font-quicksand !capitalize !py-1'>Buka Mab-Star</GButton>
          </a>
        </div>
      </div>
    </div>
   </div>
  )
}

export default Section5
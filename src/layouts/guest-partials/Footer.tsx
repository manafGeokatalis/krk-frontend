import { Typography } from '@mui/material'
import kerenka from '../../assets/kerenka.svg'
import logo from '../../assets/logo.png'

function Footer() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-5 py-10 gap-7 w-full">
        <div className="flex flex-col gap-3 w-full">
          <img src={kerenka} alt="kerenka" className='w-48' />
          <Typography className='!font-heebo !font-thin'>KeRenKa adalah web aplikasi yang dikembangkan oleh pemerintah Kabupaten Manggarai Barat untuk memudahkan masyarakat dalam melakukan permohonan dan penerbitan dokumen KRK (Keterangan Rencana Kota)  di daerah Kabupaten Manggarai Barat.</Typography>
        </div>
        <div className="flex gap-7 w-full">
          <div className="flex flex-col gap-3 w-full">
            <img src={kerenka} alt="kerenka" className='w-48' />
            <Typography className='!font-quicksand'>Tentang Tata Ruang Wilayah</Typography>
            <Typography className='!font-quicksand'>Tentang KRK</Typography>
            <Typography className='!font-quicksand'>Petunjuk Permoohonan KRK</Typography>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-4 items-center">
              <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
              <Typography variant='h3' className='!text-xl !leading-tight !font-quicksand'>Pemerintah Kabupaten Manggarai Barat</Typography>
            </div>
            <Typography className='!font-quicksand !text-sm'>Untuk Informasi dan Pengaduan</Typography>
            <Typography className='!font-quicksand !text-sm'>alamat : Jl. Adi Sucipto No. 1, Labuan Bajo, Kabupaten Manggarai barat</Typography>
            <Typography className='!font-quicksand !text-sm'>email : tataruangmabarofficial@gmail.com</Typography>
            <Typography className='!font-quicksand !text-sm'>telepon : (0385)21398, 21506 (fax)</Typography>
          </div>
        </div>
      </div>
      <hr className='w-full border-gdarkgray-600' />
      <div className="flex justify-between py-7 items-center">
        <div>
          <Typography className='!font-heebo !text-sm !font-thin'>Didesain dan dikembangkan oleh Pemerintah Kabupaten Manggarai Barat bekerjasama dengan</Typography>
          <a href="https://geokatalis.com/" target='_blank'>
            <Typography className='!font-heebo !text-sm !font-thin !text-gblue-200'>PT. Geokatalis Teknologi Pemetaan</Typography>
          </a>
        </div>
        <div className="flex justify-end text-right">
          <Typography className='!font-heebo !text-sm !font-thin'>Copyright &copy; 2023  KeRenKa Kabupaten Manggarai Barat</Typography>
        </div>
      </div>
    </div>
  )
}

export default Footer
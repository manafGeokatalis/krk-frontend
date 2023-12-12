import { Card, CardContent, Typography } from "@mui/material"
import kerenka from '../../../assets/kerenka.svg'
import compas_icon from '../../../assets/compas_icon.svg'
import document_icon from '../../../assets/document_icon.svg'
import map_icon from '../../../assets/map_icon.svg'

function Section3() {
  return (
    <div className='py-16 flex flex-col items-center px-10'>
      <hr className="w-full max-w-5xl" />
      <div className="flex gap-20 items-center w-full py-20">
        <div className="flex flex-col gap-3 w-full text-right">
          <Typography variant="h4" className="!font-quicksand !font-bold">Web Aplikasi Kerenka</Typography>
          <Typography variant="h6" className="!font-heebo !font-thin"><span className="!font-bold">KeRenKa</span> adalah web aplikasi yang dikembangkan oleh pemerintah Kabupaten Manggarai Barat untuk memudahkan masyarakat dalam proses permohonan penerbitan dokumen Keterangan Rencana Kota (KRK) dengan cara memangkas birokrasi dan mempersingkat waktu pengurusan dokumen KRK menggunakan inovasi teknologi informasi dan komunikasi</Typography>
        </div>
        <div className="flex flex-col gap-2 items-center w-full max-w-lg">
          <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
          <Typography variant='h6' className='!font-quicksand !text-center !leading-tight !font-thin !text-lg'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
        </div>
      </div>
      <div className="py-5 grid grid-cols-3 gap-28">
        <Card className="!rounded-2xl !shadow-sm !bg-ggray-500 !drop-shadow-2xl !shadow-gdarkgray-400">
          <CardContent className="!p-8 h-full">
            <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
              <img src={compas_icon} alt="compas_icon" className="w-16" />
              <Typography variant="h4" className="!font-quicksand">Tetang KRK</Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="!rounded-2xl !shadow-sm !bg-ggray-500 !drop-shadow-2xl !shadow-gdarkgray-400">
          <CardContent className="!p-8 h-full">
            <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
              <img src={document_icon} alt="compas_icon" className="h-16" />
              <Typography variant="h4" className="!font-quicksand">Petunjuk<br />Permohonan KRK</Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="!rounded-2xl !shadow-sm !bg-ggray-500 !drop-shadow-2xl !shadow-gdarkgray-400">
          <CardContent className="!p-8 h-full">
            <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
              <img src={map_icon} alt="compas_icon" className="h-16" />
              <Typography variant="h4" className="!font-quicksand">Tentang<br />Tata Ruang</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

export default Section3
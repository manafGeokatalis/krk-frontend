import { Card, CardContent, Typography } from "@mui/material"
import kerenka from '../../../assets/kerenka.svg'
import compas_icon from '../../../assets/compas_icon.svg'
import document_icon from '../../../assets/document_icon.svg'
import search_icon from '../../../assets/search_icon.svg'




import { Link } from "react-router-dom"

function Section3() {
  return (
    <div className="flex items-center justify-center">
      <div className='max-w-[1120px] w-full md:w-[1120px] flex items-center py-0 md:py-16 flex-col px-8 md:px-0'>
        <hr className="w-full" />
        <div className="flex gap-20 items-center w-full py-8 md:py-20">
          <div className="flex flex-col gap-3 w-full text-center md:text-right">
            <Typography variant="h5" className="!font-quicksand !font-bold">Web Aplikasi Kerenka</Typography>
            <Typography variant="h6" className="!font-heebo !font-thin text-justify"><span className="!font-bold">KeRenKa</span> adalah web aplikasi yang dikembangkan oleh pemerintah Kabupaten Manggarai Barat untuk memudahkan masyarakat dalam proses permohonan penerbitan dokumen Keterangan Rencana Kota (KRK) dengan cara memangkas birokrasi dan mempersingkat waktu pengurusan dokumen KRK menggunakan inovasi teknologi informasi dan komunikasi</Typography>
          </div>
          <div className="hidden md:flex flex-col gap-2 items-center w-full max-w-lg">
            <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
            <Typography variant='h6' className='!font-quicksand !text-center !leading-tight !font-thin !text-lg'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
          </div>
        </div>
        <div className="py-5 hidden md:grid grid-cols-2 gap-28">
          <Link to={'/tentang-krk'}>
            <Card className="!rounded-2xl !shadow-sm !bg-ggray-500 !drop-shadow-xl !shadow-gdarkgray-400 hover:!drop-shadow-none !transition-all !duration-200 h-56">
              <CardContent className="!p-8 h-full">
                <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
                  <img src={compas_icon} alt="compas_icon" className="w-16" />
                  <Typography variant="h4" className="!font-quicksand">Tetang KRK</Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to={'/petunjuk-permohonan'}>
            <Card className="!rounded-2xl !shadow-sm !bg-ggray-500 !drop-shadow-2xl !shadow-gdarkgray-400 hover:!drop-shadow-none !transition-all !duration-200 h-56">
              <CardContent className="!p-8 h-full">
                <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
                  <img src={document_icon} alt="compas_icon" className="h-16" />
                  <Typography variant="h4" className="!font-quicksand">Petunjuk<br />Permohonan KRK</Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
          {/* <Link to={'/tentang-tataruang'}>
          <Card className="!rounded-2xl !shadow-sm !bg-ggray-500 !drop-shadow-2xl !shadow-gdarkgray-400 hover:!drop-shadow-none !transition-all !duration-200 h-56">
            <CardContent className="!p-8 h-full">
              <div className="flex flex-col gap-4 items-center justify-center h-full text-center">
                <img src={map_icon} alt="compas_icon" className="h-16" />
                <Typography variant="h4" className="!font-quicksand">Tentang<br />Tata Ruang</Typography>
              </div>
            </CardContent>
          </Card>
        </Link> */}
        </div>
        <div className="flex md:hidden w-full md:w-0">
          <div className="w-full">
            <Link to={'/pantau'}>
              <div className="bg-[#88B9DD] justify-between px-8 items-center  flex w-full text-[#4D4D4D] gap-3 rounded-xl drop-shadow-lg py-3 font-semibold cursor-pointer">
                <img className="w-8" src={search_icon} />
                <div className="w-full flex justify-center">
                  Pantau Permohonan KRK Anda
                </div>
              </div></Link>
            <div className="text-justify mt-8">
              Permohonan KRK yang telah anda ajukan dapat dipantau langsung tanpa log in, dengan memasukkan nomor registrasi permohonan
            </div>
            <Link to={'/tentang-krk'}>
              <div className="bg-[#88B9DD] mt-8 justify-between px-8 items-center  flex w-full text-[#4D4D4D] rounded-xl drop-shadow-lg py-3 font-semibold cursor-pointer">
                <img className="w-8" src={compas_icon} />
                <div className="w-full flex justify-center">
                  Tentang KRK
                </div>
              </div></Link>
            <Link to={'/petunjuk-permohonan'}>
              <div className="bg-[#88B9DD] mt-8 justify-between px-8 items-center  flex w-full text-[#4D4D4D] rounded-xl drop-shadow-lg py-3 font-semibold cursor-pointer">
                <img className="w-8" src={document_icon} />
                <div className="w-full flex justify-center text-center">
                  Petunjuk<br /> Permohonan KRK
                </div>
              </div></Link>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Section3
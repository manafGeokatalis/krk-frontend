import { Card, CardContent, Typography } from "@mui/material"
import search_icon from '../../../assets/search_icon.svg'
import { Link } from "react-router-dom"

function Section2() {
  return (
    <div className="hidden md:flex  justify-center items-center w-full">
      <Link className="max-w-[1120px] md:w-[1120px] px-4 md:px-0" to={'/pantau'}>
        <div className='flex items-center py-5'>
          <Card className="!bg-gdarkgray-500 !rounded-3xl !w-full hover:!bg-gdarkgray-600 !transition-all !duration-200">
            <CardContent className="!p-14">
              <div className="flex justify-end items-center gap-14">
                <div className="flex flex-col gap-2 text-right">
                  <Typography variant="h4" className="!font-quicksand">Pantau Permohonan KRK anda</Typography>
                  <Typography variant="h6" className="!font-heebo !font-thin">Permohonan KRK yang telah anda ajukan dapat dipantau langsung tanpa log in, dengan memasukkan nomer registrasi</Typography>
                </div>
                <img src={search_icon} alt="search_icon" className="w-16" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Link>
    </div>
  )
}

export default Section2
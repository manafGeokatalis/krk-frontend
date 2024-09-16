import { ReactNode } from "react";
import NavBar from "./auth-partial/NavBar";
import BottomNavigation from "./auth-partial/BottomNavigation";
import { Typography } from "@mui/material";
import Header from "./auth-partial/Header";
type Props = {
  title?: string;
  children: ReactNode;
}

function AuthLayout({ title = 'Permohonan', children }: Props) {
  document.title = `${title || 'Beranda'} - ${import.meta.env.VITE_APP_NAME}`;

  return (
    <div className="flex bg-ggray-500 text-white">
      <div className="hidden md:flex">
      <NavBar />
      </div>
      <div className="w-full  md:pl-72 flex flex-col min-h-screen relative">
        <Header/>
        <div className="px-4">
          <div>
            {children}
          </div>
          <div className="flex justify-between items-center pr-8 py-5 mt-20">
            <div>
              <Typography className='!font-heebo !text-xs !font-thin'>Didesain dan dikembangkan oleh Pemerintah Kabupaten Manggarai Barat bekerjasama dengan</Typography>
              <a href="https://geokatalis.com/" target="_blank">
                <Typography className='!font-heebo !text-sm !font-thin !text-gblue-200'>PT. Geokatalis Teknologi Pemetaan</Typography>
              </a>
            </div>
            <div className="flex justify-end text-right">
              <Typography className='!font-heebo !text-xs !font-thin'>Copyright &copy; 2023  KeRenKa Kabupaten Manggarai Barat</Typography>
            </div>
          </div>
        </div>
        
      </div>
      <BottomNavigation/>
    </div>
  )
}

export default AuthLayout
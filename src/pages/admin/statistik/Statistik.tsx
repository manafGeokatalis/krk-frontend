import AuthLayout from "../../../layouts/AuthLayout"
import { Typography } from "@mui/material"
import StatistikDesktop from "./components/StatistikDesktop"
import StatistikMobile from "./components/StatistikMobile"
export default function Statistik() {
    return (
        <>
            <AuthLayout title="Permohonan KRK">
                <div className="hidden md:flex  gap-3 mt-12 justify-center items-center">
                    <Typography variant="h4" className="!font-quicksand !font-semibold">Statistik</Typography>
                </div>
                <div className="flex  justify-center mt-12">
                    <Typography variant="h4" className="!font-quicksand ">Statistik Pengguna</Typography>
                </div>
                <div className="hidden md:flex">
                    <StatistikDesktop />
                </div>
                <div className="flex md:hidden">
                    <StatistikMobile />
                </div>
            </AuthLayout>
        </>
    )
}
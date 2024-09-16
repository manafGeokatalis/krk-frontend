import AuthLayout from "../../../layouts/AuthLayout"
import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import StatistikDesktop from "./components/StatistikDesktop"
import StatistikMobile from "./components/StatistikMobile"
export default function Statistik(){
    return(
        <>
            <AuthLayout title="Permohonan KRK">
                <div className="hidden md:flex justify-between gap-3 mt-12 items-center">
                    <Typography variant="h4" className="!font-quicksand !font-semibold">Statistik</Typography>
                </div>
                <div className="flex md:hidden justify-center mt-12">
                    <Typography variant="h4" className="!font-quicksand !font-semibold">Statistik Pengguna</Typography>
                </div>
                <div className="hidden md:flex">
                    <StatistikDesktop/>
                </div>
                <div className="flex md:hidden">
                    <StatistikMobile/>
                </div>
            </AuthLayout>
        </>
    )
}
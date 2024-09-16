import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"


export default function StatistikMobile(){
    return(
        <>
            <div className="mt-10 w-full">
               <div className="px-4">
                    <div className="flex w-full gap-2">
                        <div className="w-1/2 bg-[#4D4D4D] flex-col py-2  rounded-md flex justify-center items-center">
                            <div className="text-[#B3B3B3] text-xs">
                                Kunjungan bulan ini
                            </div>
                            <div className="text-4xl font-semibold py-4">
                                400
                            </div>
                        </div>
                        <div className="w-1/2 bg-[#4D4D4D] flex-col py-2  rounded-md flex justify-center items-center">
                            <div className="text-[#B3B3B3] text-xs">
                                Permohonan diproses
                            </div>
                            <div className="text-4xl font-semibold py-4">
                                20
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 bg-[#4D4D4D] flex-col py-2  rounded-md flex justify-center items-center">
                        <div className="text-[#B3B3B3] text-xs">
                            Total KRK terbit bulan ini
                        </div>
                        <div className="text-4xl font-semibold py-4">
                            10
                        </div>
                    </div>
               </div>
               <div className="mt-4 bg-[#4D4D4D] p-4">
               <TableContainer className="border border-[#B3B3B3]">
                <Table size="small">
                    <TableHead className="bg-[#6666]">
                    <TableRow>
                        <TableCell className="!font-heebo !text-base" align="center">Bulan</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Kunjungan</TableCell>
                        <TableCell className="!font-heebo !text-base" align="center">Akun Baru</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow key={0}>
                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">November</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">20</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">0</TableCell>
                        </TableRow>
                        <TableRow key={0}>
                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">November</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">20</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">0</TableCell>
                        </TableRow>
                        <TableRow key={0}>
                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">November</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">20</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">0</TableCell>
                        </TableRow>
                        <TableRow key={0}>
                        <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">November</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">20</TableCell>
                        <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">0</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
               </div>
            </div>
        </>
    )
}
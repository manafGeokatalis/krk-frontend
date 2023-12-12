import { Typography } from "@mui/material"

function Section4() {
  return (
    <div className="flex flex-col gap-20 py-5 items-center justify-center">
      <hr className="w-full max-w-5xl" />
      <div className="flex flex-col gap-7 w-full max-w-5xl items-center justify-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">STATISTIK PENGGUNA</Typography>
        <div className="flex justify-between gap-20 w-full">
          <div className="flex flex-col gap-1 text-center w-full">
            <Typography variant="h2" className="!font-quicksand !font-semibold">263</Typography>
            <Typography variant="h6" className="!font-quicksand !font-thin">Kunjungan web bulan ini</Typography>
          </div>
          <div className="flex flex-col gap-1 text-center w-full">
            <Typography variant="h2" className="!font-quicksand !font-semibold">75</Typography>
            <Typography variant="h6" className="!font-quicksand !font-thin">Permohonan diproses</Typography>
          </div>
          <div className="flex flex-col gap-1 text-center w-full">
            <Typography variant="h2" className="!font-quicksand !font-semibold">15</Typography>
            <Typography variant="h6" className="!font-quicksand !font-thin">KRK Terbit</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section4
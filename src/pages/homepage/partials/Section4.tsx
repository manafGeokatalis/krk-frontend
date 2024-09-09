import { CircularProgress, Typography } from "@mui/material"
import { useRecoilState } from "recoil"
import { notification } from "../../../utils/Recoils"
import { createNotifcation } from "../../../utils/Helpers";
import { useEffect, useState } from "react";
import axios from "axios";

function Section4() {
  const [_n, setN] = useRecoilState(notification);
  const [data, setData] = useState({
    loading: true,
    visitor_count: 0,
    permohonan_diprose: 0,
    krk_terbit: 0
  });

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const res: any = await axios.get('/services/data-status');
      setData(res?.data?.data);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }
  return (
    <div className="flex items-center justify-center mt-8">
       <div className="max-w-[1500px] w-full px-4 md:px-0  md:w-[1500px] flex  flex-col gap-0  py-5 items-center justify-center">
        <hr className="w-full" />
        <div className="flex flex-col gap-7  items-center justify-center mt-8">
          <Typography variant="h4" className="!font-quicksand !font-semibold hidden md:flex">STATISTIK  PENGGUNA</Typography>
          <Typography variant="h4" className="!font-quicksand !font-semibold flex md:hidden text-center">STATISTIK <br/> PENGGUNA</Typography>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 w-full">
            <div className="flex flex-col gap-1 text-center w-full">
              <Typography variant="h2" className="!font-quicksand !font-semibold">{data?.loading ? <CircularProgress color="secondary" /> : data?.visitor_count}</Typography>
              <Typography variant="h6" className="!font-quicksand !font-thin">Kunjungan web bulan ini</Typography>
            </div>
            <div className="flex flex-col gap-1 text-center w-full">
              <Typography variant="h2" className="!font-quicksand !font-semibold">{data?.loading ? <CircularProgress color="secondary" /> : data?.permohonan_diprose}</Typography>
              <Typography variant="h6" className="!font-quicksand !font-thin">Permohonan diproses</Typography>
            </div>
            <div className="flex flex-col gap-1 text-center w-full">
              <Typography variant="h2" className="!font-quicksand !font-semibold">{data?.loading ? <CircularProgress color="secondary" /> : data?.krk_terbit}</Typography>
              <Typography variant="h6" className="!font-quicksand !font-thin">KRK Terbit</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section4
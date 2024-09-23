import { Typography } from "@mui/material"
import AuthLayout from "../../layouts/AuthLayout"
import GButton from "../../components/GButton"
import { Add } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { notification } from "../../utils/Recoils"
import { createNotifcation } from "../../utils/Helpers"
import axios from "axios"
import ListAttributes from "../../components/ListAttributes"
import DesktopView from "./components/DesktopView"
import logoLodokMabar from '../../assets/lodok_mabar_logo.svg'
import kerenka from '../../assets/kerenka.svg'
import MobileView from "./components/MobileView"

let tm: any;
function Permohonan() {
  const [data, setData] = useState<any>([]);
  const [paginate, setPaginate] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 0,
  });
  const [_, setNotif] = useRecoilState(notification);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, [page, perPage]);

  useEffect(() => {
    clearTimeout(tm);
    tm = setTimeout(getData, 500);

    return () => clearTimeout(tm);
  }, [search]);

  const getData = async () => {
    try {
      const query: any = await axios.get(`/permohonan?page=${page}&perPage=${perPage}&search=${search}`);
      setData(query?.data?.data.data);
      setPaginate(query?.data?.data.pagination);
    } catch (error: any) {
      setNotif(createNotifcation(error?.response?.data.message, 'error'));
    }
  }

  return (
    <AuthLayout title="Permohonan KRK">
      <div className="flex justify-between gap-3 mt-12 items-center hidden md:flex">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Permohonan KRK</Typography>
        <Link className="hidden md:flex" to={'/permohonan/petunjuk'}>
          <GButton className="flex gap-1 items-center"><Add className="!w-4" /> <span>Ajukan Permohonan Baru</span></GButton>
        </Link>
      </div>
      <div className='md:hidden flex justify-center mt-6 flex-col items-center'>
        <img className='w-24' src={logoLodokMabar} alt='lodok-mabar-logo' />
        <img src={kerenka} alt="kerenka-logo" className='w-56 mt-4' />
        <div className="mt-8">
          <div className="text-xl text-center">
            Cara Mengajukan<br /> Permohonan KRK Baru
          </div>
          <div className="px-6 text-justify mt-4 text-sm">
            Permohonan penerbitan dokumen KRK baru tidak dapat dilakukan pada perangkat handphone. Silahkan mengakses web Kerenka pada PC/Laptop.
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 font-heebo  mt-20">
        <div className="flex flex-col gap-2 hidden md:flex">
          <ListAttributes onChange={e => {
            setPerPage(e.perPage);
            setSearch(e.search);
          }} />
          <DesktopView data={data} paginate={paginate} setPage={setPage} />
        </div>
        <div className="flex md:hidden flex-col">
          <div className="text-center flex justify-center text-xl">PERMOHONAN ANDA</div>
          <MobileView data={data} />
        </div>
      </div>
    </AuthLayout>
  )
}

export default Permohonan
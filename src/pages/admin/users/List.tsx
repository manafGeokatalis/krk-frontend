import { Typography } from "@mui/material"
import AuthLayout from "../../../layouts/AuthLayout"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { notification } from "../../../utils/Recoils"
import { createNotifcation } from "../../../utils/Helpers"
import axios from "axios"
import ListAttributes from "../../../components/ListAttributes"
import GButton from "../../../components/GButton"
import { Add } from "@mui/icons-material"
import ConfirmDialog from "../../../components/ConfirmDialog"
import ListUserDesktop from "./components/ListUserDesktop"
import ListUserMobile from "./components/ListUserMobile"
let tm: any;
function UsersList() {
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
  const [_n, setN] = useRecoilState(notification);
  const [confirm, setConfirm] = useState({
    show: false,
    title: '',
    message: '',
    uuid: null,
  });

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
      const query: any = await axios.get(`/users?page=${page}&perPage=${perPage}&search=${search}`);
      setData(query?.data?.data.data);
      setPaginate(query?.data?.data.pagination);
    } catch (error: any) {
      setNotif(createNotifcation(error?.response?.data.message, 'error'));
    }
  }

  const deleteData = async () => {
    try {
      const res: any = await axios.delete(`/users/${confirm.uuid}`);
      getData();
      setN(createNotifcation(res?.data?.message));
      setConfirm({ ...confirm, show: false });
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }

  return (
    <AuthLayout title="Daftar User">
      <ConfirmDialog show={confirm.show} title={confirm.title} message={confirm.message} onClose={() => setConfirm({ ...confirm, show: false })} onSubmit={deleteData} color="error" />
      <div className=" hidden md:flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Daftar User</Typography>
        <Link to={'/users/tambah'}>
          <GButton className="flex gap-1 items-center"><Add className="!w-4" /> <span>Tambah Data</span></GButton>
        </Link>
      </div>
      <div className="flex md:hidden mt-12 justify-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">USER</Typography>

      </div>
      <div className="flex flex-col gap-5 font-heebo mt-10  md:mt-20">
        <div className="flex flex-col gap-2">
          <ListAttributes onChange={e => {
            setPerPage(e.perPage);
            setSearch(e.search);
          }} />
          <div className="hidden md:flex w-full flex-col">
            <ListUserDesktop
              data={data}
              paginate={paginate}
              setConfirm={setConfirm}
              setPage={setPage}
            />
          </div>
          <div className="flex md:hidden">
            <ListUserMobile
              data={data}
              paginate={paginate}
              setConfirm={setConfirm}
              setPage={setPage}
            />
          </div>
          {/* <div className="rounded-2xl overflow-hidden border">
            <TableContainer>
              <Table size="small">
                <TableHead className="bg-gdarkgray-500">
                  <TableRow>
                    <TableCell className="!font-heebo !text-base" align="center">Nama</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Tanggal Register</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Role</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? data.map((v: any, i: number) => {
                    return <TableRow key={i}>
                      <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{v.name}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{formatDate(v.createdAt, 'DD MM YYYY', 'long')}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{ucwords(v.role.toLowerCase())}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white w-0" align="center">
                        <div className="flex justify-end gap-1 items-center">
                          <Link to={`/users/${v.uuid}`}>
                            <Button size="small" variant="contained" color="warning" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap">Ubah</Button>
                          </Link>
                          <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => setConfirm({
                            ...confirm,
                            uuid: v.uuid,
                            show: true,
                            title: 'Anda Yakin Ingin Menghapus?',
                            message: `<center>Data user ${v.name} akan terhapus!</cemter>`
                          })}>Hapus</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  }) : <TableRow><TableCell colSpan={6} align="center">Data tidak tersedia</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-center mt-3">
            <Pagination color='secondary' variant="outlined" count={paginate.totalPages} page={paginate.currentPage} onChange={(_, p) => setPage(p)} />
          </div> */}
        </div>
      </div>
    </AuthLayout>
  )
}

export default UsersList
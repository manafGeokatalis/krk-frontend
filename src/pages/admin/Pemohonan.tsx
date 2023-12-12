import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import AuthLayout from "../../layouts/AuthLayout"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { notification } from "../../utils/Recoils"
import { createNotifcation, downloadFile, formatDate } from "../../utils/Helpers"
import axios from "axios"
import ListAttributes from "../../components/ListAttributes"

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
  const [downloadProgress, setDownloadProgress] = useState(0);

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
      <div className="flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Permohonan KRK</Typography>
      </div>
      <div className="flex flex-col gap-5 font-heebo  mt-20">
        <div className="flex flex-col gap-2">
          <ListAttributes onChange={e => {
            setPerPage(e.perPage);
            setSearch(e.search);
          }} />
          <div className="rounded-2xl overflow-hidden border">
            <TableContainer>
              <Table size="small">
                <TableHead className="bg-gdarkgray-500">
                  <TableRow>
                    <TableCell className="!font-heebo !text-base" align="center">Pemohon</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Tanggal Pengajuan</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Kode Registrasi</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Tahap</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Download Berkas</TableCell>
                    <TableCell className="!font-heebo !text-base" align="center">Download Form</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? data.map((v: any, i: number) => {
                    return <TableRow key={i}>
                      <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{v.name}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{formatDate(v.createdAt, 'DD MM YYYY', 'long')}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{v.registration_number}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">
                        <Link to={`/permohonan/${v.uuid}`}>
                          <Button size="small" variant="contained" className={"!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap " + (v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 11 ? '!bg-ggray-100' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 9 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
                            {v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step !== 11 ? v.permohonan_progresses[v.permohonan_progresses.length - 1]?.desc : 'KRK DITOLAK'}
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white" align="center">
                        <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadFile(`/download/permohonan/${v.uuid}/berkas`, {
                          filename: `Berkas Permohonan ${v.registration_number}.zip`,
                          onProgress(progress) {
                            setDownloadProgress(progress);
                            if (progress == 100) {
                              setTimeout(() => {
                                setDownloadProgress(0);
                              }, 1000);
                            }
                          },
                        })} disabled={downloadProgress > 0}>Berkas</Button>
                        {downloadProgress > 0 &&
                          <LinearProgress color="error" variant="determinate" value={downloadProgress} className="mt-1" />
                        }
                      </TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white" align="center">
                        <Link to={`/permohonan/${v.uuid}`}>
                          <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap">Form</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  }) : <TableRow><TableCell colSpan={6} align="center">Data tidak tersedia</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-center mt-3">
            <Pagination color='secondary' variant="outlined" count={paginate.totalPages} page={paginate.currentPage} onChange={(_, p) => setPage(p)} />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Permohonan
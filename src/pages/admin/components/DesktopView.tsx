import ListAttributes from "../../../components/ListAttributes"
import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { formatDate } from "../../../utils/Helpers"

interface DesktopViewProps{
    data:any,
    setSearch:React.Dispatch<React.SetStateAction<any>>
    ,setPerPage:React.Dispatch<React.SetStateAction<any>>,
    setDownloadProgress:React.Dispatch<React.SetStateAction<any>>,
    downloadProgress:any,
    paginate:any,
    setPage:React.Dispatch<React.SetStateAction<any>>,
    downloadForm:React.Dispatch<React.SetStateAction<any>>,
    setConfirm:React.Dispatch<React.SetStateAction<any>>,
    downloadFile:any,
    process:any
}

export default function DesktopView({data,setSearch,setPerPage,setDownloadProgress,downloadProgress,paginate,setPage,downloadForm,setConfirm,downloadFile,process}:DesktopViewProps){
    return (    
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
                    <TableCell className="!font-heebo !text-base" align="center">Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? data.map((v: any, i: number) => {
                    return <TableRow key={i}>
                      <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{v.name}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{formatDate(v.createdAt, 'DD MM YYYY', 'long')}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{v.registration_number}</TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white w-0" align="center">
                        <Link to={`/permohonan/${v.uuid}`}>
                          <Button size="small" variant="contained" className={"!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap " + (v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 11 ? '!bg-ggray-100' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 9 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
                            {v.permohonan_progresses.length == 0 ? '0. Permohonan Telah Diajukan' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step !== 11 ? v.permohonan_progresses[v.permohonan_progresses.length - 1]?.desc : 'KRK DITOLAK'}
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white w-0" align="center">
                        <div className="flex gap-1">
                          <div>
                            <Button size="small" variant="contained" color="info" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadFile(`/download/permohonan/${v.uuid}/berkas`, {
                              filename: `KerenkaMaBarBerkas[${v.registration_number}].zip`,
                              onProgress(progress:any) {
                                setDownloadProgress({ ...downloadProgress, [v.uuid]: progress });
                                if (progress == 100) {
                                  setTimeout(() => {
                                    setDownloadProgress({ ...downloadProgress, [v.uuid]: 0 });
                                  }, 1000);
                                }
                              },
                            })} disabled={downloadProgress[v.uuid] > 0}>Berkas</Button>
                            {downloadProgress[v.uuid] > 0 &&
                              <LinearProgress color="primary" variant="determinate" value={downloadProgress[v.uuid]} className="mt-1" />
                            }
                          </div>
                          <Button size="small" variant="contained" color="warning" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(v)} disabled={process[v.uuid]}>Form</Button>
                          <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => setConfirm({
                            ...confirm,
                            show: true,
                            title: `Hapus Permohonan ${v.name}?`,
                            message: `<center>Data permohonan ${v.name} akan terhapus permanen dan tidak dapat dikembalikan</center>`,
                            uuid: v.uuid
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
          </div>
        </div>
    )
}
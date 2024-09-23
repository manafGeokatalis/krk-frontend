
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { formatDate } from "../../../utils/Helpers"
import ButtonPermohonan from "./ButtonPermohonan"


interface DesktopViewProps {
  data: any,
  paginate: any,
  setPage: React.Dispatch<React.SetStateAction<any>>
}

export default function DesktopView({ data, paginate, setPage }: DesktopViewProps) {

  return (
    <>
      <div className="rounded-2xl overflow-hidden border">
        <Table size="small">
          <TableHead className="bg-gdarkgray-500">
            <TableRow>
              <TableCell className="!font-heebo !text-base" align="center">Lokasi, Tujuan</TableCell>
              <TableCell className="!font-heebo !text-base" align="center">Tanggal Pengajuan</TableCell>
              <TableCell className="!font-heebo !text-base" align="center">Staf Penerima</TableCell>
              <TableCell className="!font-heebo !text-base" align="center">Kode Registrasi</TableCell>
              <TableCell className="!font-heebo !text-base" align="center">Tahap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? data.map((v: any, i: number) => {
              return <TableRow key={i}>
                <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{v.lokasi_kelurahan.name}, {v.fungsi_bangunan}</TableCell>
                <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{formatDate(v.createdAt, 'DD MM YYYY', 'long')}</TableCell>
                <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{v.staff?.name ?? '-'}</TableCell>
                <TableCell className="!border-b-0 !border-t !border-t-white" align="center">{v.registration_number}</TableCell>
                <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white w-0" align="center">
                  <ButtonPermohonan progress={v.permohonan_progresses} uuid={v.uuid} />
                  {/* <Link to={`/permohonan/${v.uuid}`}>
                        <Button size="small" variant="contained" className={"!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap " + (v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 11 ? '!bg-ggray-100' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 9 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
                          {v.permohonan_progresses.length == 0 ? '0. Permohonan Telah Diajukan' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step !== 11 ? v.permohonan_progresses[v.permohonan_progresses.length - 1]?.desc : 'KRK DITOLAK'}
                        </Button>
                      </Link> */}
                </TableCell>
              </TableRow>
            }) : <TableRow><TableCell colSpan={5} align="center">Data tidak tersedia</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-3">
        <Pagination color='secondary' variant="outlined" count={paginate.totalPages} page={paginate.currentPage} onChange={(_, p) => setPage(p)} />
      </div>
    </>
  )
}
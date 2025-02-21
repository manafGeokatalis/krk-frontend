import ListAttributes from "../../../components/ListAttributes"
import { Button, Pagination, Table, TableBody, TableCell, TableSortLabel, Checkbox, TableContainer, TableHead, TableRow } from "@mui/material"
import { formatDate } from "../../../utils/Helpers"
import ButtonPermohonan from "../../public/components/ButtonPermohonan"
import DialogDownloadFile from "./DialogDownloadFile"
import { useEffect, useState } from "react"
import ConfirmDialogMultipleDelete from "./ConfirmDialogMultipleDelete"
import ConfirmDialogMultipleUpdate from "./ConfirmDialogMultipleUpdate"
import { OrderType } from "../../../data/interface/user"

interface DesktopViewProps {
  data: any,
  setSearch: React.Dispatch<React.SetStateAction<any>>
  , setPerPage: React.Dispatch<React.SetStateAction<any>>,
  setDownloadProgress: React.Dispatch<React.SetStateAction<any>>,
  downloadProgress: any,
  paginate: any,
  setPage: React.Dispatch<React.SetStateAction<any>>,
  downloadForm: React.Dispatch<React.SetStateAction<any>>,
  setConfirm: React.Dispatch<React.SetStateAction<any>>,
  downloadFile: any,
  process: any,
  getData: () => void,
  handleRequestSort: (column: string) => void,
  order: OrderType,
  orderBy: string,
}

export default function DesktopView({ data, setSearch, setPerPage, setDownloadProgress, order, orderBy, downloadProgress, paginate, setPage, downloadForm, setConfirm, downloadFile, getData, handleRequestSort }: DesktopViewProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogDeleteMultipleOpen, setDialogDeleteMultipleOpen] = useState(false)
  const [dialogUpdateMultipleOpen, setDialogUpdateMultipleOpen] = useState(false)

  const [selectPermohonan, setSelectPermohonan] = useState<any>(null)

  const [selected, setSelected] = useState<any>([]);


  const handleCheckboxClick = (event: any, id: any) => {
    event.stopPropagation();
    const newSelected: any = selected.includes(id)
      ? selected.filter((s: any) => s !== id)
      : [...selected, id];
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = data.map((row: any) => row.id); // Assuming each row has a unique 'id'
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id: any) => selected.includes(id);

  useEffect(() => {
    getData()
  }, [dialogUpdateMultipleOpen, dialogDeleteMultipleOpen])


  return (
    <div className="flex flex-col gap-2">

      <DialogDownloadFile show={dialogOpen} data={selectPermohonan} downloadForm={downloadForm} downloadProgress={downloadProgress} onDownloadAll={() => downloadFile(`/download/permohonan/${selectPermohonan.uuid}/berkas`, {
        filename: `KerenkaMaBarBerkas[${selectPermohonan?.registration_number}].zip`,
        onProgress(progress: any) {
          setDownloadProgress({ ...downloadProgress, [selectPermohonan.uuid]: progress });
          if (progress == 100) {
            setTimeout(() => {
              setDownloadProgress({ ...downloadProgress, [selectPermohonan.uuid]: 0 });
            }, 1000);
          }
        },
      })} onClose={() => setDialogOpen(!dialogOpen)} />
      <ConfirmDialogMultipleDelete
        onClose={() => setDialogDeleteMultipleOpen(false)}
        selected={selected}
        show={dialogDeleteMultipleOpen}
        onClearSelect={() => setSelected([])}
      />
      <ConfirmDialogMultipleUpdate
        onClose={() => setDialogUpdateMultipleOpen(false)}
        selected={selected}
        show={dialogUpdateMultipleOpen}
        onClearSelect={() => setSelected([])}
      />
      <ListAttributes onChange={e => {
        setPerPage(e.perPage);
        setSearch(e.search);
      }} />
      {selected.length > 0 ? (<div className="px-4 flex  gap-4">
        <Button size="small" variant="contained" className="!py-3 md:!py-0.5  !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap !bg-gblue-500" onClick={() => setDialogUpdateMultipleOpen(true)}>Ubah Tahapan Permohonan</Button>
        <Button size="small" variant="contained" color="error" className="!py-3 md:!py-0.5  !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => setDialogDeleteMultipleOpen(true)}>Hapus Permohonan</Button>

      </div>) : (<></>)}
      <div className="rounded-2xl overflow-hidden border mt-4">
        <TableContainer>
          <Table size="small">
            <TableHead className="bg-gdarkgray-500">
              <TableRow>
                <TableCell className="!font-heebo !text-base" align="center">
                  <Checkbox
                    color="primary"
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}

                  />
                </TableCell>

                <TableCell className="!font-heebo !text-base" align="center">
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Pemohon
                  </TableSortLabel>

                </TableCell>
                <TableCell className="!font-heebo !text-base" align="center">
                  <TableSortLabel
                    active={orderBy === 'created_at'}
                    direction={orderBy === 'created_at' ? order : 'asc'}
                    onClick={() => handleRequestSort('created_at')}
                  >
                    Tanggal Pengajuan
                  </TableSortLabel>


                </TableCell>
                <TableCell className="!font-heebo !text-base" align="center">Kode Registrasi</TableCell>
                <TableCell className="!font-heebo !text-base" align="center">
                  <TableSortLabel
                    active={orderBy === 'step'}
                    direction={orderBy === 'step' ? order : 'asc'}
                    onClick={() => handleRequestSort('step')}
                  >
                    Tahap
                  </TableSortLabel>

                </TableCell>
                <TableCell className="!font-heebo !text-base" align="center">Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? data.map((v: any, i: number) => {
                const isItemSelected = isSelected(v.id);

                return <TableRow key={i} selected={isItemSelected}
                >
                  <TableCell padding="checkbox" className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onChange={(event) => handleCheckboxClick(event, v.id)}

                    />
                  </TableCell>
                  <TableCell className="!border-b-0 !border-t !border-r !border-r-white !border-t-white" align="center">{v.name}</TableCell>
                  <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{formatDate(v.createdAt, 'DD MM YYYY', 'long')}</TableCell>
                  <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white" align="center">{v.registration_number}</TableCell>
                  <TableCell className="!border-b-0 !border-t !border-t-white !border-r !border-r-white w-0" align="center">
                    {/* <Link to={`/permohonan/${v.uuid}`}>
                      <Button size="small" variant="contained" className={"!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap " + (v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 11 ? '!bg-ggray-100' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step === 9 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
                        {v.permohonan_progresses.length == 0 ? '0. Permohonan Telah Diajukan' : v.permohonan_progresses[v.permohonan_progresses.length - 1]?.step !== 11 ? v.permohonan_progresses[v.permohonan_progresses.length - 1]?.desc : 'KRK DITOLAK'}
                      </Button>
                    </Link> */}
                    <ButtonPermohonan progress={v.permohonan_progresses} uuid={v.uuid} />
                  </TableCell>
                  <TableCell className="!border-b-0 !border-t !border-t-white !border-l !border-l-white w-0" align="center">
                    <div className="flex gap-1">
                      {/* <div>
                        <Button size="small" variant="contained" color="info" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadFile(`/download/permohonan/${v.uuid}/berkas`, {
                          filename: `KerenkaMaBarBerkas[${v.registration_number}].zip`,
                          onProgress(progress: any) {
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
                      </div> */}
                      {/* <Button size="small" variant="contained" color="warning" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(v)} disabled={process[v.uuid]}>Form</Button> */}
                      <Button size="small" variant="contained" color="warning" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => {
                        setSelectPermohonan(v)
                        setDialogOpen(true)
                      }} >Periksa Dokumen</Button>

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
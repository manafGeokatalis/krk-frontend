import { Button, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import AuthLayout from "../../layouts/AuthLayout"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { notification } from "../../utils/Recoils"
import { createNotifcation, downloadFile, formatDate, ucwords } from "../../utils/Helpers"
import axios from "axios"
import ListAttributes from "../../components/ListAttributes"
import excel from 'exceljs';
import ConfirmDialog from "../../components/ConfirmDialog"

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
  const [process, setProcess] = useState(false);
  const [confirm, setConfirm] = useState({
    show: false,
    title: '',
    message: '',
    uuid: null
  })

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

  const deleteData = async () => {
    try {
      const res: any = await axios.delete(`/permohonan/${confirm.uuid}`);
      getData();
      setNotif(createNotifcation(res?.data?.message));
      setConfirm({ ...confirm, show: false });
    } catch (error: any) {
      setNotif(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setConfirm({ ...confirm, show: false });
    }
  }

  const downloadForm = (dta: any) => {
    setProcess(true);
    const filename = (`KerenkaMaBarForm[${dta.registration_number}]`);
    const wb = new excel.Workbook();
    const sheet = wb.addWorksheet(dta.registration_number);
    sheet.addRow(['', 'Form Permohonan Penerbitan Dokumen KRK (Keterangan Rencana Kabupaten)']);

    sheet.getColumn('A').width = 5;
    sheet.getColumn('B').width = 25;
    sheet.getColumn('C').width = 50;
    sheet.getColumn('A').alignment = { vertical: 'middle', horizontal: 'center' };

    sheet.getCell('B1').font = { bold: true };

    sheet.addRow(['', 'Data Pemohon']);
    sheet.getCell('B2').font = { bold: true };
    sheet.addRow([1, 'Nama Pemohon', dta.name]);
    sheet.addRow([2, 'Email Pemohon *', dta.email]);
    sheet.addRow([3, 'Whatsapp *', dta.wa]);
    sheet.addRow([4, 'Whatsapp kuasa', dta.wa_kuasa]);
    sheet.addRow([5, 'Provinsi', ucwords(dta.provinsi?.name.toLowerCase())]);
    sheet.addRow([6, 'Kabupaten / Kota', ucwords(dta.kabupaten?.name.toLowerCase())]);
    sheet.addRow([7, 'Kecamatan', dta.kecamatan?.name]);
    sheet.addRow([8, 'Desa / Kelurahan', dta.kelurahan?.name]);
    sheet.addRow([9, 'Alamat Lengkap', dta.alamat]);

    sheet.addRow(['']);

    sheet.addRow(['', 'Lokasi Izin']);
    sheet.getCell('B13').font = { bold: true };
    sheet.addRow([1, 'Provinsi', ucwords(dta.lokasi_provinsi.name.toLowerCase())]);
    sheet.addRow([2, 'Kabupaten / Kota', ucwords(dta.lokasi_kabupaten.name.toLowerCase())]);
    sheet.addRow([3, 'Kecamatan', dta.lokasi_kecamatan.name]);
    sheet.addRow([4, 'Desa / Kelurahan', dta.lokasi_kelurahan.name]);
    sheet.addRow([5, 'Alamat Lengkap', dta.lokasi_alamat]);
    sheet.addRow([6, 'NPWP wajib pajak', dta.npwp]);
    sheet.addRow([7, 'Koordinat Lokasi', dta.coordinate.split(',').join(', ')]);
    sheet.addRow([8, 'Luas tanah yang dimohonkan', String(dta.luas_tanah)]);
    sheet.addRow([9, 'Fungsi Bangunan', dta.fungsi_bangunan]);

    wb.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${filename}.xlsx`;
      anchor.dispatchEvent(new MouseEvent('click'));
      window.URL.revokeObjectURL(url);
      setProcess(false);
    });
  }

  return (
    <AuthLayout title="Permohonan KRK">
      <ConfirmDialog color="error" show={confirm.show} title={confirm.title} message={confirm.message} acceptLable="Ya, Hapus Data" rejectLable="Tidak, Batalkan" onClose={() => setConfirm({ ...confirm, show: false })} onSubmit={deleteData} />
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
                          </div>
                          <Button size="small" variant="contained" color="warning" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(v)} disabled={process}>Form</Button>
                          <Button size="small" variant="contained" color="error" className="!py-0.5 !rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => setConfirm({
                            ...confirm,
                            show: true,
                            title: `Hapus Permohonan ${v.name}?`,
                            message: `<center>Data permohonan ${v.name} akan terhapus permanen dan tidak dapat dikembalikan</center>`,
                            uuid: v.uuid
                          })} disabled={process}>Hapus</Button>
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
      </div>
    </AuthLayout>
  )
}

export default Permohonan
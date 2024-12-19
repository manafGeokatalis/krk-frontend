import { Typography } from "@mui/material"
import AuthLayout from "../../layouts/AuthLayout"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { notification } from "../../utils/Recoils"
import { createNotifcation, downloadFile, ucwords } from "../../utils/Helpers"
import axios from "axios"
import excel from 'exceljs';
import ConfirmDialog from "../../components/ConfirmDialog"
import DesktopView from "./components/DesktopView"
import MobileView from "./components/MobileView"
import { OrderType } from "../../data/interface/user"

let tm: any;
function Permohonan() {
  const [data, setData] = useState<any>([]);
  const [paginate, setPaginate] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 0,
  });

  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [_, setNotif] = useRecoilState(notification);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<any>({});
  const [process, setProcess] = useState<any>({});
  const [confirm, setConfirm] = useState({
    show: false,
    title: '',
    message: '',
    uuid: null
  })

  useEffect(() => {
    getData();
  }, [page, perPage, order, orderBy]);

  useEffect(() => {
    clearTimeout(tm);
    tm = setTimeout(getData, 500);

    return () => clearTimeout(tm);
  }, [search]);

  const getData = async () => {
    try {
      const query: any = await axios.get(`/permohonan?page=${page}&perPage=${perPage}&search=${search}&order=${order}&orderBy=${orderBy}`);


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
    setProcess({ ...process, [dta.uuid]: true });
    // const filename = (`KerenkaMaBarForm[${dta.registration_number}]`);
    const filename = (`form_permohonan[${dta.registration_number}]`);

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
    sheet.addRow([4, 'Desa / Kelurahan', dta?.lokasi_kelurahan?.name ?? '']);
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
      setProcess({ ...process, [dta.uuid]: false });
    });
  }

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <AuthLayout title="Permohonan KRK">
      <ConfirmDialog color="error" show={confirm.show} title={confirm.title} message={confirm.message} acceptLable="Ya, Hapus Data" rejectLable="Tidak, Batalkan" onClose={() => setConfirm({ ...confirm, show: false })} onSubmit={deleteData} />
      <div className="hidden md:flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Permohonan KRK</Typography>
      </div>
      <div className="flex md:hidden justify-center mt-12">
        <Typography variant="h5" className="!font-quicksand !font-semibold">Daftar Permohonan</Typography>

      </div>
      <div className="hidden md:flex flex-col gap-5 font-heebo  mt-14">
        <DesktopView
          data={data}
          setSearch={setSearch}
          setPerPage={setPerPage}
          downloadFile={downloadFile}
          downloadForm={downloadForm}
          downloadProgress={downloadProgress}
          paginate={paginate}
          process={process}
          setConfirm={setConfirm}
          setDownloadProgress={setDownloadProgress}
          setPage={setPage}
          getData={getData}
          handleRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
        />
      </div>
      <div className="flex md:hidden mt-10 w-full max-h-[55vh] overflow-auto">
        <MobileView
          data={data}
          setSearch={setSearch}
          setPerPage={setPerPage}
          downloadFile={downloadFile}
          downloadForm={downloadForm}
          downloadProgress={downloadProgress}
          paginate={paginate}
          process={process}
          setConfirm={setConfirm}
          setDownloadProgress={setDownloadProgress}
          setPage={setPage}
          handleChangeOrderBy={setOrderBy}
          order={order}
          handleChangeOrder={setOrder}
          orderBy={orderBy}
        />
      </div>
    </AuthLayout>
  )
}

export default Permohonan
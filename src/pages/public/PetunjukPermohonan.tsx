import { Typography } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import { ReactNode, useState } from "react";
import GButton from "../../components/GButton";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../utils/Recoils";
import ConfirmDialog from "../../components/ConfirmDialog";

type Props = {
  title?: string;
}

type ItemListProps = {
  type: string;
  children?: ReactNode;
}

const ItemList = ({ type = 'wajib', children }: ItemListProps) => {
  let color = 'bg-ggreen-500';
  if (type == 'tentatif') {
    color = 'bg-gyellow-500'
  }
  return (
    <div className="flex gap-5 items-center">
      <span className={"font-quicksand rounded-full w-24 text-center shadow-md shadow-gdarkgray-500 drop-shadow-md capitalize " + (color)}>{type}</span>
      <Typography className="!font-quicksand !w-full">{children}</Typography>
    </div>
  )
}

function PetunjukPermohonan({ title = 'Daftarkan Permohonan KRK Anda' }: Props) {
  const userData = useRecoilValue<any>(user);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  return (
    <AuthLayout title={title}>
      <div className="md:hidden flex flex-col items-center gap-3 mt-6 md:mt-12 pl-4 md:pl-10 justify-center">
        <Typography variant="h5" className="flex md:hidden text-center !font-quicksand !font-semibold">Cara Mengajukan Permohonan KRK Baru </Typography>
        <div>Permohonan penerbitan dokumen KRK baru tidak dapat dilakukan pada perangkat handpohone. Silahkan mengakses web KRK pada PC/Laptop</div>
      </div>
      <div className="flex justify-between gap-3 mt-6 md:mt-12 pl-4 md:pl-10 items-center">
        <Typography variant="h4" className="hidden md:flex !font-quicksand !font-semibold">{title}</Typography>
        <Typography variant="h5" className="flex md:hidden !font-quicksand !font-semibold">{title}</Typography>

      </div>
      <div className="flex flex-col gap-8 md:gap-16 px-4 mt-6 md:mt-14 md:p-10">
        <div className="flex flex-col gap-5">
          <Typography variant="h5" className="md:flex hidden !font-quicksand !font-semibold" mb={2}>Formulir yang akan diisi:</Typography>
          <Typography variant="h6" className="md:hidden flex !font-quicksand !font-semibold" mb={2}>Formulir yang akan diisi:</Typography>

          <ItemList type="wajib">1. Koordinat geografis lahan yang dimohonkan.</ItemList>
          <ItemList type="wajib">2. Luas Tanah yang dimohonkan dalam m2.</ItemList>
          <ItemList type="wajib">3. Nomor pokok wajib pajak.</ItemList>
        </div>
        <div className="flex flex-col gap-5">
          <Typography variant="h5" className="md:flex hidden !font-quicksand !font-semibold" mb={2}>Syarat Dokumen:</Typography>
          <Typography variant="h6" className="md:hidden flex !font-quicksand !font-semibold" mb={2}>Syarat Dokumen:</Typography>

          <ItemList type="wajib">Scan KTP/PASSPORT/KITAS Pemohon</ItemList>
          <ItemList type="wajib">Scan Dokumen Lunas Pembayaran PBB Tahun Terakhir Asli.</ItemList>
          <ItemList type="tentatif">Scan Surat Kuasa Mengurus KRK</ItemList>
          {/* <Typography variant="h6" className="!font-quicksand !m-0" mb={2}>Jika Pemilik Tanah</Typography> */}
          <ItemList type="wajib">Sertifikat tanah</ItemList>
          {/* <ItemList type="wajib">Letter C/D SKPT : Arsip Permohonan Hak, Akte Jual Beli Tanah</ItemList> */}
          {/* <ItemList type="wajib">Surat Keterangan Penguasaan Tanah dan Surat Keterangan Tidak Sengketa Dengan Pihak Lain, Yang di Terbitkan Lurah Setempat dan diketahui Camat (Tanah tanah negara)</ItemList> */}
          {/* <Typography variant="h6" className="!font-quicksand !m-0" mb={2}>Jika Bukan Pemilik Tanah</Typography> */}
          <ItemList type="tentatif">Surat Perjanjian/Kontrak (Bila bukan pemilik tanah)</ItemList>
          {/* <Typography variant="h6" className="!font-quicksand !m-0" mb={2}>Surat Lain yang dianggap perlu</Typography> */}
          {/* <ItemList type="tentatif">Rekom Ketinggian Bangunan dari Instansi Teknis Terkait (Apabila bangunan ketinggian lebih dari 4 lantai)</ItemList> */}
          {/* <ItemList type="tentatif">Persetujuan Prinsip Dari Walikota (Bagi yang dipersyaratkan)</ItemList> */}
        </div>
        <div className="hidden md:flex justify-center">
          {userData ?
            <Link to={'/permohonan/tambah'}>
              <GButton className="flex gap-1 items-center !text-lg !px-10"><Add className="!w-4" /> <span>Ajukan Permohonan KRK</span></GButton>
            </Link>
            : <>
              <ConfirmDialog show={confirm} title={'Silahkan Log in'} message={`Silahkan log in terlebih dahulu sebelum melakukan permohonan penerbitan dokumen KRK. Apabila belum memiliki akun, anda dapat membuat akun baru terlebih dahulu`} rejectLable='Sudah Punya Akun' acceptLable='Buat Akun Baru' onClose={() => {
                setConfirm(false);
                navigate('/');
              }} onSubmit={() => {
                navigate('/register');
                setConfirm(false);
              }} />
              <GButton color='primary' onClick={() => setConfirm(true)}>+ Ajukan Permohonan KRK</GButton>
            </>
          }
        </div>
      </div>
    </AuthLayout>
  )
}

export default PetunjukPermohonan
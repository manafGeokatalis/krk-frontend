import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import GButton from '../../../components/GButton';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProps {
  show: boolean;
  process?: boolean;
  onSubmit?: () => void;
  onClose: () => void;
}

const AggrementDialog: React.FC<DialogProps> = ({ show = false, process = false, onSubmit, onClose }) => {
  const [open, setOpen] = React.useState(show);

  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        scroll='body'
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => process ? false : handleClose()}
      >
        <DialogContent className='!bg-gdarkgray-800 !rounded-2xl'>
          <DialogTitle className='text-center !font-quicksand !text-3xl !p-7'>{"Syarat dan ketentuan"}</DialogTitle>
          <DialogContent className='!px-12 !pb-5 !text-white !flex !flex-col gap-5'>
            <Typography className='!font-heebo !font-light !text-sm !leading-relaxed'>Selamat datang di website KeRenKa, situs ini dikelola oleh Dinas Cipta Karya, Tata Ruang, Perumahan dan Kawasan Permukiman Kabupaten Manggarai Barat (selanjutnya disebut kami). Syarat dan Ketentuan berikut adalah ketentuan dalam pengunjungan situs, konten, layanan dan fitur yang ada di website KeRenKa. Kewajiban Anda setelah membaca Syarat dan Ketentuan ini dengan seksama, berarti Anda telah memahami dan menyetujui untuk terikat dan tunduk dengan semua peraturan yang berlaku di situs ini. Jika Anda tidak setuju untuk terikat dengan semua peraturan yang berlaku, silakan untuk tidak mengakses situs ini.</Typography>
            <Typography className='!font-heebo !font-light !text-sm !leading-relaxed'>PEMOHON YANG TERDAFTAR<br />Layanan pada situs ini, hanya disediakan untuk pemohon yang telah mendaftar dan pemohon harus mendaftar dengan memberikan data-data yang benar di lengkapi dengan e-mail untuk menggunakannya. Sebagai pemohon yang terdaftar, Anda diwajibkan untuk mengikuti segala peraturan pengunjungan layanan tersebut.</Typography>
            <div className='!font-heebo !font-light !text-sm !leading-relaxed'>
              KEWAJIBAN PENGUNJUNG<br />
              <ol className='list-decimal ml-3.5'>
                <li>Pengunjung website KeRenKa harus berumur 17 tahun ke atas dan harus tunduk pada hukum dan peraturan perundangan dalam wilayah Republik Indonesia.</li>
                <li>Dilarang menganjurkan atau menyarankan perbuatan yang melanggar hukum.</li>
                <li>Dilarang memuat kata-kata atau gambar-gambar yang kasar, kotor, jorok, dan sumpah serapah.</li>
                <li>Dilarang menyebarkan ideologi atau ajaran tertentu yang pada prinsipnya dilarang oleh hukum yang berlaku di wilayah Republik Indonesia.</li>
                <li>Dilarang menyebarkan berkas atau program yang mengandung virus atau kode komputer lainnya yang merusak, mengganggu, dan/atau membatasi fungsi dari perangkat lunak atau perangkat keras komputer dan/atau peralatan komunikasi, dan/atau memperbolehkan penggunaan komputer dan/atau jaringan komputer yang tidak sah.</li>
              </ol>
              Dalam penggunaan website KeRenKa.  Anda setuju untuk:<br />
              <ol className='list-decimal ml-3.5'>
                <li>Pemohon wajib memantau pemberitahuan yang diberikan oleh situs KeRenKa.</li>
                <li>Menjaga keamanan sandi (password) dan identifikasi Anda.</li>
                <li>Menjaga dan secara berkala memperbarui informasi tentang diri Anda dan informasi lainnya secara baru, benar dan valid.</li>
                <li>Anda tidak diperbolehkan menggunakan website KeRenKa dalam kondisi atau cara apapun yang dapat merusak, melumpuhkan, membebani dan/atau mengganggu server atau jaringan website KeRenKa. Anda juga tidak diperbolehkan untuk mengakses layanan, akun pengguna, sistem komputer atau jaringan secara tidak sah, dengan cara perentasan (hacking), password mining, dan/atau cara lainnya.</li>
                <li>Kami akan bekerja sama secara penuh dengan setiap pejabat penegak hukum atau perintah pengadilan yang meminta atau mengarahkan kami untuk mengungkapkan identitas dari siapapun yang memuati materi atau informasi seperti tersebut di atas.</li>
              </ol>
            </div>
            <Typography className='!font-heebo !font-light !text-sm !leading-relaxed'>PEMBLOKIRAN ATAU PENGHAPUSAN AKUN<br />
              Kami berhak untuk memblokir dan menghapus akun pemohon yang dalam pelanggaran langsung dalam syarat dan ketentuan kami, atau mereka yang mengalami gangguan, kekacauan atau yang mengindikasikan masalah pemohon di KeRenKa.</Typography>
            <Typography className='!font-heebo !font-light !text-sm !leading-relaxed'>KEBIJAKAN PRIVASI DATA PEMOHON<br />
              Kebijakan privasi data pemohon website KeRenKa mengungkapkan kebijakan penanganan data-data pribadi Anda pada saat Anda mengakses website KeRenKa. Penggunaan website ini secara rutin dan terus menerus menunjukkan persetujuan Anda pada kebijakan privasi data pemohon kami.</Typography>
          </DialogContent>
          <DialogActions className='!flex !justify-around !py-7'>
            <GButton disabled={process} color='secondary' onClick={handleClose}>Batal</GButton>
            <GButton disabled={process} color='error' onClick={onSubmit}>{process ? 'Memproses ...' : 'Saya setuju dengan ketentuan ini'}</GButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default AggrementDialog;
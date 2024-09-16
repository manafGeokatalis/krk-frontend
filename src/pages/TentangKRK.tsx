import { Typography } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";

type Props = {}

function TentangKRK({ }: Props) {
  return (
    <AuthLayout title='Tentang KRK'>
      <div className="flex justify-between gap-3 mt-12 pl-10 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Tentang KRK</Typography>
      </div>
      <div className="w-full mt-10 text-xl text-justify font-heebo p-10">
        <p>Menurut ketentuan yang tercantum dalam Pasal 14 ayat (3) Peraturan Pemerintah Nomor 36 Tahun 2005, Sertifikat Izin Rencana (KRK) diterbitkan oleh pemerintah daerah berdasarkan peta lokasi tempat bangunan gedung yang akan dibangun oleh pemiliknya. Dalam implementasinya, kewenangan untuk menerbitkan KRK seringkali didelegasikan oleh pemerintah daerah setempat kepada instansi terkait atau dinas yang memiliki tanggung jawab terkait.</p>
        <p className="mt-5">Merujuk pada Pasal 14 ayat (4) PP 36/2005, KRK berisi:</p>
        <ol className="list-decimal ml-12">
          <li>fungsi bangunan gedung yang dapat anda bangun pada lokasi bersangkutan;</li>
          <li>ketinggian maksimum bangunan gedung;</li>
          <li>jumlah lantai/lapis bangunan gedung di bawah permukaan tanah dan KTB;</li>
          <li>garis sempadan dan jarak bebas minimum bangunan gedung;</li>
          <li>KDB maksimum;</li>
          <li>KLB maksimum;</li>
          <li>KDH minimum;</li>
          <li>KTB maksimum; dan</li>
          <li>jaringan utilitas kota.</li>
        </ol>
        <p className="mt-5">KRK memiliki manfaat dan fungsi utama sebagai berikut :</p>
        <ol className="list-decimal ml-12">
          <li>Untuk mengetahui rencana kota pada lokasi yang pemilik tanah mohonkan (peruntukan, GSB, GSJ, KDB, KLB, Ketinggian Bangunan, dan kepentingan lainnya).</li>
          <li>Sebagai kelengkapan persyaratan PBG.</li>
          <li>Sebagai kelengkapat pernyataan mandiri untuk kegiatan usaha (OSS).</li>
        </ol>
      </div>
    </AuthLayout>
  )
}

export default TentangKRK
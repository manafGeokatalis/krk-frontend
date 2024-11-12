import { Button, InputLabel, Typography, styled } from "@mui/material"
import { useState } from "react"

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormInput = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <InputLabel className='!font-quicksand !font-semibold !text-white !break-words !whitespace-normal'>{props.inputlabel}</InputLabel>
      <div className={"flex items-center border border-white rounded overflow-hidden " + (props.namefile ? "bg-white text-gblue-500" : null)}>
        <div className="px-3 w-full">{props.namefile}</div>
        <Button color="secondary" component="label" variant="contained" className="!rounded-none !bg-gray-100 !font-quicksand !capitalize !w-56 !text-base">
          Browse
          <VisuallyHiddenInput {...props} />
        </Button>
      </div>
    </div>
  )
}

type Props = {
  data?: any;
  handleUpdateForm: (key: string, value: any) => void;
}

function Step3({ handleUpdateForm, data }: Props) {

  const [form, setForm] = useState<any>({
    ktp: data?.ktp ?? null,
    pbb: data?.pbb ?? null,
    surat_kuasa_mengurus: data?.surat_kuasa_mengurus ?? null,
    sertifikat_tanah: data?.sertifikat_tanah ?? null,
    surat_perjanjian: data?.surat_perjanjian ?? null,
  });
  const [fileName, setFileName] = useState<any>({
    ktp: data?.ktp?.name ?? '',
    pbb: data?.pbb?.name ?? '',
    surat_kuasa_mengurus: data?.pbb?.surat_kuasa_mengurus ?? '',
    sertifikat_tanah: data?.pbb?.sertifikat_tanah ?? '',
    surat_perjanjian: data?.pbb?.surat_perjanjian ?? '',
  });

  // useEffect(() => {
  //   if (data?.id) {
  //     for (const key of Object.keys(fileName)) {
  //       if (data[key]) {
  //         fileName[key] = 'Klik Browse untuk mengganti file';
  //         form[key] = 'null';
  //       }
  //     }
  //     setForm({ ...form });
  //     setFileName({ ...fileName });
  //   }
  // }, [data?.id]);
  // useEffect(() => {
  //   console.log('a')
  //   onChange(form);
  // }, [form]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.files ? e.target.files[0] : null });
    setFileName({ ...fileName, [e.target.name]: e.target.files ? e.target.files[0].name : '' });
    handleUpdateForm(e.target.name, e.target.files ? e.target.files[0] : null)
  }

  return (
    <>
      <Typography variant='h4' mb={3} className='!font-quicksand !font-semibold'>Syarat Dokumen</Typography>
      <FormInput inputlabel='Scan KTP/Passport/Kitas Pemohon' type='file' name='ktp' namefile={fileName.ktp} onChange={handleInput} accept=".pdf" required />
      <FormInput inputlabel='Scan Dokumen Lunas Pembayaran PBB Tahun Terakhir Asli' type='file' name='pbb' namefile={fileName.pbb} onChange={handleInput} accept=".pdf" required />
      <FormInput inputlabel='Scan Surat Kuasa Mengurus KRK (Jika ada)' type='file' name='surat_kuasa_mengurus' namefile={fileName.surat_kuasa_mengurus} onChange={handleInput} accept=".pdf" required />
      {/* <Typography variant='h6' className='!font-quicksand'>Jika Pemilik Tanah :</Typography> */}
      <FormInput inputlabel='Scan Sertipikat Tanah (SHM / HGB / HGU / SHSRS / Lainnya)' type='file' name='sertifikat_tanah' namefile={fileName.sertifikat_tanah} onChange={handleInput} accept=".pdf" required />
      {/* <FormInput inputlabel='Letter C/D SKPT : Arsip Permohonan Hak, Akte Jual Beli Tanah' type='file' name='skpt' namefile={fileName.skpt} onChange={handleInput} accept=".pdf" required /> */}
      {/* <FormInput inputlabel='Surat Keterangan Penguasaan Tanah dan Surat Keterangan Tidak Sengketa Dengan Pihak Lain, Yang di Terbitkan Lurah Setempat dan diketahui Camat (Tanah tanah negara)' type='file' name='suket_tidak_sengketa' namefile={fileName.suket_tidak_sengketa} onChange={handleInput} accept=".pdf" required /> */}
      {/* <Typography variant='h6' className='!font-quicksand'>Jika Bukan Pemilik Tanah :</Typography> */}
      <FormInput inputlabel='Surat Perjanjian/Kontrak (Bila bukan pemilik tanah)' type='file' name='surat_perjanjian' namefile={fileName.surat_perjanjian} onChange={handleInput} accept=".pdf" required />
      {/* <Typography variant='h6' className='!font-quicksand'>Surat Lain jika ada :</Typography> */}
      {/* <FormInput inputlabel='Rekom Ketinggian Bangunan dari Instansi Teknis Terkait (Apabila bangunan ketinggian lebih dari 4 lantai)' type='file' name='rekom_ketinggian_bangunan' namefile={fileName.rekom_ketinggian_bangunan} onChange={handleInput} accept=".pdf" required /> */}
      {/* <FormInput inputlabel='Persetujuan Prinsip Dari Walikota (Bagi yang dipersyaratkan)' type='file' name='persetujuan_walikota' namefile={fileName.persetujuan_walikota} onChange={handleInput} accept=".pdf" required /> */}
    </>
  )
}

export default Step3
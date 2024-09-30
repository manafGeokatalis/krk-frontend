import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import AuthLayout from "../../../layouts/AuthLayout"
import { Button, Typography } from "@mui/material";
import Step1 from './steps/Step1';
import GButton from '../../../components/GButton';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import axios from 'axios';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { useRecoilState } from 'recoil';
import { notification } from '../../../utils/Recoils';
import { createNotifcation } from '../../../utils/Helpers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';

type Props = {}
const errorMessage = [
  {
    name: 'Harus diisi',
    email: 'Harus diisi',
    wa: 'Harus diisi',
    provinsi_id: 'Harus dipilih',
    kabupaten_id: 'Harus dipilih',
    kecamatan_id: 'Harus dipilih',
    desa_id: 'Harus dipilih',
    lokasi_provinsi_id: 'Harus dipilih',
    lokasi_kabupaten_id: 'Harus dipilih',
    lokasi_kecamatan_id: 'Harus dipilih',
    lokasi_desa_id: 'Harus dipilih',
  },
  {
    npwp: 'Harus diisi',
    coordinate: 'Harus dipilih',
    luas_tanah: 'Harus diisi',
    fungsi_bangunan: 'Harus diisi',
  },
  {
    ktp: 'Harus diisi',
    pbb: 'Harus diisi',
    sertifikat_tanah: 'Harus diisi',
    skpt: 'Harus diisi',
    surat_kuasa_mengurus: 'Harus diisi',
    suket_tidak_sengketa: 'Harus diisi',
  }
];

interface DialogFeedbackProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
function DialogFeedback({ show, onClose }: DialogFeedbackProps) {
  const [open, setOpen] = useState(show)
  const [rating, setRating] = useState<number | null>(0)
  const [feedback, setFeedback] = useState('')
  const [userAlreadyFeedback, setUserAlreadyFeedback] = useState(false)
  const [_n, setN] = useRecoilState(notification);

  async function checkUserAlreadyFeedback() {
    const res: any = await axios.get('/feedback/check');
    if (res?.data?.data) {
      setUserAlreadyFeedback(true)
    }

  }

  async function submitFeedback() {
    const res: any = await axios.post('/feedback', {
      "feedback": feedback,
      "rating": rating
    });
    if (res?.data?.data) {
      onClose()
      setN(createNotifcation('Feedback berhasil di submit'));
    }
  }

  useEffect(() => {
    setOpen(show)
    checkUserAlreadyFeedback()
  }, [show])

  function submitButton() {
    submitFeedback()
    // 

    // console.log(rating)
    // console.log(feedback)

  }

  return (
    <>
      <Dialog open={open} maxWidth={'md'} fullWidth={true}>
        <DialogContent className='!bg-black w-full flex justify-center flex-col items-center'>
          <DialogTitle className='w-full flex justify-center !text-[30px]'>Ulas Pelayanan Web KRK</DialogTitle>
          <div>Silahkan beri rating layanan kami</div>
          <div className='font-semibold mt-4 mb-4'>Beri Rating</div>
          <div >
            <Rating name="size-large" defaultValue={0} value={rating} size="large" onChange={(event, newValue) => { setRating(newValue) }} />
          </div>
          <div className='p-6 w-full'>
            <div className='w-full flex items-left'>
              Ulas pengalaman permohonan KRK :
            </div>
            <div className='w-full mt-2'>
              <TextareaAutosize value={feedback} onChange={e => setFeedback(e.target.value)} className='bg-black w-full text-white p-3 border border-white' maxRows={4} minRows={4} />
            </div>
          </div>
          <DialogActions className='gap-8 flex flex-row'>
            {userAlreadyFeedback ? (<GButton variant='contained' color='secondary' onClick={onClose}>
              Tutup
            </GButton>) : (<></>)}
            <GButton variant='contained' color='success' disabled={rating == 0 && feedback.length == 0} onClick={submitButton}>
              Submit
            </GButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

function Form({ }: Props) {
  const params = useParams();
  const [data, setData] = useState<any>();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<any>({
    form: {},
    lokasi: ''
  });
  const [errors, setErrors] = useState(true);
  const [confirm, setConfirm] = useState({
    show: false,
    title: 'Apakah Anda Yakin?',
    message: 'Apakah anda yakin bahwa dokumen telah lengkap dan siap diajukan?',
  })
  const [_n, setN] = useRecoilState(notification);
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const [openDialogFeedback, setOpenDialogFeedback] = useState(true)

  useEffect(() => {
    if (params?.uuid) {
      getData();
    }
  }, [])

  useEffect(() => {
    setErrors(false);
    for (const key of Object.keys(errorMessage[step - 1])) {
      if (!form.form[key]) {
        setErrors(true);
      }
    }
  }, [form]);

  const getData = async () => {
    try {
      const query: any = await axios.get(`/permohonan/${params.uuid}`);
      const datas = query?.data?.data;
      setForm({ ...form, form: datas });
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }

  const handleStep = () => {
    setStep(step + 1);
  }

  const handleSubmit = async () => {
    const formData = new FormData;
    for (const key of Object.keys(form.form)) {
      formData.append(key, form.form[key]);
    }

    try {
      const res: any = form?.form?.id ? await axios.put(`/permohonan/${form?.form?.uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }) : await axios.post('/permohonan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setData(res?.data?.data);
      setN(createNotifcation('Pengajuan berhasil dikirim'));
      setConfirm({ ...confirm, show: false });
    } catch (error: any) {
      setConfirm({ ...confirm, show: false });
      setN(createNotifcation('Pengajuan gagal dikirim: ' + (error.response.data?.message ?? error.message), 'error'));
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.registration_number);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  if (data) {
    return (
      <AuthLayout title={params?.uuid ? `Ubah Permohonan` : `Permohonan Baru`}>
        <DialogFeedback show={openDialogFeedback} onClose={() => setOpenDialogFeedback(!openDialogFeedback)} onSubmit={() => console.log('a')
        } />
        <div className="flex justify-between gap-3 mt-12 items-center">
          <Typography variant="h4" className="!font-quicksand !font-semibold">Permohonan KRK</Typography>
        </div>
        <Typography variant="h5" mt={5} mb={3} className='!font-quicksand !font-semibold'>Kode Registrasi</Typography>
        <div className="flex flex-col gap-4 p-8 rounded-2xl shadow bg-gdarkgray-500 max-w-4xl">
          <Typography variant='h4' mb={1} className='!font-quicksand !font-semibold'>Proses Pengajuan Selesai</Typography>
          <div className="flex flex-col gap-5 w-full">
            <Typography mb={1} className='!font-quicksand !font-semibold'>Proses Pengajuan KRK Berusaha anda telah selesai dengan Kode Registrasi  berikut:</Typography>
            <div className="flex items-center border border-white rounded overflow-hidden max-w-fit">
              <div className="px-10">{data.registration_number}</div>
              <Button onClick={copyToClipboard} color="secondary" component="label" variant="contained" className="!rounded-none !bg-gray-100 !font-quicksand !capitalize !w-36 !text-base">
                {isCopied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <Typography mb={1} className='!font-quicksand !font-semibold'>Silahkan pantau terus proses penerbitan dokumen KRK yang anda ajukan langsung dari aplikasi</Typography>
            <div className="flex justify-center">
              <Link to={`/permohonan/${data?.uuid}?`}>
                <GButton color='success'>Selesai</GButton>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title={params?.uuid ? `Ubah Permohonan` : `Permohonan Baru`}>
      <ConfirmDialog show={confirm.show} title={confirm.title} message={`<center>${confirm.message}</center>`} acceptLable='Ajukan KRK' rejectLable='Cek Kembali' onClose={() => setConfirm({ ...confirm, show: false })} onSubmit={handleSubmit} />
      <div className="flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Permohonan KRK (Keterangan Rencana Kabupaten)</Typography>
      </div>
      <Typography variant="h5" mt={5} mb={3} className='!font-quicksand !font-semibold'>Tahap {step} dari 3</Typography>
      <div className="flex flex-col gap-4 p-8 rounded-2xl shadow bg-gdarkgray-500 max-w-4xl">
        {step == 1 ? <Step1 data={form.form} onChange={data => setForm({ ...form, ...data })} />
          : step == 2 ? <Step2 data={form} onChange={data => setForm({ ...form, form: { ...form.form, ...data } })} />
            : <Step3 data={form.form} onChange={data => setForm({ ...form, form: { ...form.form, ...data } })} />}
        <div className="flex mt-5 justify-center">
          <div className="flex justify-between gap-5 w-full max-w-3xl">
            <GButton color='secondary' onClick={_ => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                navigate(-1);
              }
            }}>Kembali</GButton>
            <GButton color={step < 3 ? 'primary' : 'error'} onClick={_ => {
              if (step < 3) {
                handleStep();
              } else {
                setConfirm({ ...confirm, show: true });
              }
            }} disabled={errors}>{step < 3 ? 'Selanjutnya' : 'Kirim Pengajuan'}</GButton>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Form
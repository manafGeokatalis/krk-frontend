import { CircularProgress, Typography } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import { useEffect, useState } from "react";
import { Done, Download, WarningRounded } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { notification } from "../../utils/Recoils";
import { createNotifcation, downloadFile, formatDate, getExtension } from "../../utils/Helpers";
import axios from "axios";
import GButton from "../../components/GButton";
import ConfirmDialog from "../../components/ConfirmDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextareaAutosize from '@mui/material/TextareaAutosize';




type Props = {
  title?: string;
}



function StatusPermohonan({ title = 'Status Permohonan' }: Props) {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [_n, setN] = useRecoilState<any>(notification);
  const navigate = useNavigate();
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [openDialogFeedback, setOpenDialogFeedback] = useState(false)
  const [userAlreadyFeedback, setUserAlreadyFeedback] = useState(false)
  const [activeEvent, setActiveEvent] = useState()

  const [confirm, setConfirm] = useState<any>({
    show: false,
    title: 'Apakah Anda Yakin?',
    message: '<center>Apakah anda yakin akan membatalkan permohonan KRK ini?</center>'
  });
  const [notif, setNotif] = useState<any>({
    show: false,
    title: 'Permohonan KRK telah dibatalkan',
    message: '<center>Permohonan telah dibatalkan</center>'
  });
  const [status, setStatus] = useState<any>([
    { title: '0. Permohonan telah diajukan', date: null, checked: false },
    { title: '1. Verifikasi dokumen persyaratan', date: null, checked: false },
    { title: '2. Verifikasi kesesuaian lokasi izin dengan peraturan yang berlaku', date: null, checked: false },
    { title: '3. Persiapan Proses Pengukuran dan Cek Lapangan oleh Petugas', date: null, checked: false },
    { title: '4. Selesai Pengukuran dan Cek Lapangan', date: null, checked: false },
    { title: '5. Selesai Verifikasi Hasil Pengukuran dan Cek Lapangan', date: null, checked: false },
    { title: '6. Nomor Agenda Telah Terbit, Persiapan Pengecekan Mandiri', date: null, checked: false },
    { title: '7. Selesai Pengecekan Mandiri', date: null, checked: false },
    { title: '8. Verifikasi hasil Pengecekan Mandiri', date: null, checked: false },
    { title: '9. Dokumen KRK telah terbit', date: null, checked: false },
  ])

  function handleDownload(params: any) {
    downloadFile(`/download/${params.file}`, {
      filename: `KerenkaMaBar[${data.registration_number}].${getExtension(params.file)}`,
      onProgress(progress) {
        setDownloadProgress(progress);
        if (progress == 100) {
          setTimeout(() => {
            setDownloadProgress(0);
          }, 1000);
        }
      },
    })
  }

  async function checkUserAlreadyFeedback() {
    const res: any = await axios.get('/feedback/check');
    if (res?.data?.data) {
      setUserAlreadyFeedback(true)
    }

  }

  useEffect(() => {
    checkUserAlreadyFeedback()

  }, [])

  const TimeLine = ({ events }: { events: Array<any> }) => {
    return (
      <div className="relative">
        <DialogFeedback show={openDialogFeedback} onClose={() => setOpenDialogFeedback(!openDialogFeedback)} onSubmit={() => handleDownload(activeEvent)} alreadyFeedback={userAlreadyFeedback} />
        <div className="absolute left-[0.6rem] top-3 bottom-14 transform -translate-x-1/2 border-l-4 border-white"></div>
        {events.map((event: any, index) => (
          <div key={index} className="flex items-center mb-7 relative font-quicksand">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-white z-10 font-bold">
              {event.checked &&
                <Done color="primary" className="!w-3 !h-3 !stroke-[5] !stroke-gblue-500" />
              }
            </div>
            <div className={"ml-4 w-full rounded-lg px-3 py-2 flex flex-col md:justify-between " + (event.checked ? 'bg-white text-gblue-500' : 'text-white bg-gdarkgray-500')}>
              <p className="">{event.title}</p>
              <div className=" flex flex-col gap-1 md:justify-end md:text-right">
                <p className="text-[10px] md:text-[12px]">{event.date ? `Diproses tanggal ${formatDate(event.date, 'DD MM YYYY', 'long')}` : null}</p>
                {(status.filter((obj: any) => obj.checked === true).length === 10 && index === 9) &&
                  <div className="flex gap-1 w-full justify-end items-center">
                    {event?.file !== null &&
                      <>
                        {downloadProgress > 0 &&
                          <CircularProgress size={25} variant="determinate" value={downloadProgress} />
                        }
                        <GButton color="success" className="!flex !gap-2 md:w-auto w-full" onClick={() => { setActiveEvent(event); setOpenDialogFeedback(true) }} disabled={downloadProgress > 0}>
                          <Download /> Download
                        </GButton>
                      </>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const query: any = await axios.get(`/permohonan/${params.uuid}`);
      const datas = query?.data?.data;
      setData(datas);
      status.forEach((v: any, i: number) => {
        v.date = null;
        v.checked = false;
        v.file = null;
        if (i == 0) {
          v.date = datas?.createdAt;
          v.checked = true;
          status[i] = v;
          setStatus([...status]);
        } else {
          datas.permohonan_progresses.forEach((vv: any) => {
            if (i == vv.step) {
              v.date = vv?.processed_on;
              v.checked = true;
              v.file = vv.file;
              status[i] = v;
              setStatus([...status]);
            }
          })
        }
      });
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }

  const tarikPermohonan = async () => {
    try {
      await axios.delete(`permohonan/${params.uuid}/destroy`);
      setConfirm({ ...confirm, show: false });
      setNotif({ ...notif, show: true });
    } catch (error: any) {
      setConfirm({ ...confirm, show: false });
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }

  return (
    <AuthLayout title={title}>
      <div className="flex justify-between gap-3 mt-6 md:mt-12 pl-4 md:pl-10 items-center">
        <Typography variant="h4" className="hidden md:flex !font-quicksand !font-semibold">{title}</Typography>
        <Typography variant="h5" className="flex md:hidden !font-quicksand !font-semibold">{title}</Typography>

      </div>
      <div className="flex flex-col md:text-xl text-[12px] gap-5 mt-4 px-4 mt-6 md:mt-4 md:p-10">
        <div>
          <table className="!font-light">
            <tbody>
              <tr>
                <td className="py-1 pr-10">Kode Registrasi</td>
                <td className="w-0">:</td>
                <td className="pl-1">{data?.registration_number ?? '-'}</td>
              </tr>
              <tr>
                <td className="py-1 pr-10">Tanggal Permohonan</td>
                <td className="w-0">:</td>
                <td className="pl-1">{data?.createdAt ? formatDate(data.createdAt, 'DD MM YYYY', 'long') : '-'}</td>
              </tr>
              <tr>
                <td className="py-1 pr-10">Staf Admin Penerima </td>
                <td className="w-0">:</td>
                <td className="pl-1">{data?.staff?.name ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" flex flex-col gap-5">
          {data?.permohonan_progresses?.length == 1 ?
            <>
              <ConfirmDialog show={confirm.show} title={confirm.title} message={confirm.message} onClose={() => setConfirm({ ...confirm, show: false })} onSubmit={tarikPermohonan} acceptLable="Tarik Permohonan" color="error" />
              <ConfirmDialog show={notif.show} title={notif.title} message={notif.message} onClose={() => { navigate('/permohonan') }} onSubmit={() => false} acceptLable="" rejectLable="Oke" />
              <div className="w-full rounded-md bg-gblue-300 text-gdarkgray-500 p-9 -mt-10 flex gap-7 items-center font-quicksand">
                <Done className="!w-16 !h-16 !stroke-[3] !stroke-gdarkgray-500" />
                <div className="flex flex-col gap-1 w-full">
                  <Typography variant="h5">Permohonan KRK telah dikirim</Typography>
                  <Typography className="!font-light !font-heebo">Anda dapat mengubah atau membatalkan permohonan KRK ini sebelum diproses ke tahap verifikasi oleh admin </Typography>
                  <div className="flex justify-between mt-2">
                    <GButton color="error" onClick={() => setConfirm({ ...confirm, show: true })}>Tarik Permohonan</GButton>
                    <Link to={`/permohonan/${data?.uuid}/edit`}>
                      <GButton color="secondary">Edit Permohonan</GButton>
                    </Link>
                  </div>
                </div>
              </div>
            </>
            : data?.permohonan_progresses?.filter((obj: any) => obj.step === 11).length > 0 &&
            <div className="w-full rounded-md bg-gyellow-500 text-gdarkgray-500 p-6 md:p-9 flex gap-7 items-center font-quicksand mb-3 flex-col md:flex-row">
              <WarningRounded className="!w-20 !h-20" />
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between justify-center">
                  <Typography variant="h5" className="hidden md:flex !font-quicksand !font-semibold">Permohonan dokumen KRK ini terhenti/ditolak</Typography>
                  <Typography variant="h6" className="flex md:hidden !font-quicksand !font-semibold">Permohonan dokumen KRK ini terhenti/ditolak</Typography>

                  <span className="text-center md:text-right font-heebo font-light">Diupdate  tanggal {data.permohonan_progresses.filter((obj: any) => obj.step === 11)[0]?.processed_on ? formatDate(data.permohonan_progresses.filter((obj: any) => obj.step === 11)[0]?.processed_on, 'DD MM YYYY', 'long') : null}</span>
                </div>
                <div className="mt-6 md:mt-0">
                  <Typography variant="h6" className="hidden md:flex !font-quicksand !font-semibold">Alasan Perhentian/Penolakan :</Typography>
                  <div className="text-lg font-semibold flex md:hidden">Alasan Perhentian/Penolakan :</div>
                  <Typography className="!font-light !font-heebo">{data?.permohonan_progresses.filter((obj: any) => obj.step === 11)[0]?.desc ?? '-'}</Typography>
                </div>
              </div>
            </div>
          }
          <TimeLine events={status} />
        </div>
      </div>
    </AuthLayout>
  )
}

interface DialogFeedbackProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  alreadyFeedback: boolean
}
function DialogFeedback({ show, onClose, onSubmit, alreadyFeedback }: DialogFeedbackProps) {
  const [open, setOpen] = useState(show)
  const [rating, setRating] = useState<number | null>(0)
  const [feedback, setFeedback] = useState('')
  const [_n, setN] = useRecoilState(notification);
  const [isAlreadyFeedback, setIsAlreadyFeedback] = useState(false)


  async function submitFeedback() {
    if (isAlreadyFeedback) {
      onSubmit()
      onClose()
    } else {
      const res: any = await axios.post('/feedback', {
        "feedback": feedback,
        "rating": rating
      });
      if (res?.data?.data) {
        onSubmit()

        onClose()
        setN(createNotifcation('Feedback berhasil di submit'));
      }
    }
  }

  useEffect(() => {
    setOpen(show)
    setIsAlreadyFeedback(alreadyFeedback)
  }, [show, alreadyFeedback])

  function submitButton() {
    submitFeedback()
    // 

    // console.log(rating)
    // console.log(feedback)

  }

  console.log(isAlreadyFeedback)

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth={true}>
        <DialogContent className='!bg-black w-full flex justify-center flex-col items-center'>
          <DialogTitle className='w-full flex justify-center text-center md:!text-[30px]'>Ulas Pelayanan Web KRK</DialogTitle>
          <div className="text-center text-sm md:text-md">Anda harus  beri rating dan ulasan terhadap layanan kami sebelum dapat<br /> mendownload dokumen KRK</div>
          <div className='font-semibold mt-4 mb-4'>Beri Rating</div>
          <div >
            <Rating name="size-large" defaultValue={0} value={rating} size="large" onChange={(_, newValue) => { setRating(newValue) }} />
          </div>
          <div className='p-6 w-full'>
            <div className='w-full flex items-left text-sm md:text-md'>
              Ulas pengalaman permohonan KRK :
            </div>
            <div className='w-full mt-2'>
              <TextareaAutosize value={feedback} onChange={e => setFeedback(e.target.value)} className='bg-black w-full text-white p-3 border border-white' maxRows={4} minRows={4} />
            </div>
          </div>
          <DialogActions className='gap-8 flex flex-row'>
            <GButton className="text-xs md:text-md" variant='contained' color='error' disabled={isAlreadyFeedback ? false : rating == 0 && feedback.length == 0} onClick={submitButton}>
              <Download /> Download document KRK
            </GButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default StatusPermohonan
import { CircularProgress, TextField, Typography } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import { useEffect, useRef, useState } from "react";
import { Done, Download, Upload, WarningRounded } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { notification } from "../../utils/Recoils";
import { createNotifcation, downloadFile, formatDate, getExtension } from "../../utils/Helpers";
import axios from "axios";
import GButton from "../../components/GButton";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import ConfirmDialogSendEmail from "./components/ConfirmDialogSendEmail";
type Props = {
  title?: string;
}

function StatusPermohonan({ title = 'Status Permohonan' }: Props) {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [_n, setN] = useRecoilState<any>(notification);
  const [file, setFile] = useState<any>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [fileReady, setFileReady] = useState(true);
  const [fileName, setFileName] = useState('');
  const fileField = useRef<any>(null);
  const [reject, setReject] = useState('');
  const [rejected, setRejected] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [status, setStatus] = useState<any>([
    { title: 'Permohonan telah diajukan', date: null, checked: false, file: null },
    { title: 'Proses Verifikasi dokumen persyaratan', date: null, checked: false, file: null },
    { title: 'Selesai Verifikasi dokumen', date: null, checked: false, file: null },
    { title: 'Persiapan Proses Pengukuran dan Cek Lapangan oleh Petugas', date: null, checked: false, file: null },
    { title: 'Selesai Pengukuran dan Cek Lapangan', date: null, checked: false, file: null },
    // { title: '5. Selesai Verifikasi Hasil Pengukuran dan Cek Lapangan', date: null, checked: false, file: null },
    // { title: '6. Nomor Agenda Telah Terbit, Persiapan Pengecekan Mandiri', date: null, checked: false, file: null },
    // { title: '7. Selesai Pengecekan Mandiri', date: null, checked: false, file: null },
    // { title: '8. Verifikasi hasil Pengecekan Mandiri', date: null, checked: false, file: null },
    { title: 'Dokumen KRK telah terbit', date: null, checked: false, file: null },
  ])
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [confirmSendEmail, setConfirmSendEmail] = useState(false)
  const navigate = useNavigate();


  const TimeLine = ({ events }: { events: Array<any> }) => {
    return (
      <div className="relative">
        <div className="absolute left-[0.6rem] top-3 bottom-14 transform -translate-x-1/2 border-l-4 border-white"></div>
        {events.map((event, index) => (
          <div key={index} className={"flex items-center mb-7 relative font-quicksand " + (rejected ? 'cursor-not-allowed' : 'cursor-pointer')} onClick={() => !rejected ? handleClick(index) : false}>
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-white z-10 font-bold">
              {event.checked &&
                <Done color="primary" className="!w-3 !h-3 !stroke-[5] !stroke-gblue-500" />
              }
            </div>
            <div className={"ml-4 w-full rounded-lg px-3 py-2 flex flex-col md:justify-between " + (event.checked ? 'bg-white text-gblue-500' : 'text-white bg-gdarkgray-500')}>
              <p className="order-2 md:order-1">{event.title}</p>
              <div className="order-1 md:order-2 flex flex-col gap-1 md:justify-end md:text-right">
                <p className="text-[10px] md:text-[12px]">{event.date ? `Diproses tanggal ${formatDate(event.date, 'DD MM YYYY', 'long')}` : null}</p>
                {/* {(status.filter((obj: any) => obj.checked === true).length === 10 && index === 9) && */}
                {(status.filter((obj: any) => obj.checked === true).length === 6 && index === 5) &&

                  <div className="flex gap-1 justify-end items-center">
                    {fileName !== '' &&
                      <p className="font-semibold max-w-xs text-ellipsis overflow-hidden whitespace-nowrap">{fileName}</p>
                    }
                    {event?.file === null ?
                      <GButton color="success" className="!flex !gap-2" onClick={() => {
                        if (fileField.current) {
                          fileField.current.click();
                        } else {
                          return false;
                        }
                      }}>
                        <Upload /> Upload
                      </GButton>
                      : <>
                        {downloadProgress > 0 &&
                          <CircularProgress size={25} variant="determinate" value={downloadProgress} />
                        }
                        <GButton color="success" className="!flex !gap-2" onClick={() => {
                          if (fileField.current) {
                            fileField.current.click();
                          } else {
                            return false;
                          }
                        }}>
                          <Upload /> Ganti File
                        </GButton>
                        <GButton color="error" className="!flex !gap-2" onClick={() => downloadFile(`/download/${event.file}`, {
                          filename: `KerenkaMaBar[${data.registration_number}].${getExtension(event.file)}`,
                          onProgress(progress) {
                            setDownloadProgress(progress);
                            if (progress == 100) {
                              setTimeout(() => {
                                setDownloadProgress(0);
                              }, 1000);
                            }
                          },
                        })} disabled={downloadProgress > 0}>
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

  const handleClick = (index: number) => {
    for (let i = 0; i <= index; i++) {
      status[i].checked = true;
    }
    if (index < status.length - 1) {
      for (let i = index + 1; i < status.length; i++) {
        status[i].checked = false;
      }
    }
    if (index == status.length - 1 && status.filter((obj: any, key: number) => obj.file !== null && key === 5).length === 0) {
      setFileReady(false);
    } else {
      setFileReady(true);
    }
    setStatus([...status]);
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
      if (datas?.permohonan_progresses.filter((obj: any) => obj.step === 11).length > 0) {
        setRejected(true);
      }
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
    }
  }

  const uploadFile = async () => {
    const formData = new FormData;
    formData.append('file', file);
    setIsSubmit(true);
    try {
      await axios.put(`/permohonan/${params.uuid}/update-status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsSubmit(false);
      setFile(null);
      setFileName('');
      getData();
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setIsSubmit(false);
    }
  }

  const sendEmailCheckLapangan = async (uuid: any) => {
    await axios.get(`/permohonan/send-cek-lapangan/${uuid}`);
    setN(createNotifcation('Email pemberitahuan telah dikirimkan ke pemohoan'));

  }

  const updateStatus = async () => {
    setIsSubmit(true);
    try {
      const res: any = await axios.post(`/permohonan/${params.uuid}/update-status`, status.filter((obj: any) => obj.checked === true));
      if (file) {
        await uploadFile();
      }

      const dataStatus = status.filter((obj: any) => obj.checked === true)
      const titleCheckLapangan = 'Persiapan Proses Pengukuran dan Cek Lapangan oleh Petugas'
      const isCheckLapangan = dataStatus[dataStatus.length - 1].title == titleCheckLapangan
      //check lapangan send email
      if (isCheckLapangan) {
        setConfirmSendEmail(true)
      }



      getData();
      setN(createNotifcation(res?.data?.message));
      setIsSubmit(false);
      setReject('');
      setRejected(false);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setIsSubmit(false);
    }
  }

  const sendReject = async () => {
    setIsSubmit(true);
    try {
      const res: any = await axios.put(`/permohonan/${params.uuid}/reject`, { message: reject });
      getData();
      setN(createNotifcation(res?.data?.message));
      setIsSubmit(false);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setIsSubmit(false);
    }
  }

  const handleToRejectPage = async () => {

  }



  return (
    <AuthLayout title={title}>
      <ConfirmDialog show={confirmDialog} title={'Konfirmasi Update Permohonan'} message={`Apakah anda yakin mengupdate permohonan ini?`} rejectLable='Batal' acceptLable='Update Permohonan' onClose={() => {
        setConfirmDialog(false);
      }} onSubmit={() => {
        updateStatus()
        setConfirmDialog(false);
      }} />
      <ConfirmDialogSendEmail
        show={confirmSendEmail}
        rejectLable='Tutup' acceptLable='Kirim email' onClose={() => {
          setConfirmSendEmail(false);
        }} onSubmit={() => {
          sendEmailCheckLapangan(params.uuid)
          setConfirmSendEmail(false);
        }}
      />
      <input ref={fileField} type="file" onChange={(e) => {
        if (e.target.files && e.target.files[0]?.name) {
          setFile(e.target.files[0])
          setFileName(e.target.files[0].name);
          setFileReady(true);
        } else {
          setFile(null);
          setFileName('');
          if (status.filter((obj: any, key: number) => obj.file !== null && key === 9).length === 0) {
            setFileReady(false);
          } else {
            setFileReady(true);
          }
        }
      }} className="hidden" accept=".pdf" />
      <div className="flex md:items-left md:justify-left justify-center gap-3 mt-12 items-center">
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
        <div className="flex flex-col gap-3">
          {rejected &&
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
          {!rejected ? (<TimeLine events={status} />) : (<></>)}


          {/* ACTION SECTION DESKTOP */}
          <div className="hidden md:flex md:flex-col">
            <div className="flex justify-end">
              <GButton color="success" onClick={() => setConfirmDialog(true)} disabled={isSubmit || !fileReady || rejected}>Simpan</GButton>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Typography className="!font-quicksand" fontSize={25}>Penolakan permohonan</Typography>
                <Typography className="!font-heebo !font-light">Apabila proses penerbitan KRK tidak dapat dilanjutkan karena alasan tertentu. Maka dilakukan penolakan permohonan.</Typography>
              </div>
              <div className="flex flex-col gap-2">
                {!rejected ?
                  <>
                    <Typography className="!font-quicksand !font-semibold" fontSize={19}>Alasan Penolakan KRK (Wajib diisi):</Typography>
                    <TextField type="text" multiline rows={4} sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }} value={reject} onChange={e => setReject(e.target.value)} disabled={status.filter((obj: any, key: number) => obj.file !== null && key === 9).length > 0} />
                    <div className="flex justify-center mt-2">
                      <GButton color="error" type="submit" disabled={reject == '' || isSubmit} onClick={sendReject}>Tolak Pengajuan KRK</GButton>
                    </div>
                  </>
                  : <div className="flex justify-center mt-3">
                    <GButton color="success" onClick={updateStatus}>Lanjutkan Permohonan KRK</GButton>
                  </div>
                }
              </div>
            </div>
          </div>

          {/* ACTION SECTION MOBILE */}
          <div className="flex md:hidden">
            {!rejected ? (<div className="flex flex-col w-full gap-4">
              <Link to={`/permohonan/ditolak/${params.uuid}`}>
                <GButton className="w-full" color="error" type="submit" onClick={handleToRejectPage}>Tolak Permohonan</GButton>
              </Link>
              <GButton className="w-full" color="success" type="submit" onClick={() => setConfirmDialog(true)} disabled={isSubmit || !fileReady || rejected}>Simpan</GButton>
              <GButton className="w-full" color="secondary" type="submit" onClick={() => navigate(-1)} >Batal</GButton>

            </div>) : (<div className="flex justify-center mt-3 w-full">
              <GButton className="w-full" color="success" onClick={() => setConfirmDialog(true)}>Lanjutkan Permohonan KRK</GButton>
            </div>)}

          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default StatusPermohonan
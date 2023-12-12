import { CircularProgress, Typography } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import { useEffect, useState } from "react";
import { Done, Download, WarningRounded } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { notification } from "../../utils/Recoils";
import { createNotifcation, downloadFile, formatDate } from "../../utils/Helpers";
import axios from "axios";
import GButton from "../../components/GButton";

type Props = {
  title?: string;
}

function StatusPermohonanGuest({ title = 'Status Permohonan' }: Props) {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [_n, setN] = useRecoilState<any>(notification);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
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

  const TimeLine = ({ events }: { events: Array<any> }) => {
    return (
      <div className="relative">
        <div className="absolute left-[0.6rem] top-3 bottom-14 transform -translate-x-1/2 border-l-4 border-white"></div>
        {events.map((event, index) => (
          <div key={index} className="flex items-center mb-7 relative font-quicksand">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-white z-10 font-bold">
              {event.checked &&
                <Done color="primary" className="!w-3 !h-3 !stroke-[5] !stroke-gblue-500" />
              }
            </div>
            <div className={"ml-4 w-full rounded-lg px-3 py-2 flex justify-between " + (event.checked ? 'bg-white text-gblue-500' : 'text-white bg-gdarkgray-500')}>
              <p>{event.title}</p>
              <div className="flex flex-col gap-1 justify-end text-right">
                <p className="text-sm">{event.date ? `Diproses tanggal ${formatDate(event.date, 'DD MM YYYY', 'long')}` : null}</p>
                {(status.filter((obj: any) => obj.checked === true).length === 10 && index === 9) &&
                  <div className="flex gap-1 justify-end items-center">
                    {event?.file !== null &&
                      <>
                        {downloadProgress > 0 &&
                          <CircularProgress size={25} variant="determinate" value={downloadProgress} />
                        }
                        <GButton color="error" className="!flex !gap-2" onClick={() => downloadFile(`/download/${event.file}`, {
                          filename: `${data.registration_number}-${event.file}`,
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

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const query: any = await axios.get(`/data-permohonan/${params.uuid}`);
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

  return (
    <AuthLayout title={title}>
      <div className="flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">{title}</Typography>
      </div>
      <div className="flex flex-col gap-5 mt-4">
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
        <div className="max-w-5xl flex flex-col gap-5">
          {data?.permohonan_progresses?.filter((obj: any) => obj.step === 11).length > 0 &&
            <div className="w-full rounded-md bg-gyellow-500 text-gdarkgray-500 p-9 flex gap-7 items-center font-quicksand mb-3">
              <WarningRounded className="!w-20 !h-20" />
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between">
                  <Typography variant="h5" className="!font-quicksand !font-semibold">Permohonan dokumen KRK ini terhenti/ditolak</Typography>
                  <span className="text-right font-heebo font-light">Diupdate  tanggal {data.permohonan_progresses.filter((obj: any) => obj.step === 11)[0]?.processed_on ? formatDate(data.permohonan_progresses.filter((obj: any) => obj.step === 11)[0]?.processed_on, 'DD MM YYYY', 'long') : null}</span>
                </div>
                <div>
                  <Typography variant="h6" className="!font-quicksand !font-bold">Alasan Perhentian/Penolakan :</Typography>
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

export default StatusPermohonanGuest
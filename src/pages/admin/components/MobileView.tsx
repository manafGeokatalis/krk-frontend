import { formatDate } from "../../../utils/Helpers"
import ButtonPermohonan from "../../public/components/ButtonPermohonan"
import { Button, LinearProgress } from "@mui/material"

interface MobileViewProps {
    data: any,
    setSearch: React.Dispatch<React.SetStateAction<any>>
    , setPerPage: React.Dispatch<React.SetStateAction<any>>,
    setDownloadProgress: React.Dispatch<React.SetStateAction<any>>,
    downloadProgress: any,
    paginate: any,
    setPage: React.Dispatch<React.SetStateAction<any>>,
    downloadForm: React.Dispatch<React.SetStateAction<any>>,
    setConfirm: React.Dispatch<React.SetStateAction<any>>,
    downloadFile: any,
    process: any
}

export default function MobileView({ data, setDownloadProgress, downloadProgress, downloadForm, setConfirm, downloadFile, process }: MobileViewProps) {
    return (
        <>
            <div className="px-4 mt-2 w-full">
                <div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25">
                    {data.length > 0 ? data.map((v: any, i: number) => (
                        <div className="py-2 px-4" key={i}>
                            <div className="flex justify-between text-sm ">
                                <div>
                                    {formatDate(v.createdAt, 'DD MM YYYY', 'long')}
                                </div>
                                <div>
                                    {v.registration_number}
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-2 flex-col">
                                <div className="text-lg text-[#F4BF37]">
                                    {v.lokasi_kelurahan.name}, {v.fungsi_bangunan}
                                </div>
                                <ButtonPermohonan progress={v.permohonan_progresses} uuid={v.uuid} />
                                <div className="mt-6 flex flex-col gap-2 w-full">
                                    <div className="w-full">
                                        <Button size="small" variant="contained" color="info" className="!py-2 w-full !rounded-xl !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadFile(`/download/permohonan/${v.uuid}/berkas`, {
                                            filename: `KerenkaMaBarBerkas[${v.registration_number}].zip`,
                                            onProgress(progress: any) {
                                                setDownloadProgress({ ...downloadProgress, [v.uuid]: progress });
                                                if (progress == 100) {
                                                    setTimeout(() => {
                                                        setDownloadProgress({ ...downloadProgress, [v.uuid]: 0 });
                                                    }, 1000);
                                                }
                                            },
                                        })} disabled={downloadProgress[v.uuid] > 0}>Unduh Berkas</Button>
                                        {downloadProgress[v.uuid] > 0 &&
                                            <LinearProgress color="primary" variant="determinate" value={downloadProgress[v.uuid]} className="mt-1" />
                                        }
                                    </div>
                                    <Button size="small" variant="contained" color="warning" className="!py-2 !rounded-xl !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(v)} disabled={process[v.uuid]}>Form</Button>
                                    <Button size="small" variant="contained" color="error" className="!py-2 !rounded-xl !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => setConfirm({
                                        ...confirm,
                                        show: true,
                                        title: `Hapus Permohonan ${v.name}?`,
                                        message: `<center>Data permohonan ${v.name} akan terhapus permanen dan tidak dapat dikembalikan</center>`,
                                        uuid: v.uuid
                                    })}>Hapus</Button>
                                </div>
                            </div>
                        </div>
                    )) : <></>}

                </div>
            </div>
        </>
    )
}
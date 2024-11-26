import { Link } from "react-router-dom"
import { formatDate } from "../../../utils/Helpers"
import ButtonPermohonan from "../../public/components/ButtonPermohonan"
import { Button } from "@mui/material"
import DrawerFilterPermohonanMobile from "./DrawerFilterPermohonanMobile"
import { AscSort, DescSort } from '../../../components/icons/sort';
import { OrderType } from "../../../data/interface/user";

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
    process: any,
    orderBy: string,
    handleChangeOrderBy: (orderBy: string) => void,
    order: string,
    handleChangeOrder: (order: OrderType) => void,


}

export default function MobileView({ data, setConfirm, order, orderBy, handleChangeOrderBy, handleChangeOrder }: MobileViewProps) {

    const handleSortChange = () => {
        if (order === 'asc') {
            handleChangeOrder('desc');
        } else {
            handleChangeOrder('asc');
        }
    };
    return (
        <>
            <div className="px-4 mt-2 w-full">
                <div className="flex mb-4">
                    <DrawerFilterPermohonanMobile orderBy={orderBy} handleChangeOrderBy={(e) => {
                        handleChangeOrderBy(e)
                    }} />

                    <div className="inline-block flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-[#4D4D4D] shadow-lg"
                        onClick={() => handleSortChange()}>{order == 'asc' ?
                            <AscSort /> :
                            <DescSort className="w-[1rem]" />}
                    </div>
                </div>
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
                                <div className="text-lg text-[#F4BF37] ">
                                    {v?.lokasi_kelurahan?.name}, {v?.fungsi_bangunan}
                                </div>
                                <div className="mb-4 text-xs">Pemohon: {v?.name}</div>

                                <ButtonPermohonan progress={v.permohonan_progresses} uuid={v.uuid} />
                                <div className="mt-6 flex flex-col gap-2 w-full">
                                    {/* <div className="w-full">
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
                                    </div> */}
                                    <Button size="small" variant="contained" color="warning" className="!py-2 !rounded-xl !px-5 !text-sm !capitalize !whitespace-nowrap relative flex"  ><Link to={`/permohonan/download/${v.uuid}`}> <span className="md:hidden flex mr-2 absolute left-4 items-center"><div className="p-1 rounded-full bg-white flex items-center justify-center w-6 h-6"><img src="src/assets/icons/document.png" /></div></span>Periksa Dokumen</Link></Button>

                                    {/* <Button size="small" variant="contained" color="warning" className="!py-2 !rounded-xl !px-5 !text-sm !capitalize !whitespace-nowrap" onClick={() => downloadForm(v)} disabled={process[v.uuid]}>Form</Button> */}
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
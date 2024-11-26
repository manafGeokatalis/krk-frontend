
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function ButtonPermohonan({ progress, uuid }: any) {
    const progressSortBy = progress.sort((a: any, b: any) => a.step - b.step)
    return (
        <Link className="w-full md:w-auto" to={`/permohonan/${uuid}`}>
            <Button size="small" variant="contained" className={"!py-3 md:!py-0.5 w-full !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize  md:!whitespace-nowrap flex relative " + (progressSortBy[progressSortBy.length - 1]?.step === 11 ? '!bg-[#F58A8A]' : progressSortBy[progressSortBy.length - 1]?.step === 5 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
                <span className="md:hidden flex mr-2 absolute left-4 ">
                    <div className="p-1 rounded-full bg-white flex items-center justify-center w-6 h-6">
                        {progressSortBy[progressSortBy.length - 1]?.step == 11 ? (<>
                            <img src="src/assets/icons/alert.png" /></>) : (<>
                                <img src="src/assets/icons/check.png" /></>)}
                    </div>
                </span>
                {progressSortBy.length == 0 ? 'Permohonan Telah Diajukan' : progressSortBy[progressSortBy.length - 1]?.step !== 11 ? progressSortBy[progressSortBy.length - 1]?.desc : 'KRK DITOLAK'}
            </Button>
        </Link>
    )
}
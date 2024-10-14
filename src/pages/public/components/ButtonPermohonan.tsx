
import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function ButtonPermohonan({ progress, uuid }: any) {
    const progressSortBy = progress.sort((a: any, b: any) => a.step - b.step)
    return (
        <Link className="w-full md:w-auto" to={`/permohonan/${uuid}`}>
            <Button size="small" variant="contained" className={"!py-3 md:!py-0.5 w-full !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap " + (progressSortBy[progressSortBy.length - 1]?.step === 11 ? '!bg-[#F58A8A]' : progressSortBy[progressSortBy.length - 1]?.step === 5 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
                {progressSortBy.length == 0 ? 'Permohonan Telah Diajukan' : progressSortBy[progressSortBy.length - 1]?.step !== 11 ? progressSortBy[progressSortBy.length - 1]?.desc : 'KRK DITOLAK'}
            </Button>
        </Link>
    )
}
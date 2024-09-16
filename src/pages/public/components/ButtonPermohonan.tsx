
import { Button} from "@mui/material"
import { Link } from "react-router-dom"

export default function ButtonPermohonan({progress,uuid}:any){
    return(
        <Link className="w-full md:w-auto" to={`/permohonan/${uuid}`}>
            <Button size="small"  variant="contained" className={"!py-3 md:!py-0.5 w-full !rounded-xl md:!rounded-full !px-5 !text-sm !capitalize !whitespace-nowrap " + (progress[progress.length - 1]?.step === 11 ? '!bg-ggray-100' : progress[progress - 1]?.step === 9 ? '!bg-ggreen-500' : '!bg-gblue-500')}>
            {progress.length == 0 ? '0. Permohonan Telah Diajukan' : progress[progress.length - 1]?.step !== 11 ? progress[progress - 1]?.desc : 'KRK DITOLAK'}
            </Button>
      </Link>
    )
}
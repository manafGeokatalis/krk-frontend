
import { formatDate } from "../../../utils/Helpers"
import ButtonPermohonan from "./ButtonPermohonan"

export default function MobileView({ data }: any) {
    return (
        <>
            <div className="px-4 mt-2 w-full">
                <div className="bg-[#4D4D4D] rounded-md divide-y-2 divide-slate-400/25 pb-18">
                    {data.length > 0 ? data.map((v: any, i: number) => (
                        <div className="py-6 px-4" key={i}>
                            <div className="flex justify-between text-sm ">
                                <div>
                                    {formatDate(v.createdAt, 'DD MM YYYY', 'long')}
                                </div>
                                <div>
                                    {v?.registration_number}
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-2 flex-col">
                                <div className="text-lg text-[#F4BF37]">
                                    {v?.lokasi_kelurahan?.name}, {v?.fungsi_bangunan}
                                </div>
                                <ButtonPermohonan progress={v?.permohonan_progresses} uuid={v?.uuid} />
                            </div>
                        </div>
                    )) : <></>}

                </div>
            </div>
        </>
    )
}
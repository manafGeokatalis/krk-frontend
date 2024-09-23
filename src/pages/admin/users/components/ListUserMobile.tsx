
import { Link } from "react-router-dom"
import { formatDate } from "../../../../utils/Helpers"


interface ListUserMobileProps {
    data: any,
    paginate: any,
    setPage: React.Dispatch<React.SetStateAction<any>>,
    setConfirm: React.Dispatch<React.SetStateAction<any>>
}

function BadgeSuccess({ label }: { label: string }) {
    return (
        <>
            <div className="py-1 font-semibold px-4 text-xs rounded-2xl bg-[#D9FFED] text-[#33B679]">
                {label}
            </div>
        </>
    )
}

function BadgeSecondary({ label }: { label: string }) {
    return (
        <>
            <div className="py-1 font-semibold px-4 text-xs rounded-2xl bg-[#EFEFEF] text-[#4D4D4D]">
                {label}
            </div>
        </>
    )
}

export default function ListUserMobile({ data }: ListUserMobileProps) {
    return (
        <>
            <div className="px-4 flex flex-col gap-2 w-full mt-4">
                {data.map((user: any, i: any) => {
                    return (
                        <div className="bg-[#4D4D4D] py-2 px-4 w-full rounded-lg" key={i}>
                            <div className="flex ">
                                <div className="text-xs text-[#B3B3B3]">Regist: {formatDate(user.createdAt, 'DD MM YYYY', 'long')}</div>
                            </div>
                            <div className="flex mt-4 justify-between items-center">
                                <div className="font-semibold">{user.name}</div>
                                <div>
                                    {
                                        user.role !== 'PUBLIC' ? (<BadgeSuccess label="Admin" />) : <BadgeSecondary label="Public" />
                                    }
                                </div>
                            </div>
                            <Link to={`/users/${user.uuid}`}>
                                <div className="w-full text-sm flex border justify-center items-center cursor-pointer py-1 border-[#ffffff] mt-4 rounded-xl">
                                    Edit Profile Pengguna
                                </div>
                            </Link>
                        </div>
                    )
                })}

            </div>
        </>
    )
}
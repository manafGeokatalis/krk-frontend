
import { Link } from "react-router-dom"
import { formatDate } from "../../../../utils/Helpers"
import DrawerFilterMobile from "./DrawerFilterMobile"
import { AscSort, DescSort } from '../../../../components/icons/sort';
import { useEffect, useState } from "react";
import { OrderType } from "../../../../data/interface/user";
import { useRef } from "react";
interface ListUserMobileProps {
    data: any,
    paginate: any,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<any>>,
    setConfirm: React.Dispatch<React.SetStateAction<any>>,
    orderBy: string,
    handleChangeOrderBy: (orderBy: string) => void,
    order: string,
    handleChangeOrder: (order: OrderType) => void,
    search: string,
    handleChangeSearch: (search: any) => void,
    fetchData: () => void
}



export default function ListUserMobile({ data, setPage, orderBy, handleChangeOrderBy, handleChangeOrder, order, search, handleChangeSearch, fetchData }: ListUserMobileProps) {

    const [dataUser, setDataUser] = useState<any>([])
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const loadingRef = useRef<boolean>(false);
    const loadingBreakpoint = 768;

    const handleSortChange = () => {
        setPage(1)
        setDataUser([])
        if (order === 'asc') {
            handleChangeOrder('desc');
        } else {
            handleChangeOrder('asc');
        }
    };

    useEffect(() => {
        if (debouncedSearch !== null) {
            setDataUser([])
            const handler = setTimeout(() => {
                setPage(1)
                fetchData()
            }, 500); // Debounce delay of 500ms

            return () => {
                clearTimeout(handler);
            };
        }
    }, [debouncedSearch]); // Trigger the effect when debouncedSearch changes

    const handleSearchChange = (value: string) => {
        handleChangeSearch(value);
        setDebouncedSearch(value);
    };

    // Infinite scroll logic
    const handleScroll = () => {
        if (window.innerWidth <= loadingBreakpoint) {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
            if (bottom && !loadingRef.current) {
                loadingRef.current = true; // Prevent multiple fetches
                setPage((prevPage: any) => prevPage + 1); // Increment page
                loadingRef.current = false; // Reset loading state
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setDataUser((prevData: any) => [...prevData, ...data]);
    }, [data])

    return (
        <>
            <div className="px-4 flex flex-col gap-2 w-full  ">
                <div className="mt-2">
                    <div>
                        <input placeholder="Cari" value={search} className="w-full bg-transparent border border-white w-full rounded-lg h-12 pl-4" onChange={(e) => handleSearchChange(e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <DrawerFilterMobile
                        orderBy={orderBy}
                        handleChangeOrderBy={(e) => {
                            setDataUser([])
                            handleChangeOrderBy(e)
                        }} />

                    <div className="inline-block flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-[#4D4D4D] shadow-lg" onClick={() => handleSortChange()}>{order == 'asc' ? <AscSort /> : <DescSort className="w-[1rem]" />}</div></div>
                {dataUser.map((user: any, i: any) => {
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
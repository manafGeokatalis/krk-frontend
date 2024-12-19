import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { user } from "../../utils/Recoils";
import { publicMenu, privateMenu, publicNoAuthListMenu } from '../../data/config/menu';
import { UserRole } from '../../data/enum/user';
import { MenuItem } from '../../data/interface/menu';


const getMenuByRole = (user?: any): MenuItem[] => {
    const role = user && user.role ? user.role : undefined

    if (role == UserRole.SUPERADMIN || role == UserRole.ADMIN) {
        return privateMenu;
    } else if (role == UserRole.PUBLIC) {
        return publicMenu;
    } else {
        return publicNoAuthListMenu
    }

};

function BottomNavigation() {
    const [userData] = useRecoilState<any>(user);
    const location = useLocation();

    const menuItems = getMenuByRole(userData)

    return (
        <>
            <div className="w-full bg-[#484848] max-[1500px] md:hidden flex fixed bottom-0 justify-around align-bottom py-2 z-50"
            >
                <div className="grid grid-cols-3 gap-1 w-full px-2">
                    {/* <Link to='/permohonan'>
                        <div className="bg-[#666666] cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl">
                            <img className='h-6' src={home}/>
                            <div className='text-[8px] mt-2'>Beranda</div>
                        </div>
                    </Link>
                   <Link to={'/petunjuk-permohonan'}>
                    <div className="bg-[#666666] cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl">
                            <img className='h-6' src={document}/>
                            <div className='text-[8px] mt-2 text-center'>Petunjuk Permohonan</div>
                        </div>
                    </Link>
                    <Link to={'/tentang-krk'}>
                    <div className="bg-[#666666] cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl">
                        <img className='h-6' src={compass}/>
                        <div className='text-[8px] text-center mt-2'>Tentang KRK</div>
                    </div>
                    </Link> */}
                    {
                        menuItems.map((menu: MenuItem, i) => {
                            const IconActive = menu.iconActive
                            const IconDefault = menu.iconDefault

                            const isActive = location.pathname === menu.path
                            // const iconColor = isActive ? 'white' : '#F4BF37';

                            return (
                                <Link to={menu.path}>
                                    <div className={`${isActive ? 'bg-[#4D4D4D]' : 'bg-[#666666]'} cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl`} key={i}>
                                        {isActive ? (<IconActive />) : (<IconDefault />)}
                                        {/* <img className='h-6' src={home}/> */}
                                        {/* <Icon className={isActive ? 'text-white' : 'text-[#F4BF37]'} fontSize='medium' /> */}
                                        <div className='text-[8px] mt-1'>{menu.label}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default BottomNavigation
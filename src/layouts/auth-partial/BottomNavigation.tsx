import home from '../../assets/icons/home_yellow.svg';
import document from '../../assets//icons/document_yellow.svg';
import compass from '../../assets/icons/compass_yellow.svg';
import { Link,useLocation } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { user } from "../../utils/Recoils";
import { privateMenu,publicMenu } from '../../data/config/menu';
import { UserRole } from '../../data/enum/user';
import { MenuItem } from '../../data/interface/menu';


const getMenuByRole = (role: UserRole): MenuItem[] => {
    if (role === UserRole.SUPERADMIN) {
      return [...privateMenu]; // Merge both menus for private users
    }
    return publicMenu; // Only public menu for public users
  };

function BottomNavigation(){
    const [userData, setUserData] = useRecoilState<any>(user);
    const location = useLocation();

    const menuItems =  getMenuByRole(userData.role)

    return (
        <>
            <div className="w-full bg-[#484848] max-[1500px] md:hidden flex fixed bottom-0 justify-around align-bottom py-4 z-50"
            >
                <div className="grid grid-cols-3 gap-2 w-full px-3">
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
                        menuItems.map((menu:MenuItem,i)=>{
                            const Icon = menu.icon
                            const isActive = location.pathname === menu.path
                            return(
                                <Link to={menu.path}>
                                    <div className={`${isActive?'bg-[#4D4D4D]':'bg-[#666666]'} cursor-pointer p-2 w-full flex justify-center flex-col items-center rounded-2xl`} key={i}>
                                        {/* <img className='h-6' src={home}/> */}
                                        <Icon className={isActive?'text-white':'text-[#F4BF37]'} fontSize='medium'/>
                                        <div className='text-[8px] mt-2'>{menu.label}</div>
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
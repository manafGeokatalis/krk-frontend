import { Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import { useRecoilValue } from 'recoil';
import { user } from '../../utils/Recoils';
import { Link, useLocation } from 'react-router-dom';
import { ucwords } from '../../utils/Helpers';

function NavBar() {
  const userData = useRecoilValue<any>(user);
  const location = useLocation();

  return (
    <div className="flex flex-col fixed w-72 inset-0 bg-gdarkgray-500 z-50">
      <Link to={'/'}>
        <div className="px-3 py-5 bg-ggray-50 flex gap-2 items-center">
          <img src={logo} alt="logo" className='w-12' />
          <Typography variant='h3' className='!text-base !font-quicksand !font-semibold !text-gdarkgray-500'>Pemerintah Kabupaten Manggarai Barat</Typography>
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        {userData !== null ?
          <>
            <Link to={'/profile'}>
              <div className={"text-center p-3 " + (location.pathname.startsWith('/profile') ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>
                <Typography className='!font-quicksand !font-bold !text-lg'>{userData?.name ?? '-'}</Typography>
                <Typography className='!font-light !font-heebo !text-sm'>{userData?.id_number ?? ucwords(userData?.role.toLowerCase()) ?? '-'}</Typography>
              </div>
            </Link>
            <Link to={'/permohonan'}>
              <button className={'w-full font-quicksand p-3 transition-all duration-200 ' + (location.pathname.startsWith('/permohonan') ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>Permohonan</button>
            </Link>
            {userData?.role !== 'PUBLIC' &&
              <Link to={'/users'}>
                <button className={'w-full font-quicksand p-3 transition-all duration-200 ' + (location.pathname.startsWith('/user') ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>User</button>
              </Link>
            }
          </>
          : <Link to={'/pantau'}>
            <button className={'w-full font-quicksand p-3 mt-2 transition-all duration-200 ' + (location.pathname.startsWith('/pantau') ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>Pantau Permohonan</button>
          </Link>
        }
        <div className="flex flex-col gap-1 border shadow-md shadow-gdarkgray-600 mt-2 drop-shadow-md">
          <Link to={'/petunjuk-permohonan'}>
            <button className={'w-full font-quicksand p-3 transition-all duration-200 ' + (location.pathname === '/petunjuk-permohonan' ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>Petunjuk Permohonan</button>
          </Link>
          <Link to={'/tentang-krk'}>
            <button className={'w-full font-quicksand p-3 transition-all duration-200 ' + (location.pathname === '/tentang-krk' ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>Tentang KRK</button>
          </Link>
          {/* <Link to={'/tentang-tataruang'}>
            <button className={'w-full font-quicksand p-3 transition-all duration-200 ' + (location.pathname === '/tentang-tataruang' ? 'bg-white text-gdarkgray-800' : 'hover:bg-ggray-300 hover:text-gdarkgray-800')}>Tentang Tata Ruang Wilayah</button>
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default NavBar
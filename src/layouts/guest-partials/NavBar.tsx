import { Button, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import logoLodokMabar from '../../assets/lodok_mabar_logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { user } from '../../utils/Recoils';
import { AccountCircle } from '@mui/icons-material';
import { ucwords } from '../../utils/Helpers';
import GButton from '../../components/GButton';
import axios from 'axios';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Menu, Close } from '@mui/icons-material';
import { UserRole } from '../../data/enum/user';
import { ListMenuItem } from '../../data/interface/menu';
import { privateListMenu, publicListMenu } from '../../data/config/menu';
const getListMenuByRole = (role: UserRole): ListMenuItem[] => {

  if (role == UserRole.SUPERADMIN || role == UserRole.ADMIN) {
    return privateListMenu; // Merge both menus for private users
  }
  return publicListMenu; // Only public menu for public users
};

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuInformasi, setSubMenuInformasi] = useState(false);
  const [subUser, setSubUser] = useState(false);
  const dataUser = useRecoilValue<any>(user);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      location.replace('/');
    } catch (error: any) {
      setLoading(false);

    }
  }


  return (
    <div className=" py-4 bg-gdarkgray-500 flex  justify-center items-center">
      <div className='max-w-[1120px] md:w-[1120px] px-4 md:px-0   text-white flex justify-between'>
        <Link to={'/'}>
          <div className="flex gap-4 items-center">
            <img className='hidden md:flex' alt="logo-lodok-mabar" src={logoLodokMabar} />
            <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
            <Typography variant='h3' className='!text-sm hidden md:flex !leading-tight !font-quicksand'>Dinas Cipta Karya, Tata Ruang, Perumahan dan Kawasan Permukiman<br />Kabupaten Manggarai Barat</Typography>
            <Typography variant='h3' className='!text-lg flex md:hidden !leading-tight !font-quicksand'>Dinas Cipta Karya, Tata Ruang, Perumahan dan Kawasan Permukiman Kabupaten Manggarai Barat</Typography>

          </div>
        </Link>
        {/* Hamburger Menu Icon for Mobile */}
        <div className="hidden items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
        <ul className={`md:flex gap-10 items-center ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full md:w-0 bg-gdarkgray-500 z-50 p-4' : 'hidden'} md:static md:flex-row md:gap-10 md:bg-transparent`}>
          {dataUser && dataUser !== null ? (<></>) : (<>
            <li className='text-white font-quicksand relative cursor-pointer' onMouseEnter={() => setSubMenuInformasi(true)} onMouseLeave={() => setSubMenuInformasi(false)}>
              Informasi
              {subMenuInformasi &&
                <ul className='absolute  flex flex-col bg-gdarkgray-500 border border-ggray-200 rounded-xl z-50 -right-[100px]  md:right-0 shadow-lg shadow-gdarkgray-500 overflow-hidden'>
                  <Link to={'/pantau'}>
                    <li className='py-3 px-10 whitespace-nowrap text-center hover:bg-gray-300 hover:text-gdarkgray-500'>
                      Pantau Permohonan
                    </li>
                  </Link>
                  <Link to={'/petunjuk-permohonan'}>
                    <li className='py-3 px-10 whitespace-nowrap text-center hover:bg-gray-300 hover:text-gdarkgray-500'>Petunjuk Permohonan KRK</li>
                  </Link>
                  <Link to={'/tentang-krk'}>
                    <li className='py-3 px-10 whitespace-nowrap text-center hover:bg-gray-300 hover:text-gdarkgray-500'>Tentang KRK</li>
                  </Link>
                  {/* <Link to={'/tentang-tataruang'}>
                <li className='py-3 px-10 whitespace-nowrap text-center hover:bg-gray-300 hover:text-gdarkgray-500'>Tentang Tata Ruang</li>
              </Link> */}
                </ul>
              }
            </li>
            <li className='text-white font-quicksand'>
              {dataUser ?
                <Link to={'/permohonan'}>
                  Dashboard
                </Link>
                : <>
                  <ConfirmDialog show={confirm} title={'Silahkan Log in'} message={`Silahkan log in terlebih dahulu sebelum melakukan permohonan penerbitan dokumen KRK. Apabila belum memiliki akun, anda dapat membuat akun baru terlebih dahulu`} rejectLable='Sudah Punya Akun' acceptLable='Buat Akun Baru' onClose={() => {
                    setConfirm(false);
                    navigate('/');
                  }} onSubmit={() => {
                    navigate('/register');
                    setConfirm(false);
                  }} />
                  <Button className='!text-white !font-quicksand !capitalize hover:!bg-inherit' onClick={() => setConfirm(true)}>Dashboard</Button>
                </>
              }
            </li>
          </>)}
          {dataUser && dataUser !== null &&
            <li className='text-white font-quicksand flex gap-2 items-center cursor-pointer relative z-50' onClick={() => setSubUser(true)} onMouseLeave={() => setSubUser(false)}>
              <span className='hover:text-gblue-300'>{dataUser.name}</span>
              <AccountCircle />
              {subUser &&
                <>
                  <div className="flex flex-col absolute top-6 right-0 bg-gdarkgray-500 py-7  rounded-xl shadow-xl border border-x-ggray-300">
                    <div className='px-20'>
                      <div className='text-center'>
                        <Typography className='!whitespace-nowrap !font-quicksand !font-bold !text-xl'>{dataUser?.name?.toUpperCase()}</Typography>
                        <span className='font-heebo !font-light text-sm'>{ucwords(dataUser?.role?.toLowerCase())}</span>
                      </div>
                      <div className="flex flex-col gap-7 items-center !whitespace-nowrap mt-10">
                        <Link to={'/permohonan'}>
                          <GButton color='secondary'>Buka Dashboard</GButton>
                        </Link>
                        <GButton color='error' disabled={loading} onClick={logout}>Keluar</GButton>
                      </div>
                      <hr className='w-full border-ggray-100 mt-4' />
                    </div>
                    <div className='py-4'>
                      {getListMenuByRole(dataUser?.role).map((menu) => (
                        <a href={menu.path} className='flex hover:bg-ggray-50 hover:text-gdarkgray-500 py-2 justify-center !cursor-pointer'>
                          {menu.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </>

              }
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default NavBar
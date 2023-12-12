import { Button, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { user } from '../../utils/Recoils';
import { AccountCircle } from '@mui/icons-material';
import { ucwords } from '../../utils/Helpers';
import GButton from '../../components/GButton';
import axios from 'axios';
import ConfirmDialog from '../../components/ConfirmDialog';

function NavBar() {
  const [subMenuInformasi, setSubMenuInformasi] = useState(false);
  const [subUser, setSubUser] = useState(false);
  const [dataUser, setDataUser] = useRecoilState<any>(user);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      setDataUser(null);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
  }

  return (
    <div className="px-24 py-4 bg-gdarkgray-500 text-white flex justify-between items-center">
      <Link to={'/'}>
        <div className="flex gap-4 items-center">
          <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
          <Typography variant='h3' className='!text-lg !leading-tight !font-quicksand'>Dinas Cipta Karya, Tata Ruang, Perumahan dan Kawasan Permukiman<br />Kabupaten Manggarai Barat</Typography>
        </div>
      </Link>
      <ul className="flex gap-10 items-center">
        <li className='text-white font-quicksand relative cursor-pointer' onMouseEnter={() => setSubMenuInformasi(true)} onMouseLeave={() => setSubMenuInformasi(false)}>
          Informasi
          {subMenuInformasi &&
            <ul className='absolute  flex flex-col bg-gdarkgray-500 border border-ggray-200 rounded-xl z-50 right-0 shadow-lg shadow-gdarkgray-500 overflow-hidden'>
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
              <Link to={'/tentang-tataruang'}>
                <li className='py-3 px-10 whitespace-nowrap text-center hover:bg-gray-300 hover:text-gdarkgray-500'>Tentang Tata Ruang</li>
              </Link>
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
        {dataUser !== null &&
          <li className='text-white font-quicksand flex gap-2 items-center cursor-pointer relative z-50' onClick={() => setSubUser(true)} onMouseLeave={() => setSubUser(false)}>
            <span className='hover:text-gblue-300'>{dataUser.name}</span>
            <AccountCircle />
            {subUser &&
              <div className="flex flex-col absolute top-6 right-0 bg-gdarkgray-500 py-7 px-20 rounded-xl shadow-xl border border-x-ggray-300">
                <div className='text-center'>
                  <Typography className='!whitespace-nowrap !font-quicksand !font-bold !text-xl'>{dataUser.name.toUpperCase()}</Typography>
                  <span className='font-heebo !font-light text-sm'>{ucwords(dataUser.role.toLowerCase())}</span>
                </div>
                <div className="flex flex-col gap-7 items-center !whitespace-nowrap mt-10">
                  <Link to={'/permohonan'}>
                    <GButton color='secondary'>Buka Dashboard</GButton>
                  </Link>
                  <hr className='w-full border-ggray-100' />
                  <GButton color='error' disabled={loading} onClick={logout}>Keluar</GButton>
                </div>
              </div>
            }
          </li>
        }
      </ul>
    </div>
  )
}

export default NavBar
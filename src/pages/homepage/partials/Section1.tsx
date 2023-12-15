import { Alert, Box, Card, CardContent, TextField, Typography } from '@mui/material'
import kerenka from '../../../assets/kerenka.svg'
import GButton from '../../../components/GButton'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { user } from '../../../utils/Recoils';
import { Error } from '@mui/icons-material';
import ConfirmDialog from '../../../components/ConfirmDialog';

function Section1() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [userData, setUserData] = useRecoilState<any>(user);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await axios.post('/auth/login', form);
      location.replace('/permohonan');
    } catch (error: any) {
      setError(error?.response?.data?.message ?? 'Data login tidak benar')
      setUserData(null);
      setSubmitting(false);
    }
  }

  return (
    <div className='flex items-center py-16'>
      <div className="flex flex-col gap-7 justify-center items-center px-24 w-full">
        <div className="flex flex-col gap-2 items-center">
          <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
          <Typography variant='h1' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
        </div>
        <hr className='w-full' />
        {userData && userData?.role === 'PUBLIC' ?
          <Link to={'/permohonan/petunjuk'}>
            <GButton color='primary'>+ Ajukan Permohonan PKKPR</GButton>
          </Link>
          : <>
            <ConfirmDialog show={confirm} title={'Silahkan Log in'} message={`Silahkan log in terlebih dahulu sebelum melakukan permohonan penerbitan dokumen KRK. Apabila belum memiliki akun, anda dapat membuat akun baru terlebih dahulu`} rejectLable='Sudah Punya Akun' acceptLable='Buat Akun Baru' onClose={() => {
              setConfirm(false);
              navigate('/');
            }} onSubmit={() => {
              navigate('/register');
              setConfirm(false);
            }} />
            <GButton color='primary' onClick={() => setConfirm(true)}>+ Ajukan Permohonan PKKPR</GButton>
          </>
        }
      </div>
      {!userData &&
        <div className="w-full max-w-md">
          <Card className='!bg-gdarkgray !rounded-xl'>
            <Box component={'form'} onSubmit={submitLogin}>
              {error !== '' && <Alert color='error' variant='filled' icon={<Error className='!w-5 !h-5' />}>{error}</Alert>}
              <CardContent className='!flex !flex-col !gap-10 !p-7'>
                <div className="flex flex-col gap-4">
                  <TextField type='text' variant='outlined' color='secondary' label='E-Mail' name='email' value={form.email} onChange={handleInput} disabled={submitting} required sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }} />
                  <TextField type='password' variant='outlined' color='secondary' label='Password' name='password' value={form.password} onChange={handleInput} disabled={submitting} required sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }} />
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-col gap-2">
                    <GButton type='submit' color='success' disabled={submitting}>Masuk</GButton>
                    <p className='text-white text-sm font-quicksand hover:text-gray-300'>Lupa Password?</p>
                  </div>
                </div>
                <div className="px-20">
                  <hr />
                </div>
                <div className='flex justify-center'>
                  <Link to={`/register`}>
                    <GButton>Buat Akun Baru</GButton>
                  </Link>
                </div>
              </CardContent>
            </Box>
          </Card>
        </div>
      }
    </div >
  )
}

export default Section1
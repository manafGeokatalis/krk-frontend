import GuestLayout from '../../layouts/GuestLayout'
import kerenka from '../../assets/kerenka.svg'
import { Card, CardContent, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import GButton from '../../components/GButton';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { notification } from '../../utils/Recoils';
import AggrementDialog from './partials/AggrementDialog';
import { createNotifcation, isEmail } from '../../utils/Helpers';

function Register() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    id_number: '',
    address: '',
    wa_number: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<any>({
    name: '',
    id_number: '',
    address: '',
    wa_number: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [agrementDialog, setAgrementDialog] = useState(false);
  const [_notif, setN] = useRecoilState(notification);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let error = false;
    if (!isEmail(form.email)) {
      error = true;
      setErrors({ ...errors, email: 'Format email tidak benar' });
    }

    if (form.password !== form.confirm_password) {
      error = true;
      setErrors({ ...errors, confirm_password: 'Perulangan password tidak benar' });
    }

    if (!error) {
      setAgrementDialog(true);
    }
  }

  const submitData = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/register', form);
      location.replace('/permohonan');
    } catch (error: any) {
      const message = error.response?.data?.message;
      setLoading(false);
      if (message) {
        setErrors({ ...errors, [Object.keys(message)[0]]: message[Object.keys(message)[0]] });
      } else {
        setN(createNotifcation('Server bermasalah'));
      }
      setAgrementDialog(false);
    }
  }

  return (
    <>
      <AggrementDialog onClose={() => setAgrementDialog(false)} show={agrementDialog} process={loading} onSubmit={submitData} />
      <GuestLayout title='Buat Akun Baru'>
        <div className="flex w-full justify-center p-16 pb-20">
          <div className='w-full max-w-xl flex flex-col gap-5'>
            <div className="flex flex-col gap-2 items-center">
              <img src={kerenka} alt="kerenka-logo" className='w-full max-w-md' />
              <Typography variant='h3' className='!font-quicksand !text-center !leading-tight !font-thin !text-xl'>Sistem Permohonan Online KRK (Keterangan Rencana Kota)<br />Kabupaten Manggarai Barat</Typography>
            </div>
            <Card className='!bg-gdarkgray-500 !rounded-xl'>
              <form onSubmit={handleSubmit}>
                <CardContent className='flex flex-col gap-3 !p-7'>
                  <Typography variant='h4' className='!font-quicksand !text-center !pb-2'>Formulir pembuatan akun</Typography>
                  <TextField variant='outlined' color='secondary' label='Nama' name='name' value={form.name} onChange={handleInput} required />
                  <TextField variant='outlined' color='secondary' label='Nomor Identitas' name='id_number' value={form.id_number} onChange={handleInput} required />
                  <TextField variant='outlined' color='secondary' label='Alamat Sesuai KTP' name='address' value={form.address} onChange={handleInput} required />
                  <TextField type='tel' variant='outlined' color='secondary' label='Nomor Whatsapp Aktif' name='wa_number' value={form.wa_number} onChange={handleInput} required />
                  <TextField type='email' variant='outlined' color='secondary' label='Email' name='email' value={form.email} onChange={handleInput} required error={errors.email != ''} helperText={errors.email} />
                  <TextField type='password' variant='outlined' color='secondary' label='Password' name='password' value={form.password} onChange={handleInput} required error={errors.password != ''} helperText={errors.password} />
                  <TextField type='password' variant='outlined' color='secondary' label='Konfirmasi Password' name='confirm_password' value={form.confirm_password} onChange={handleInput} required error={errors.confirm_password != ''} helperText={errors.confirm_password} />
                  <div className="flex justify-center pt-3">
                    <GButton type='submit'>KIRIM</GButton>
                  </div>
                </CardContent>
              </form>
            </Card>
          </div>
        </div>
      </GuestLayout>
    </>
  )
}

export default Register
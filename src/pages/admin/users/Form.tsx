import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import AuthLayout from "../../../layouts/AuthLayout";
import { useEffect, useState } from "react";
import GButton from "../../../components/GButton";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { notification, user } from "../../../utils/Recoils";
import { createNotifcation } from "../../../utils/Helpers";
import { useNavigate, useParams } from "react-router-dom";

const FormInput = ({ ...props }) => {
  return (
    <div>
      <div className={"hidden md:flex gap-10 " + (props.multiline === true ? 'items-start' : 'items-center')}>
        <InputLabel className='!font-quicksand w-3/12 !text-white'>{props.inputlabel}</InputLabel>
        <div className={"flex gap-2 w-full " + (props.multiline === true ? 'items-start' : 'items-center')}>
          <span className='font-semibold font-quicksand mr-2'>:</span>
          <TextField size='small' variant='outlined' color='secondary' fullWidth sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },

          }} {...props} />
        </div>
      </div>
      <div className="flex md:hidden flex-col">
        <InputLabel>{props.inputlabel}</InputLabel>
        <TextField size='small' variant='outlined' color='secondary' fullWidth sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }} {...props} />
      </div>
    </div>
  )
}

function UserForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    id_number: '',
    wa_number: '',
    address: '',
    password: '',
    role: 'PUBLIC',
    confirm_password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [_n, setN] = useRecoilState(notification);
  const userData = useRecoilValue<any>(user);
  const isSuperAdmin: boolean = userData?.role === 'SUPERADMIN'
  useEffect(() => {
    if (params?.uuid) {
      getData();
    }
  }, [params]);

  const getData = async () => {
    setIsSubmit(true);
    try {
      const res: any = await axios.get(`/users/${params.uuid}`);
      setForm(res?.data?.data);
      setIsSubmit(false);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setIsSubmit(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res: any = !params?.uuid ? await axios.post('/users', form) : await axios.put(`/users/${params.uuid}`, form);
      navigate('/users');
      setN(createNotifcation(res?.data?.message));
      setIsSubmit(false);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setIsSubmit(false);
    }
  }


  return (
    <AuthLayout title={params?.uuid ? 'Ubah Data' : 'Tambah Data'}>
      <div className="flex justify-between gap-3 mt-12 items-center">
        <Typography variant="h4" className="!font-quicksand !font-semibold">{params?.uuid ? 'Ubah Data' : 'Tambah Data'}</Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full mt-10 px-4 md:pl-10 md:pr-6">
          <div className="flex flex-col gap-5 w-full">
            <FormInput inputlabel="Nama" type="text" name="name" value={form.name} onChange={handleChange} required disabled={isSubmit || !isSuperAdmin} inp />
            {/* <FormInput inputlabel="Nomor Identitas" type="text" name="id_number" value={form.id_number} onChange={handleChange} disabled={isSubmit} /> */}
            <FormInput inputlabel="Alamat" type="text" multiline rows={2} name="address" value={form.address} onChange={handleChange} disabled={isSubmit || !isSuperAdmin} />
            <FormInput inputlabel="Nomor Whatsapp" type="tel" name="wa_number" value={form.wa_number} onChange={handleChange} disabled={isSubmit || !isSuperAdmin} />
            <FormInput inputlabel="Email" type="email" name="email" value={form.email} onChange={handleChange} required disabled={isSubmit || !isSuperAdmin} />
            <FormInput inputlabel="Password" type="password" name="password" value={form.password} onChange={handleChange} disabled={isSubmit || !isSuperAdmin} required={!params?.uuid} />
            {/* <FormInput inputlabel="Ulang Password" type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} disabled={isSubmit} required={!params?.uuid} /> */}
            <div className={"flex flex-col md:flex-row md:gap-10 md:items-center"}>
              <InputLabel className='!font-quicksand w-3/12 !text-white'>Role</InputLabel>
              <div className={"flex gap-2 w-full items-center"}>
                <span className='font-semibold font-quicksand mr-2 hidden md:flex'>:</span>
                <Select size="small" variant="outlined" color="secondary" name="role" value={form.role} disabled={isSubmit || !isSuperAdmin} onChange={handleChange} fullWidth sx={{
                  "&.MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                  },
                }}>
                  <MenuItem value="PUBLIC">Public</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="SUPERADMIN">Super Admin</MenuItem>
                </Select>
              </div>
            </div>
            {
              isSuperAdmin ? (<div className="flex justify-between">
                <GButton type="button" color="secondary" onClick={() => navigate(-1)}>Batal</GButton>
                <GButton type="submit" color="success" disabled={isSubmit}>Simpan</GButton>
              </div>) : (<div className="w-full"><GButton className="w-full md:w-auto" color="success" onClick={() => navigate(-1)}>Kembali</GButton></div>
              )
            }
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}

export default UserForm
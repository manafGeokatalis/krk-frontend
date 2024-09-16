import { InputLabel, TextField, Typography } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";
import GButton from "../components/GButton";
import axios from "axios";
import { useRecoilState } from "recoil";
import { notification, user } from "../utils/Recoils";
import { createNotifcation } from "../utils/Helpers";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

function Profile() {
  const [userData, setUserData] = useRecoilState<any>(user);
  const [showPassword,setShowPassword] = useState(false);
  const [showRePassword,setShowRePassword] = useState(false);


  const [form, setForm] = useState({
    name: userData?.name ?? '',
    email: userData?.email ?? '',
    id_number: userData?.id_number ?? '',
    wa_number: userData?.wa_number ?? '',
    address: userData?.address ?? '',
    password: '',
    confirm_password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const [_n, setN] = useRecoilState(notification);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res: any = await axios.post('/auth/profile', form);
      setUserData(res?.data?.data);
      setForm({ ...form, password: '', confirm_password: '' });
      setN(createNotifcation(res?.data?.message));
      setIsSubmit(false);
    } catch (error: any) {
      setN(createNotifcation(error?.response?.data?.message ?? error.message, 'error'));
      setIsSubmit(false);
    }
  }

  const handleClickShowPassword = ()=>setShowPassword((show)=>!show)

  const handleClickShowRePassword = ()=>setShowRePassword((show)=>!show)


  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      location.replace('/');
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <AuthLayout title='Profile Pengguna'>
      <div className="flex justify-between gap-3 mt-12 items-center px-4">
        <Typography variant="h4" className="!font-quicksand !font-semibold">Profile Pengguna</Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full mt-10 px-4 md:pl-10 md:pr-6">
          <div className="flex flex-col gap-5 w-full">
            <FormInput inputlabel="Nama" type="text" name="name" value={form.name} onChange={handleChange} required disabled={isSubmit} />
            <FormInput inputlabel="Nomor Identitas" type="text" name="id_number" value={form.id_number} onChange={handleChange} disabled={isSubmit} />
            <FormInput inputlabel="Alamat" type="text" multiline rows={2} name="address" value={form.address} onChange={handleChange} disabled={isSubmit} />
            <FormInput inputlabel="Nomor Whatsapp" type="tel" name="wa_number" value={form.wa_number} onChange={handleChange} disabled={isSubmit} />
            <FormInput inputlabel="Email" type="email" name="email" value={form.email} onChange={handleChange} required disabled={isSubmit} />
            <div className="text-xl font-semibold mt-6 md:hidden flex">Ganti Password</div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-10">
              <InputLabel className="w-full md:w-3/12" >Password</InputLabel>
              <span className="hidden md:flex ml-1 -mr-6">:</span>

              <FormControl className="w-full "  variant="outlined" color='secondary' disabled={isSubmit}   required sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        
                      }}
                      
                      >

                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name='password' value={form.password} onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-10">
              <InputLabel className="w-full md:w-3/12">Ulangi Password 
              </InputLabel>
              <span className="hidden md:flex ml-1 -mr-6">:</span>

              <FormControl className="w-full "  variant="outlined" color='secondary' disabled={isSubmit}   required sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        
                      }}
                      
                      >

                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showRePassword ? 'text' : 'password'}
                        name="confirm_password" value={form.confirm_password} onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowRePassword}
                              edge="end"
                            >
                              {showRePassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
            </div>
            {/* <FormInput inputlabel="Password" type="password" name="password" value={form.password} onChange={handleChange} disabled={isSubmit} /> */}
            {/* <FormInput inputlabel="Ulang Password" type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} disabled={isSubmit} /> */}
            <div className="flex justify-between">
              <GButton type="button" color="error" onClick={logout}>Logout</GButton>
              <GButton type="submit" color="success" disabled={isSubmit}>Simpan</GButton>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Profile
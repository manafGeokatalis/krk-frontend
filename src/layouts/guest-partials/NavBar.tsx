import { Button, Typography } from '@mui/material';
import logo from '../../assets/logo.png';

function NavBar() {
  return (
    <div className="px-24 py-4 bg-gdarkgray-500 text-white flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <img src={logo} alt="logo" style={{ width: '50px', height: 'auto' }} />
        <Typography variant='h3' className='!text-lg !leading-tight !font-quicksand'>Dinas Cipta Karya, Tata Ruang, Perumahan dan Kawasan Permukiman<br />Kabupaten Manggarai Barat</Typography>
      </div>
      <div className="flex gap-3 items-center">
        <Button variant='text' className='!capitalize !text-white !font-quicksand'>Informasi</Button>
        <Button variant='text' className='!capitalize !text-white !font-quicksand'>Dashboard</Button>
      </div>
    </div>
  )
}

export default NavBar
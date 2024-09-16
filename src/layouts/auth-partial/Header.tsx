import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import { AccountCircle } from '@mui/icons-material';

function Header(){
    return (
        <>
            <div className="p-4 bg-gdarkgray-500 md:hidden flex  justify-between items-center">
            <Link to={'/'}>
                <div className="flex gap-4 items-center">
                <img src={logo} alt="logo" style={{ width: '40px', height: 'auto' }} />
                <Typography variant='h3' className='!text-sm flex md:hidden !leading-tight !font-quicksand'>Pemerintah Kabupaten <br/> Manggarai Barat</Typography>
                </div>
            </Link>
            <div>
            <Link to={'/profile'}>
                <AccountCircle />
            </Link>
            </div>
            </div>
        </>
    )
}

export default Header
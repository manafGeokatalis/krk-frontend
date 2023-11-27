import { Button, ButtonProps } from '@mui/material';

function GButton(props: ButtonProps) {
  return (
    <Button className='!rounded-full !px-5 !drop-shadow !capitalize !font-quicksand !py-0.5' variant='contained' {...props}></Button>
  )
}

export default GButton;
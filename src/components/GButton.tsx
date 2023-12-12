import { Button, ButtonProps } from '@mui/material';

function GButton(props: ButtonProps) {
  return (
    <Button {...props} className={'!rounded-full !px-5 !drop-shadow !capitalize !font-quicksand !py-1 !text-base ' + (props.className)} variant='contained'>{props.children}</Button>
  )
}

export default GButton;
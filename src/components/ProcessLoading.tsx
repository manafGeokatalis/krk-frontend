import { Backdrop, CircularProgress, CircularProgressProps } from '@mui/material';
import type { FC } from 'react';
import { useState, useEffect } from 'react';

interface ProcessLoadingProps {
  show: boolean;
  color?: string;
  circularColor?: CircularProgressProps['color'];
}

const ProcessLoading: FC<ProcessLoadingProps> = ({ show = false, color = '#e4e4e4', circularColor = 'primary' }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop
      sx={{ backgroundColor: color, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color={circularColor} />
    </Backdrop>
  );
}

export default ProcessLoading;

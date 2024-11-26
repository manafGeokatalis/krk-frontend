import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress } from '@mui/material';
import GButton from './GButton';

interface ConfirmDialogProps {
  show: boolean;
  title?: string | null;
  message?: string | TrustedHTML;
  acceptLable?: string;
  rejectLable?: string;
  color?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ show = false, title = "Konfirmasi", message = '', color = 'primary', acceptLable = "Ya", rejectLable = "Tidak", onClose, onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setOpen(show);
    setLoading(false);
  }, [show]);

  const handleSubmit = () => {
    setLoading(true);
    onSubmit();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogContent className='!bg-gdarkgray-700 rounded-xl !flex !flex-col !gap-5 !p-10'>
          <DialogTitle variant='h4' className='!font-quicksand !p-0 !text-xl md:!text-3xl' align='center'>
            {title}
          </DialogTitle>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
          <DialogActions className='!flex gap-4 md:!gap-10 !justify-center !flex-col md:!flex-row'>
            {rejectLable != '' &&
              <GButton className='w-full md:w-auto' variant='contained' color='secondary' onClick={onClose} autoFocus>{rejectLable}</GButton>
            }
            {acceptLable != '' &&
              <Box sx={{ position: 'relative' }}>
                {color == 'primary' ?
                  <>
                    <GButton className='w-full md:w-auto' variant='contained' color='primary' onClick={handleSubmit} disabled={loading}>
                      {acceptLable}
                    </GButton>
                    {loading && <CircularProgress
                      size={24}
                      color='primary'
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />}
                  </>
                  :
                  <>
                    <GButton variant='contained' color='error' onClick={handleSubmit} disabled={loading}>
                      {acceptLable}
                    </GButton>
                    {loading && <CircularProgress
                      size={24}
                      color='error'
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />}
                  </>
                }
              </Box>
            }
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;
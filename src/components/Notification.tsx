import { Alert, Snackbar } from '@mui/material';
import type { FC } from 'react';
import { useRecoilState } from 'recoil';
import { notification } from '../utils/Recoils';

interface NotificationProps { }

const Notification: FC<NotificationProps> = () => {
  const [notif, setNotif] = useRecoilState(notification);
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={notif.show}
      autoHideDuration={5000}
      onClose={() => {
        setNotif({ ...notif, show: false });
      }}>
      {notif.type === 'success' ?
        <Alert onClose={() => {
          setNotif({ ...notif, show: false });
        }} severity="success" sx={{ width: '100%' }}>
          {notif.message}
        </Alert> : (notif.type === 'warning' ?
          <Alert onClose={() => {
            setNotif({ ...notif, show: false });
          }} severity="warning" sx={{ width: '100%' }}>
            {notif.message}
          </Alert> : <Alert onClose={() => {
            setNotif({ ...notif, show: false });
          }} severity="error" sx={{ width: '100%' }}>
            {notif.message}
          </Alert>)
      }
    </Snackbar>
  );
}

export default Notification;

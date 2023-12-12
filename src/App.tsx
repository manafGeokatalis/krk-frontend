import axios from 'axios';
import GuestRoutes from './routes/GuestRoutes'
import { useRecoilState } from 'recoil';
import { user } from './utils/Recoils';
import { useEffect, useState } from 'react';
import ProcessLoading from './components/ProcessLoading';
import AuthRoutes from './routes/AuthRoute';
import VerificationRoute from './routes/VerificationRoute';

function App() {
  const [userData, setUser] = useRecoilState<any>(user);
  const [loading, setLoading] = useState(true);
  const [verification, setVerification] = useState(true);

  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = async () => {
    try {
      const res = await axios.get('/auth/status');
      setUser(res?.data?.data);
      setLoading(false);
      setVerification(false);
    } catch (error: any) {
      setUser(null);
      setLoading(false);
      if (error?.response?.data?.message?.status === 'email_not_verified') {
        setUser(error?.response?.data?.message?.user);
        setVerification(true);
      } else {
        setVerification(false);
      }
    }
  }

  return (
    loading ? <ProcessLoading show={true} />
      : verification ? <VerificationRoute /> : !userData?.role ?
        <GuestRoutes />
        : <AuthRoutes />
  )
}

export default App

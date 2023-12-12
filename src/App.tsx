import axios from 'axios';
import GuestRoutes from './routes/GuestRoutes'
import { useRecoilState } from 'recoil';
import { user } from './utils/Recoils';
import { useEffect, useState } from 'react';
import ProcessLoading from './components/ProcessLoading';
import AuthRoutes from './routes/AuthRoute';

function App() {
  const [userData, setUser] = useRecoilState<any>(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = async () => {
    try {
      const res = await axios.get('/auth/status');
      setUser(res?.data?.data);
      setLoading(false);
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
  }

  return (
    loading ? <ProcessLoading show={true} />
      : !userData?.role ?
        <GuestRoutes />
        : <AuthRoutes />
  )
}

export default App

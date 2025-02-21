import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Permohonan from "../pages/public/Permohonan"
import HomePage from "../pages/homepage/Index"
import PetunjukPermohonan from "../pages/public/PetunjukPermohonan"
import Form from "../pages/public/form-permohonan/Form"
import StatusPermohonan from "../pages/public/StatusPermohonan"
import StatusPermohonanAdmin from "../pages/admin/StatusPermohonan"
import { useRecoilValue } from "recoil"
import { user } from "../utils/Recoils"
import PermohonanAdmin from "../pages/admin/Pemohonan"
import Profile from "../pages/Profile"
import UsersList from '../pages/admin/users/List';
import UserForm from "../pages/admin/users/Form"
import TentangKRK from "../pages/TentangKRK"
import Statistik from "../pages/admin/statistik/Statistik"
// import TentangTataRuang from "../pages/TentangTataRuang"
import PermohonanDitolak from "../pages/admin/PermohonanDitolak"
import DownloadPermohonan from "../pages/admin/DownloadPermohonan"
import FormPermohonan from "../pages/admin/permohonan/ForrmPermohonan"
function AuthRoutes() {
  const userData: any = useRecoilValue(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={userData.role !== 'PUBLIC' ? <UsersList /> : <Navigate to={'/'} />} />
        <Route path="/users/tambah" element={userData.role !== 'PUBLIC' ? <UserForm /> : <Navigate to={'/'} />} />
        <Route path="/users/:uuid" element={userData.role !== 'PUBLIC' ? <UserForm /> : <Navigate to={'/'} />} />
        <Route path="/permohonan" element={userData.role === 'PUBLIC' ? <Permohonan /> : <PermohonanAdmin />} />
        <Route path="/permohonan/petunjuk" element={<PetunjukPermohonan title="Daftarkan Permohonan KRK Anda" />} />
        <Route path="/petunjuk-permohonan" element={<PetunjukPermohonan />} />
        <Route path="/permohonan/tambah" element={<Form />} />
        <Route path="/permohonan/:uuid" element={userData.role === 'PUBLIC' ? <StatusPermohonan /> : <StatusPermohonanAdmin />} />
        <Route path="/permohonan/download/:uuid" element={userData.role === 'PUBLIC' ? <StatusPermohonan /> : <DownloadPermohonan />} />
        <Route path="/form-permohonan/:uuid" element={userData.role !== 'PUBLIC' ? <FormPermohonan /> : <Navigate to={'/'} />} />
        <Route path="/permohonan/:uuid/edit" element={<Form />} />
        <Route path="/permohonan/ditolak/:uuid" element={<PermohonanDitolak />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pantau" element={<Navigate to={'/permohonan'} />} />
        <Route path="/tentang-krk" element={<TentangKRK />} />
        <Route path="/statistik" element={<Statistik />} />
        {/* <Route path="/tentang-tataruang" element={<TentangTataRuang />} /> */}
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AuthRoutes
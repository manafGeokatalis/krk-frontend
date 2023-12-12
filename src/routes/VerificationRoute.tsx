import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "../pages/homepage/Index"
import PetunjukPermohonan from "../pages/public/PetunjukPermohonan"
import TentangKRK from "../pages/TentangKRK"
import TentangTataRuang from "../pages/TentangTataRuang"
import EmailVerification from "../pages/homepage/EmailVerification"

function VerificationRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Navigate to={'/email-verification'} />} />
        <Route path="/users/tambah" element={<Navigate to={'/email-verification'} />} />
        <Route path="/users/:uuid" element={<Navigate to={'/email-verification'} />} />
        <Route path="/permohonan" element={<Navigate to={'/email-verification'} />} />
        <Route path="/permohonan/petunjuk" element={<Navigate to={'/email-verification'} />} />
        <Route path="/petunjuk-permohonan" element={<PetunjukPermohonan />} />
        <Route path="/permohonan/tambah" element={<Navigate to={'/email-verification'} />} />
        <Route path="/permohonan/:uuid" element={<Navigate to={'/email-verification'} />} />
        <Route path="/permohonan/:uuid/edit" element={<Navigate to={'/email-verification'} />} />
        <Route path="/profile" element={<Navigate to={'/email-verification'} />} />
        <Route path="/pantau" element={<Navigate to={'/permohonan'} />} />
        <Route path="/tentang-krk" element={<TentangKRK />} />
        <Route path="/tentang-tataruang" element={<TentangTataRuang />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default VerificationRoute
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "../pages/homepage/Index"
import Register from "../pages/homepage/Register"
import PantauPermohonan from "../pages/public/PantauPermohonan"
import PetunjukPermohonan from "../pages/public/PetunjukPermohonan"
import StatusPermohonanGuest from "../pages/public/StatusPermohonanGuest"
import TentangKRK from "../pages/TentangKRK"
import TentangTataRuang from "../pages/TentangTataRuang"
import ForgotPassword from "../pages/homepage/ForgotPassword"
import ResetPassword from "../pages/homepage/ResetPassword"

function GuestRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pantau" element={<PantauPermohonan />} />
        <Route path="/petunjuk-permohonan" element={<PetunjukPermohonan />} />
        <Route path="/pantau/:uuid" element={<StatusPermohonanGuest />} />
        <Route path="/tentang-krk" element={<TentangKRK />} />
        <Route path="/tentang-tataruang" element={<TentangTataRuang />} />
        <Route path="/lupa-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default GuestRoutes
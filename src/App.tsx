import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import NurseDashboard from './pages/NurseDashboard'
import CaregiverDashboard from './pages/CaregiverDashboard'
import LanguageSwitcher from './components/LanguageSwitcher'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12 }}>
        <LanguageSwitcher />
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/nurse" element={<NurseDashboard />} />
        <Route path="/caregiver" element={<CaregiverDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

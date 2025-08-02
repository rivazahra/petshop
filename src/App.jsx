import './App.css'
import LoginForm from './components/login/LoginForm'
import { BrowserRouter as Router, Routes, Route, Navigate, redirect } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import AddPatient from './pages/AddPatient'
import SearchPatient from './pages/SearchPatient'
import MedicalRecords from './pages/MedicalRecords'
import { useEffect } from 'react'
import { supabase } from './utils/supabase/client'

function App() {
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return redirect('/login')
      }
    }
    checkUser()
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/search-patient" element={<SearchPatient />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

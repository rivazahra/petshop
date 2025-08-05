import './App.css'
import LoginForm from './components/login/LoginForm'
import {  Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import AddPatient from './pages/AddPatient'
import SearchPatient from './pages/SearchPatient'
import MedicalRecords from './pages/MedicalRecords'
import { useEffect } from 'react'
import {  supabase } from './utils/supabase/client'
import { Logout } from './utils/authService'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () =>{
      const {data:{session}} = await supabase.auth.getSession()

      if(!session && location.pathname !== '/login'){
        navigate('/login')
      }
    }
    checkSession()

    const {data:{subscription}} = supabase.auth.onAuthStateChange((event)=>{
      if(event === "SIGNED_OUT"){
          navigate('/login')
      }
      // if(event === 'SIGNED_IN'){
      //   navigate('/dashboard')
      // }
    })

    return () =>subscription.unsubscribe()
  },[navigate,location.pathname])

 
  return (
    <>  <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to='/dashboard' replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/search-patient" element={<SearchPatient />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
          </Route>
        </Routes>
      </>
  )
}

export default App

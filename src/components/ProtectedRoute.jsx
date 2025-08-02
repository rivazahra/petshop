import React, { useEffect, useState } from 'react'
// import { useAuth } from '../context/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase/client'

const ProtectedRoute = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const navigate = useNavigate()

useEffect(() =>{
  const checkUser = async ()=>{
    const {data:{user}} = await supabase.auth.getUser()
    if (!user){
      navigate('/login')
      localStorage.clear()
      sessionStorage.clear()
    }else{
      setIsAuthenticated(isAuthenticated)
    }
  }
checkUser()
},[])

return children
  // const {isAuthenticated, loading} = useAuth()
  
  // if(loading){
  //   return (
  //      <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  //     </div>
  //   )
  // }
  
  // // ✅ Return statement harus di dalam function
  // return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
import React, { Children, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

const Layout = () => {
  const [ collapsed, setIsCollapsed] = useState(false)
  const handleClick  = ()=>{
    setIsCollapsed(!collapsed)
    console.log(
      'klik'
    );
    
  }
  return (
    <ProtectedRoute>
      <div className="flex bg-[#F5F7FA] ">
        <Sidebar collapsed={collapsed} onToogle={
       handleClick
        } />
        <main className={`flex-1 transition-all duration-300 min-h-screen  ${collapsed ? 'ml-12' : 'ml-72'}   overflow-y-auto`}>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default Layout

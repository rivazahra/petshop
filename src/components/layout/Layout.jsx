import React, { Children, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

const Layout = () => {
  const [ collapsed, setIsCollapsed] = useState(false)
  const handleClick  = ()=>{
    setIsCollapsed(!collapsed)
  }
  return (
    <ProtectedRoute>
      <div className="flex bg-[#F5F7FA] ">
        <Sidebar collapsed={collapsed} setCollapse={setIsCollapsed} onToogle={
       handleClick
        } />
        <main className={`flex-1 ml-12 transition-all duration-300 min-h-screen ${collapsed ? 'md:ml-12' : 'md:ml-72'}   overflow-y-auto`}>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default Layout

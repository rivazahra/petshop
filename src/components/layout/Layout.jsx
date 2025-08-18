import React, { Children, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

const Layout = () => {
  const [ collapsed, setIsCollapsed] = useState(false)
  const handleClick  = ()=>{
    setIsCollapsed(!collapsed)
  }
  const handleNavClick = () => {
  // Auto collapse di mobile saat klik nav item
  if (window.innerWidth < 650) {
    setIsCollapsed(!collapsed)
  }
}
  return (
    <ProtectedRoute>

      <div className="flex h-screen bg-[#F5F7FA]">
        <Sidebar collapsed={collapsed} setCollapse={setIsCollapsed} onTogle={
          handleClick
        } />
        <main className={`flex-1 main-content transition-all duration-300 min-h-screen  overflow-y-auto $${!collapsed ? 'max-sm:opacity-0 max-sm:pointer-events-none' : ''}`}>
          <Outlet />
        </main>
      </div>
          </ProtectedRoute>
  )
}

export default Layout

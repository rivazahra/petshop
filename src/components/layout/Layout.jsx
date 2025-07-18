import React, { Children } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'

const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="flex bg-[#F5F7FA]">
        <Sidebar />
        <main className="flex-1 p-6  min-h-screen  overflow-y-auto">
          <Outlet />

        </main>
      </div>
    </ProtectedRoute>
  )
}

export default Layout

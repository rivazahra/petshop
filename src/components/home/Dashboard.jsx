import React from 'react'
import { useAuth } from '../../context/AuthProvider'

const Dashboard = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome, {user?.name}!</h2>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

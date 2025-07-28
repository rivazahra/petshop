import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    if (error) setError('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      setError(error.message || 'Login failed. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-5 m-auto my-auto">
      <div className="bg-blue-100 w-1/2 max-w-md p-8 rounded-lg shadow-lg items-center">
        <div className="text-center">
          <span className="pet-icon">🐱🐶</span>
          <h1 className="text-2xl font-bold text-blue-600">Welcome back Admin!</h1>
        </div>
        <form id='login-form' action="" onSubmit={handleSubmit} className="space-y-6">
          <div className="my-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" name="email" value={formData.email} placeholder="Input your email" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              placeholder="Input your password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors" disabled={loading}>
            {loading ? 'Logging in....' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm

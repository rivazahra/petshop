import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import { login } from '../../utils/authService'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: 'rivazahra23@gmail.com',
    password: 'admin123',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // const { login } = useAuth()
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
    <div className="min-h-screen gap-5 color-[#2c3e50] w-full flex flex-col justify-center items-center  ">
      <div className="w-full  max-w-md min-w-[24rem] bg-white rounded-lg shadow-md p-6 md:p-10">
        <div className="text-center">
          <span className="pet-icon">🐱🐶</span>
          <h1 className="text-2xl font-bold text-[#2c3e50]">Welcome back Admin!</h1>
        </div>
        <form id='login-form' onSubmit={handleSubmit} className="space-y-6">
          <div className="my-4 w-full space-y-5">
            <Input onChange={handleChange} id={'email'} label={'Email'} type='email'
              defaultValue='rivazahra23@gmail.com' placeholder='rivazahra23@gmail.com' required />
            <Input onChange={handleChange} id={'password'} label={'Password'} type='password'
              defaultValue="admin123" placeholder='admin123' required />
          </div>

          <button type='submit'
            className="font-semibold w-full cursor-pointer bg-[#4e6b88] text-white py-3 rounded-md hover:bg-[#2c3e50] transition-colors"
            disabled={loading}>
            {loading ? 'Logging in....' : 'Login'}
          </button>
          {error && (
            <div className='text-red-700 font-semibold'>
          | {error}
          </div>
          )}

        </form>
      </div>
    </div>
  )
}

export default LoginForm

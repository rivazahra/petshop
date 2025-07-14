import React from 'react'

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center p-5 m-auto my-auto">
      <div className="bg-blue-100 w-1/2 max-w-md p-8 rounded-lg shadow-lg items-center">
      <div className="text-center">
        <span class="pet-icon">🐱🐶</span>
        <h1 className='text-2xl font-bold text-blue-600'>Welcome back Admin!</h1>
      </div>
        <form action="">
          <div className="my-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" placeholder="Input your email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input type="password" placeholder="Input your password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login

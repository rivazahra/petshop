import { Children, createContext, useContext, useEffect, useState } from 'react'
import {authService} from '../services/authServices'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken')

      if (token) {
        const isValid = await authService.validateToken(token)
        if (isValid) {
          const userData = JSON.parse(localStorage.getItem('userData'))
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
        }
      }
    } catch (error) {
      console.log('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)

      localStorage.setItem('authToken', response.token)
      localStorage.setItem('userData', JSON.stringify(response.user))

      setUser(response.user)
      setIsAuthenticated(true)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()

      // Clear storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')

      setUser(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
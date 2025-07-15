import './App.css'
import LoginForm from './components/login/LoginForm'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/home/Dashboard'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App


import { useAppSelector } from '../../store/hooks/hooks'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const AuthRoutes = () => {

  const { status } = useAppSelector(state => state.auth)
  if (status === 'authenticated') return <Navigate to='/home' />

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { MenuPage } from '../pages/MenuPage'
import { PaymentPage } from '../pages/PaymentPage'
import { ProductPage } from '../pages/ProductPage'
import { TracingPage } from '../pages/TracingPage'
import { ProfilePage } from '../pages/ProfilePage'
import { AboutPage } from '../pages/AboutPage'
import { VerifyAccountPage } from '../pages/VerifyAccountPage'
import { OrdersPage } from '../pages/OrdersPage'


export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="about" element={<AboutPage /> } />
      <Route path="menu" element={<MenuPage />} />
      <Route path="product/:_id" element={<ProductPage />} />
      <Route path="payment" element={<PaymentPage />} />
      <Route path="tracing" element={<TracingPage /> } />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="verify" element={<VerifyAccountPage />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  )
}
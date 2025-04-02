
import './App.scss'
import { Routes, Route } from 'react-router'
import AuthPage from './pages/auth/index';
import DetailPage from './pages/details';
import DashboardPage from './pages/dashboard/index';
import NotFoundPage from './pages/not-found';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/home/Home';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='auth' element={<AuthPage />}>
          <Route index element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='forgotPassword' element={<ForgotPassword />}></Route>
      </Route>

      <Route path='detail' element={<DetailPage />} />
      <Route path='dashboard' element={<DashboardPage />} />
      <Route path='not-found' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App

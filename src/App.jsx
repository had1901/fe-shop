
import './App.scss'
import { Routes, Route } from 'react-router'
import AuthPage from './pages/auth/index';
import DetailPage from './pages/details';
import DashboardPage from './pages/dashboard/index';
import NotFoundPage from './pages/not-found';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import MainLayout from './layouts/mainLayout/MainLayout';
import HomePage from './pages/home/Home';
import SellerHome from './pages/seller/SellerHome';
import { menuItems } from './layouts/sidebar/_sidebarMenu';





function App() {

  const render = (arr) => {
    if(arr.length > 0) {
      return arr.map((item, index) => (
        <Route key={item.id || index} path={item.href !== '' ? item.href : ''} element={item.component}/>
      ))  
    }
    return null
  }

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='detail' element={<DetailPage />} />
        <Route path='dashboard' element={<DashboardPage />} />

        <Route path='pages' element={<SellerHome />} >
          {render(menuItems)}
        </Route>



        <Route path='auth' element={<AuthPage />}>
            <Route index element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='forgotPassword' element={<ForgotPassword />}></Route>
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

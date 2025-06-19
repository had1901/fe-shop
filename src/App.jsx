
import './App.scss'
import { Routes, Route } from 'react-router'
import AuthPage from './pages/auth/index';
import DetailProductPage from './pages/details/DetailProduct';
import DashboardPage from './pages/dashboard/index';
import NotFoundPage from './pages/not-found';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import MainLayout from './layouts/mainLayout/MainLayout';
import HomePage from './pages/home/Home';
import SellerHome from './pages/seller/SellerHome';
import { menuItems } from './layouts/sidebar/_sidebarMenu';
import { Bounce, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import axiosApi from './services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/auth/authSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthPrivateRoute from './components/PrivateRoute/AuthPrivateRoute';
import Account from './pages/auth/Account';
import CartPage from './pages/cart/CartPage';
import Payment from './pages/payment/Payment';



function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(state => state.auth.info)

  const render = (arr) => {
    if(arr.length > 0) {
      return arr.map((item, index) => (
        <Route key={item.id || index} path={item.href !== '' ? item.href : ''} element={item.component}/>
      ))  
    }
    return null
  }

  useEffect(() => {
    (async () => {
        setIsLoading(true)
        try{
          const profile = await axiosApi.get('auth/profile')
          
          if(profile.data.ec === 0) {
            dispatch(setUser(profile.dt))
            setIsLoading(false)
          }
        } catch(e) {
          if(!e.response?.data?.hasAccessToken) {
            try{
              await axiosApi.post('auth/refresh-token')
              const profile = await axiosApi.get("auth/profile")
              if (profile.ec === 0) {
                dispatch(setUser(profile.dt))
              }
            } catch(e) {
              throw new Error(e)
            }
          }
          // console.log('error', e)

        } finally {
          setIsLoading(false)
        }
    })()
    
  },[dispatch])

  if(isLoading) return (
    <>
      <Flex align="center" gap="middle">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </Flex>
    </>
  )
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route element={<PrivateRoute allowRole={['admin']} />}>
              <Route path='detail' element={<DetailProductPage />} />
          </Route> */}
          <Route path='products/:slug' element={<DetailProductPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='payment/vnpay-return' element={<Payment />} />
  
          <Route path='pages' element={<SellerHome />} >
            {render(menuItems)}
          </Route>
  
  
          {/* <Route element={<AuthPrivateRoute />}> */}
            <Route path='auth' element={<AuthPage />}>
                <Route index element={<Login />}></Route>
                <Route path='register' element={<Register />}></Route>
                <Route path='forgotPassword' element={<ForgotPassword />}></Route>
            </Route>
          {/* </Route> */}

          {/* Private route */}
          <Route element={<AuthPrivateRoute />}> 
            <Route path='auth/account' element={<Account />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        bodyClassName='toast'
      />
    </>
  )

}

export default App

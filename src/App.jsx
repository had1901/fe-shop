
import './App.scss'
import { Routes, Route, useNavigate } from 'react-router'
import AuthPage from './pages/auth/index';
import DetailProductPage from './pages/details/DetailProduct';
import DashboardPage from './pages/admin/dashboard/Dashboard';
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
import { setCarts } from './store/cart/cartSlice';
import OrderPage from './pages/order/OrderPage';
import Seller from './components/seller/Seller';
import LayoutAdmin from './pages/admin/LayoutAdmin';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ProductAdmin from './pages/admin/products/ProductAdmin';
import ProductEdit from './pages/admin/products/ProductEdit';


const menuAdmin = [
  {
      path: '',
      component: <Dashboard category='keyboard' />,
  },
  {
      path: '',
      component: <Seller category='pc' />,
  },
  {
      path: 'products',
      component: <ProductAdmin  />,
  },
  {
      path: 'products/edit/:id',
      component: <ProductEdit  />,
  },
  {
      path: 'categories',
      component: <Seller category='laptop' />,
  },
  {
      path: 'brands',
      component: <Seller category='pc' />,
  },
  {
      path: 'orders',
      component: <Seller category='pc' />,
  },
  {
      path: 'accounts',
      component: <Seller category='pc' />,
  },
  {
      path: 'promotion',
      component: <Seller category='pc' />,
  },
  {
      path: 'feedback',
      component: <Seller category='pc' />,
  },
  {
      path: 'analytics',
      component: <Seller category='pc' />,
  },
  {
      path: 'setting',
      component: <Seller category='pc' />,
  },
]

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

        } finally {
          setIsLoading(false)
        }
    })()
    
  },[dispatch])

  // useEffect(() => {
  //   if(user.Role.name === 'admin') navigate('/auth/admin')
  // },[user, navigate])

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
          <Route path='product/:id/:slug' element={<DetailProductPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='payment/vnpay-return' element={<Payment />} />
          <Route path='order' element={<OrderPage />} />
            
          <Route path='pages' element={<SellerHome />} >
            {render(menuItems)}
          </Route>

          {/* Private route Auth */}
          <Route element={<AuthPrivateRoute />}>
            <Route path='auth' element={<AuthPage />}>
                <Route index element={<Login />}></Route>
                <Route path='register' element={<Register />}></Route>
                <Route path='forgotPassword' element={<ForgotPassword />}></Route>
            </Route>
          </Route>

          
          <Route element={<AuthPrivateRoute />}> 
            <Route path='auth/account' element={<Account />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>

        <Route element={<AuthPrivateRoute />}>
          <Route path='/auth/admin' element={<LayoutAdmin />}>
            {menuAdmin.map(route => (
              <Route path={route.path} element={route.component} />
            ))}
          </Route>
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

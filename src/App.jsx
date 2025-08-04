
import './App.scss'
import { Routes, Route, useLocation } from 'react-router'
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
import { Bounce, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import axiosApi from './services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/auth/authSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, message, Spin } from 'antd';
import AuthPrivateRoute from './components/PrivateRoute/AuthPrivateRoute';
import Account from './pages/auth/Account';
import CartPage from './pages/cart/CartPage';
import Payment from './pages/payment/Payment';
import OrderPage from './pages/order/OrderPage';
import Seller from './components/seller/Seller';
import LayoutAdmin from './pages/admin/LayoutAdmin';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ProductAdmin from './pages/admin/products/ProductAdmin';
import ProductEdit from './pages/admin/products/ProductEdit';
import AccountAdmin from './pages/admin/account/AccountAdmin';
import OrderAdmin from './pages/admin/order/OrderAdmin';
import Setting from './pages/admin/setting/Setting';
import Slideshow from './pages/admin/interface/Slideshow';
import Banner from './pages/admin/interface/Banner';
import Categories from './pages/admin/categories/Categories';
import AddressPage from './pages/address/AddressPage';
import { menuItems } from './components/sidebar/_sidebarMenu';
import viVN from 'antd/locale/vi_VN';

console.log("mode", import.meta.env.MODE)
console.log("API URL:", import.meta.env.VITE_API_URL)

const mode = import.meta.env.MODE
const routesAdmin = [
  {
      path: '',
      component: <Dashboard category='keyboard' />,
  },
  // {
  //     path: '',
  //     component: <Seller category='pc' />,
  // },
  {
      path: 'products',
      component: <ProductAdmin  />,
  },
  {
      path: 'products/edit/:id',
      component: <ProductEdit title='Chỉnh sửa thông tin sản phẩm' mode='edit' />,
  },
  {
      path: 'products/add-new-product',
      component: <ProductEdit  title='Thêm mới sản phẩm' mode='create'/>,
  },
  {
      path: 'categories',
      component: <Categories />,
  },
  {
      path: 'banners',
      component: <Banner />,
  },
  {
      path: 'slideshow',
      component: <Slideshow />,
  },
  {
      path: 'brands',
      component: <Seller category='pc' />,
  },
  {
      path: 'orders',
      component: <OrderAdmin />,
  },
  {
      path: 'accounts',
      component: <AccountAdmin />,
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
      component: <Setting />,
  },
]

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { pathname } = useLocation()
  const theme = useSelector(state => state.theme)
  const [messageApi, contextHolder] = message.useMessage()
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

  useEffect(() => {
    if(user){
        messageApi.destroy()
        messageApi.open({ type: 'success', content: 'Đăng nhập thành công', duration: 4 })
    }
  },[user, messageApi])

  useEffect(() => {
      window.scrollTo({top: 0, behavior: "smooth"})
  },[pathname])

  if(isLoading && mode === 'production') {
    return (
      <div className='app-vn'>
        <p>Do <strong>server</strong> sử dụng dịch vụ miễn phí nên sẽ tạm thời đóng băng khi không truy cập
          <br/> Vui lòng đợi server khởi động lại và nhấn F5 để tải lại trang 
          <br/> Xem video giải trí trong khi đợi nhé (^_^)
        </p>
        <iframe 
          className='video-yt'
          src="https://www.youtube.com/embed/ZD3ZaytFKiU" 
          title="Po Vs Tai Lung Final Battle | Kung Fu Panda" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen>
        </iframe>
      </div>
    )
  }
  
  if(isLoading && mode === 'development') {
     return (
      <div className='app-vn'>
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      </div>
    )
  }

  return (
    <ConfigProvider 
      theme={{
        token: {
          colorPrimary: '#1677ff',
          colorTextBase: theme.color,
          colorBgBase: theme.background
        },
      }}
    >
      {contextHolder}
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='product/:id/:slug' element={<DetailProductPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='payment/vnpay-return' element={<Payment />} />
          <Route path='order' element={<OrderPage />} />
          <Route path='address' element={<AddressPage />} />
            
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
            {routesAdmin.map((route, i) => (
              <Route key={i} path={route.path} element={route.component} />
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
    </ConfigProvider>
  )

}

export default App

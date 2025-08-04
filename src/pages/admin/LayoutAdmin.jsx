import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import styles from './LayoutAdmin.module.scss'
import logoHeader from '~/assets/logo/logo-gearvn.svg'
import logoMobile from '~/assets/logo/logo-mobile.svg'

import {
    BarChartOutlined,
    BellOutlined,
    CommentOutlined,
    GatewayOutlined,
    HomeOutlined,
    MoonOutlined,
    OrderedListOutlined,
    ProductOutlined,
    RiseOutlined,
    SafetyOutlined,
    SettingOutlined,
    SunOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    UserOutlined,
  } from '@ant-design/icons'
import { Avatar, Badge, Breadcrumb, ConfigProvider, Layout, Menu, Segmented, Space } from 'antd'
import useStyles from '../../hooks/useStyles'
import Seller from '../../components/seller/Seller'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../store/admin/adminSlice'
import { setDarkMode, setLightMode } from '../../store/theme/themeSlice'


  const { Header, Content, Footer, Sider } = Layout

  function configMenuItem(label, key, icon, children) {
    return { label, key, icon, children }
  }

  
  const breadcrumbMap = {
    auth: 'Trang chủ',
    admin: 'Quản trị viên',
    orders: 'Đơn hàng',
    accounts: 'Tài khoản',
    products: 'Sản phẩm',
    edit: 'Chỉnh sửa',
    'add-new-product': 'Tạo mới',

  }

function LayoutAdmin() {
    const cs = useStyles(styles)
    const [collapsed, setCollapsed] = useState(false)
    const [size, setSize] = useState('middle')
    const dispatch = useDispatch()
    const location = useLocation()
    
    console.log(location.pathname.split('/').filter(item => item))
    const pathname = location.pathname.split('/').filter(item => item)
    const breadcrumbList = pathname.map(item => {
      return { title: breadcrumbMap[item] }
    })
    console.log(breadcrumbList)
    
    // const breadcrumbList = [
    //     { title: 'Admin' }, 
    //     { title: 'Bill' }
    // ]
    const themeRedux = useSelector(state => state.admin.theme)
  
    const handleChangeTheme = (value) => {
      if(value === 'dark'){
        dispatch(setDarkMode())
      } else if(value === 'light'){
        dispatch(setLightMode())
      }
    }

    const menuItems = [
        configMenuItem(<NavLink to={'/auth/admin'} >Trang chủ</NavLink>, '1', <HomeOutlined />),
        configMenuItem(<NavLink to={''} >Sản phẩm</NavLink>, '2', <ProductOutlined />, [
          configMenuItem(<NavLink to={'/auth/admin/products'} >Tất cả sản phẩm</NavLink>, '3'),
          configMenuItem(<NavLink to={'/auth/admin/categories'} >Danh mục</NavLink>, '4'),
          configMenuItem(<NavLink to={'/auth/admin/brands'} >Thương hiệu</NavLink>, '5'),
        ]),
        configMenuItem(<NavLink to={'/auth/admin/orders'} >Đơn hàng</NavLink>, '6', <OrderedListOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/accounts'} >Tài khoản</NavLink>, '7', <UserOutlined />),
        configMenuItem(<NavLink to={''} >Giao diện</NavLink>, '8', <ProductOutlined />, [
          configMenuItem(<NavLink to={'/auth/admin/banners'} >Banner</NavLink>, '9'),
          configMenuItem(<NavLink to={'/auth/admin/slideshow'} >Slideshow</NavLink>, '10'),
        ]),
        configMenuItem(<NavLink to={'/auth/admin/promotion'} >Khuyến mãi</NavLink>, '11', <ThunderboltOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/feedback'} >Đánh giá sản phẩm</NavLink>, '12', <CommentOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/analytics'} >Thống kê</NavLink>, '13', <BarChartOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/setting'} >'Cài đặt'</NavLink>, '14', <SettingOutlined />),
    ]

  return (
    // <ConfigProvider >
      <Layout style={{ minHeight: '100vh' }}>
          <Sider 
              className={cs('sidebar')}
              style={{ background: '#fff' }} 
              collapsible 
              collapsed={collapsed} 
              onCollapse={value => setCollapsed(value)} 
              breakpoint={{ xs:'480px', sm:'576px', md:'768px', lg:'992px', xl:'1200px', xxl:'1400px'}}
          >   
              <div className={cs('menu-sidebar')}>
                  <Link to={'/'} className={cs('logo')}>
                      <img loading='lazy' src={logoHeader} className={cs('logo-header')}/>
                      {/* <img loading='lazy' src={logoMobile} className={cs('logo-mobile')}/> */}
                  </Link>
                
                  <Menu className={cs('sidebar-main')} theme={themeRedux} defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
              </div>
          </Sider>
          <Layout>
              <Header className={cs('header')}>
                  <Segmented
                    size={size}
                    shape="round"
                    options={[
                      { value: 'light', icon: <SunOutlined /> },
                      { value: 'dark', icon: <MoonOutlined /> },
                    ]}
                    onChange={handleChangeTheme}
                  />
                  <Badge count={5} size='small' className={cs('dot-bell')}>
                      <BellOutlined className={cs('bell-notification')}/>
                  </Badge>
                  <Avatar size={34} icon={<UserOutlined />} className={cs('user-info')} />

              </Header>
              <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbList} />
                  <Outlet />
              </Content>
              <Footer style={{ textAlign: 'center' }}>GearVN ©{new Date().getFullYear()} HAD</Footer>
          </Layout>
      </Layout>
    // </ConfigProvider>
    
  )
}

export default LayoutAdmin
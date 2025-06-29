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
    OrderedListOutlined,
    ProductOutlined,
    RiseOutlined,
    SafetyOutlined,
    SettingOutlined,
    ThunderboltOutlined,
    ToolOutlined,
    UserOutlined,
  } from '@ant-design/icons'
import { Avatar, Badge, Breadcrumb, Layout, Menu, Space } from 'antd'
import useStyles from '../../hooks/useStyles'
import Seller from '../../components/seller/Seller'


  const { Header, Content, Footer, Sider } = Layout

  function configMenuItem(label, key, icon, children) {
    return { label, key, icon, children }
  }

  
  

function LayoutAdmin() {
    const cs = useStyles(styles)
    const [collapsed, setCollapsed] = useState(false)

    const breadcrumbList = [
        { title: 'User' }, 
        { title: 'Bill' }
    ]

    const menuItems = [
        configMenuItem(<NavLink to={'/auth/admin'} >Trang chủ</NavLink>, '1', <HomeOutlined />),
        configMenuItem(<NavLink to={''} >Sản phẩm</NavLink>, '2', <ProductOutlined />, [
          configMenuItem(<NavLink to={'/auth/admin/products'} >Tất cả sản phẩm</NavLink>, '3'),
          configMenuItem(<NavLink to={'/auth/admin/categories'} >Danh mục</NavLink>, '4'),
          configMenuItem(<NavLink to={'/auth/admin/brands'} >Thương hiệu</NavLink>, '5'),
        ]),
        configMenuItem(<NavLink to={'/auth/admin/orders'} >Đơn hàng</NavLink>, '6', <OrderedListOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/accounts'} >Tài khoản</NavLink>, '7', <UserOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/promotion'} >Khuyến mãi</NavLink>, '8', <ThunderboltOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/feedback'} >Đánh giá sản phẩm</NavLink>, '9', <CommentOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/analytics'} >Thống kê</NavLink>, '10', <BarChartOutlined />),
        configMenuItem(<NavLink to={'/auth/admin/setting'} >'Cài đặt'</NavLink>, '11', <SettingOutlined />),
      ]

  return (
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
                    <img src={logoHeader} className={cs('logo-header')}/>
                    {/* <img src={logoMobile} className={cs('logo-mobile')}/> */}
                </Link>
               
                <Menu  theme="light" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
            </div>
        </Sider>
        <Layout>
            <Header className={cs('header')}>
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
  )
}

export default LayoutAdmin
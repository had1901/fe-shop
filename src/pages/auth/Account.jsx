import React, { useState } from 'react'
import styles from './Account.module.scss'
import useStyles from '../../hooks/useStyles'
import { Link } from 'react-router'
import AuthAccount from '../../components/accountTabs/account/AuthAccount'
import AuthAddress from '../../components/accountTabs/address/AuthAddress';
import AuthOrders from '../../components/accountTabs/orders/AuthOrders';
import AuthViewed from '../../components/accountTabs/viewed/AuthViewed';
import AuthModelLogout from '../../components/accountTabs/logout/AuthModelLogout'
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa6";
import { GiPositionMarker } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { AiOutlineLogout } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion';
import nodata from '~/assets/nodata/no-data.png'

const accountTabs = [
    {
        id: 1,
        key: 'account',
        title: 'Thông tin tài khoản',
        icon: <FaUser />,
        href: '#profile',
        component: <AuthAccount />, 
    },
    {
        id: 2,
        title: 'Số địa chỉ',
        key: 'address',
        icon: <GiPositionMarker />,
        href: '#address',
        component: <AuthAddress />, 

    },
    {
        id: 3,
        key: 'orders',
        title: 'Quản lý đơn hàng',
        icon: <FaWpforms />,
        href: '#orders',
        component: <AuthOrders />, 

    },
    {
        id: 4,
        key: 'viewed',
        title: 'Sản phẩm đã xem',
        icon: <IoEye />,
        href: '#viewed',
        component: <AuthViewed />, 

    },
    {
        id: 5,
        key: 'logout',
        title: 'Đăng xuất',
        icon: <AiOutlineLogout />,
        href: '#logout',
        component: <AuthModelLogout />, 
         
    },
]

function Account() {
    const [accountTab, setAccountTab] = useState('account')
    const user = useSelector(state => state.auth.info)
    const cs = useStyles(styles)
    let currentTab = accountTabs.find(tab => tab.key === accountTab)
    console.log(user)
  return (
    <div className={cs('account')}>
        <div className='container'>
            <div className={cs('information', 'row')}>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-2 col-sm-2 col-mn-12 p-md-6 gx-md-1 gx-sm-1 gx-mn-1'>
                    <div className={cs('sidebar-left')}>
                        <div className={cs('username')}>
                            <div className={cs('avatar')}><FaUserCircle /></div>
                            <span>{`${user?.firstname} ${user?.lastname}`}</span>
                        </div>
                        <ul className={cs('menu-profile')}>
                            {accountTabs.map(nav => (
                                <li className={cs(`menu-profile-item ${accountTab === nav.key && 'active'}`)}>
                                    <Link to={`#`} key={nav.key} className={cs('menu-profile-link')} onClick={() => setAccountTab(nav.key)}>
                                        <span className={cs('menu-profile-icon')}>{nav.icon}</span>
                                        <span className={cs('menu-profile-label')}>{nav.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='col-xxl-9 col-xl-9 col-lg-8 col-md-10 col-sm-10 col-mn-12 gx-md-1 gx-sm-1 gx-mn-1'>
                    <div className='content-right' style={{background: '#fff', height: '100%'}}>
                        {/* {orders.length < 0 && <div><img loading='lazy' src={nodata} alt="" /></div>} */}
                        <AnimatePresence mode="wait" className={cs('sidebar-right')}>
                            <motion.div
                                key={accountTab}
                                initial={{ opacity: 0}}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                
                            >
                                {currentTab?.component}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account
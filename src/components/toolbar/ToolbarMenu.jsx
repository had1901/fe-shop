import React from 'react'
import styles from './ToolbarMenu.module.scss';
import useStyles from '../../hooks/useStyles';
import { AiOutlineHome, AiOutlineMenuFold } from 'react-icons/ai';
import { IoBuildOutline } from "react-icons/io5";
import { FaHeadphonesSimple, FaRegUser } from 'react-icons/fa6';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

function ToolbarMenu() {
    const cs = useStyles(styles)
    const user = useSelector(state => state.auth.info)
    
    const toolbarList = [
        {
            title: 'Trang chủ',
            href: '/',
            icon: <AiOutlineHome />
        },
        {
            title: 'Danh mục',
            href: '#',
            icon: <AiOutlineMenuFold />
        },
        {
            title: 'Build PC',
            href: '#',
            icon: <IoBuildOutline />
        },
        {
            title: 'Liên hệ',
            href: '#',
            icon: <FaHeadphonesSimple />
        },
        {
            title: user?.username || user?.name || 'Tài khoản',
            href: '/auth/account',
            icon: <FaRegUser />
        },
    ]
  return (
    <div className={cs('toolbar-menu')}>
        <ul className={cs('toolbar-menu-list')}>
            {toolbarList.map((item, i) => (
                <li key={i} className={cs('toolbar-menu-item')}>
                    <Link to={item.href} className={cs('toolbar-menu-link')}>
                        <div className={cs('toolbar-menu-icon')}>{item.icon}</div>
                        <p className={cs('toolbar-menu-text')}>{item.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ToolbarMenu
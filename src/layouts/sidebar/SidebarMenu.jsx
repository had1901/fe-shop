import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import styles from './SidebarMenu.module.scss';
import { menuItems } from './_sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { TiChevronRight } from "react-icons/ti";
import MegaMenu from '../../components/megaMenu/MegaMenu';
import { toggle } from '../../store/navbar/navbarSlice';
import useStyles from '../../hooks/useStyles';



function SidebarMenu(props) {
  const { fixedClass } = props
  const navbarRef = useRef(null)
  const [paddingTop, setPaddingTop] = useState(76)
  const [height, setHeight] = useState('100')
  const isToggle = useSelector(state => state.navbar.isToggle)
  const dispatch = useDispatch()
  const [cs] = useStyles(styles)

  const handleToggleNavbar = () => {
    dispatch(toggle())
  }

  useLayoutEffect(() => {
    const navbar = navbarRef.current
    const getScrollTop = () => {
      if(window.scrollY > 30) {
        setPaddingTop(30)
      } else {
        setPaddingTop(76)
      }
    }
    window.addEventListener('scroll', getScrollTop)
    document.documentElement.style.setProperty('--spacing-top', `${paddingTop}px`)

    if(isToggle) {
      setHeight(navbar.getBoundingClientRect().height)
    } else {
      setHeight('inherit')
    }

    return () => {
      window.removeEventListener('scroll', getScrollTop)
    }
  },[paddingTop, isToggle])


  useLayoutEffect(() => {
    if(navbarRef.current) {
      document.documentElement.style.setProperty('--height-navbar', `${height}px`)
      console.log('co')
    } else {
      document.documentElement.style.setProperty('--height-navbar', `auto`)
      console.log('koo')

    }
  },[height])

  return (
      <div ref={navbarRef} className={cs(`navbar ${fixedClass} col-xl-2 col-lg-2 `)}>
        <ul className={cs('navMenu')}>
            {menuItems.map((menu) => (
              <li key={menu.id} data-index={menu.id} className={cs('menuItem')}>
                <Link 
                  to={menu.href !== '' ? `/pages/${menu.href}` : menu.href} 
                  className={cs('menuItemLink')}
                  onClick={handleToggleNavbar}
                >
                  <i className={cs('menuItemIcon')}>{menu.icon}</i>
                  <span className={cs('menuItemText')}>{menu.label}</span>
                  <span className={cs('menuItemArrow')}><TiChevronRight /></span>
                </Link>
                <MegaMenu products={menu.products}/>
              </li>
            ))}
        </ul>
      </div>
  )
}

export default SidebarMenu
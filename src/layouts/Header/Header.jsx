import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import bannerHeader from '~/assets/logo/banner-header.webp'
import logoHeader from '~/assets/logo/logo-gearvn.svg'
import logoMobile from '~/assets/logo/logo-mobile.svg'
import styles from './Header.module.scss';

import { LuMenu } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiPositionMarker } from "react-icons/gi";
import { BsClipboard2Check } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";

import { navigateList } from './_navigation';
// import { menuItems, renderMenuItems } from '../sidebar/_sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '~/store/navbar/navbarSlice';
import SidebarMenu from './../sidebar/SidebarMenu';
import { debounce } from '~/utils/debounce/_debounce';
import { Link } from 'react-router';
import useStyles from '~/hooks/useStyles';
import { open } from '../../store/navbar/formLoginSlice';
import { PiHandWaving } from 'react-icons/pi';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { MdOutlineLogout } from 'react-icons/md';
import usePost from '../../hooks/usePost.js';
import { logout } from '../../store/auth/authSlice.js';
import { setCarts } from '../../store/cart/cartSlice.js';
import axiosApi from '../../services/axios.js';



function Header() {
  const categoryRef = useRef()
  const [fixedClass, setFixedClass] = useState('')
  const state = useSelector(state => state.navbar.isToggle)
  const user = useSelector(state => state.auth.info)
  const carts = useSelector(state => state.cart.carts)
  const dispatch = useDispatch()
  const cs = useStyles(styles)  
  const { data, loading, postData, error } = usePost()
  const isLoading = useSelector(state => state.cart.isLoading)
  
  const handleToggleNavbar = debounce(() => {
    dispatch(toggle())
  }, 200)

  const openForm = () => {
    dispatch(open())
  }


  const total = (carts) => {
    if(carts.length > 0) {
      return carts.reduce((init, currentValue) => {
        return init + currentValue.quantity
      }, 0)
    }
    return 0
  }
  
  const handleLogout = async () => {
    await postData('/auth/logout', {})
    localStorage.clear()
    dispatch(logout())
    window.location.reload()
  }

  useEffect(() => {
    if(state) {
      setFixedClass('fixed_block')
    } else {
      setFixedClass('fixed_none')
    }
  },[state])

  
  useLayoutEffect(() => {
    if(user) {
      const fetchCarts = async () => {
        const res = await axiosApi.post('get-all-cart', {id: user.id})
        if(res.dt) {
            dispatch(setCarts(res.dt))
        }
      }
      fetchCarts()
    }
  },[user, user?.id, dispatch])

  return (
    <>
            <div className={cs('headerBanner')}>
              <div className={cs('bannerWrap', 'container')}>
                    <div className='row'>
                      <picture className='col-xxl-12 col-xl-12 d-lg-none'>
                        <img loading='lazy' src={bannerHeader} className={cs('headerBannerImg')} />
                      </picture>
                    </div>
              </div>
            </div>
            <div className={cs('contentHeader')}>
                <div className={cs('navbarWrap', 'container')}>
                    <div className={cs('navbarHeader', 'row')}>
                        <div className=''>
                            <Link to={'/'} className={cs('divnk')}>
                                <img loading='lazy' src={logoHeader} className={cs('logoHeader')}/>
                                <img loading='lazy' src={logoMobile} className={cs('logo_mobile')}/>
                            </Link>
                        </div>
                        <div ref={categoryRef} onClick={handleToggleNavbar} className={cs('categoryHeader')}>
                          <span className={cs('categoryIcon')}><LuMenu /></span>
                          <span className={cs('categoryText')}>Danh mục</span>
                        </div>
                        <div className={cs('search')}>
                          <div className={cs('inputSearchWrap')} >
                            <input type='text' placeholder='Bạn cần tìm gì?' className={cs('inputSearch')}  />
                            <span className={cs('inputIcon')}><IoSearch /></span>
                          </div>
                        </div>
                       <div className={cs('option_wrap')}>
                            <Link href='#' className={cs('navbar-text-link')}>
                                <span className={cs('icon-size')}><TfiHeadphoneAlt /></span>
                                <span className={cs('wrapText')}>Hotline 1900.5301</span>
                            </Link>
                            <Link href='#' className={cs('navbar-text-link')}>
                                <span className={cs('icon-size')}><GiPositionMarker /></span>
                                <span className={cs('wrapText')}>Hệ thống Showroom</span>
                            </Link>
                            <Link href='#' className={cs('navbar-text-link')}>
                                <span className={cs('icon-size')}><BsClipboard2Check /></span>
                                <span className={cs('wrapText')}>Tra cứu đơn hàng</span>
                            </Link>
                            <Link to='cart' className={cs('navbar-text-link cart-notify')}>
                                <span className={cs('icon-size')}><BsCartCheck /></span>
                                <div className={cs('wrapText')}>Giỏ hàng</div>
                                <span className={cs('notification-cart')}>
                                  {total(carts)}
                                </span>
                            </Link>
                          <div className={cs('bgColorLogin')} onClick={openForm}>
                            {user && (user.username || user.name)
                              ?
                              <div className={cs('navbar-text-link user-info')}>
                                  <span className={cs('icon-size')}><FaRegUser /></span>
                                  <div className={cs('text-user')}>
                                      <span>{`Xin chào, ${user.username || user.name}`}</span>
                                  </div>
                                  <div className={cs('dropdown-model-user')}>
                                    <ul className={cs('dropdown-model-user-list')}>
                                      <li className={cs('dropdown-model-user-item')}>
                                        <Link to='/auth/account'>
                                            <span className={cs('dropdown-model-user-link')}>
                                              <PiHandWaving />
                                              <span>{`Xin chào, ${user.username || user.name}`}</span>
                                            </span>
                                        </Link>
                                      </li>
                                      <li className={cs('dropdown-model-user-item')}>
                                        <Link to='/auth/account/orders-history'>
                                          <span className={cs('dropdown-model-user-link')}>
                                            <HiOutlineClipboardDocumentList />
                                            <span>Đơn hàng của tôi</span>
                                          </span>

                                        </Link>
                                      </li>
                                      {/* <li className={cs('dropdown-model-user-item')}>
                                        <Link to='/logout'>
                                          <span className={cs('dropdown-model-user-link')}>
                                            <MdOutlineLogout />
                                            <span>Đã xem gần đây</span>
                                          </span>

                                        </Link>
                                      </li> */}
                                      <li className={cs('dropdown-model-user-item')} onClick={handleLogout}>
                                        <Link href='#' >
                                          <span className={cs('dropdown-model-user-link')}>
                                            <MdOutlineLogout />
                                            <span>Đăng xuất</span>
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                              </div>
                              :
                              <Link to='/auth' className={cs('navbar-text-link')}>
                                  <span className={cs('icon-size')}><FaRegUser /></span>
                                  <span className={cs('wrapText')}>Đăng nhập</span>
                              </Link>
                            }
                            
                          </div>
                       </div>
                       <div className={cs('cart_mb')}>
                            <Link href='#' className={cs('navbar-text-link')}>
                                <span className={cs('icon-size')}><BsCartCheck /></span>
                                <div className={cs('wrapText')}>Giỏ hàng</div>
                            </Link>
                        </div>
                        <SidebarMenu fixedClass={fixedClass} />
                    </div>
                </div>
                <div className={cs('menu_mb_wrap')}>
                  <ul className={cs('menu_mb_list')}>
                      {/* {renderMenuItems(menuItems)} */}
                  </ul>
                </div>
            </div>
            <div className={cs('contentNavigate')}>
                <div className='container'>
                    <ul className={cs('navigateList row')}>
                      {
                        navigateList.map(item => (
                          <li key={item.id} className={cs('navigateItem col')}>
                            <a href='#' >
                                <span className={cs('navigateIcon')}>{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        </li>
                        ))
                      }
                      
                    </ul>
                </div>
            </div>

    </>
  )
}

export default Header
import React, { Fragment, useEffect, useRef, useState } from 'react'
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


console.log(styles)

function Header() {
  const categoryRef = useRef()
  const [fixedClass, setFixedClass] = useState('')
  const state = useSelector(state => state.navbar.isToggle)
  const dispatch = useDispatch()
  const [cs] = useStyles(styles)

  const handleToggleNavbar = debounce(() => {
    dispatch(toggle())
  }, 200)

    useEffect(() => {
      if(state) {
        setFixedClass('fixed_block')
      } else {
        setFixedClass('fixed_none')
      }
    },[state])
  return (
    <>
            <div className={cs('headerBanner')}>
              <div className={cs('bannerWrap', 'container')}>
                    <div className='row'>
                      <picture className='col-xxl-12 col-xl-12 d-lg-none'>
                        <img src={bannerHeader} className={cs('headerBannerImg')} />
                      </picture>
                    </div>
              </div>
            </div>
            <div className={cs('contentHeader')}>
                <div className={cs('navbarWrap', 'container')}>
                    <div className={cs('navbarHeader', 'row')}>
                        <div className=''>
                            <Link to={'/'} className={cs('divnk')}>
                                <img src={logoHeader} className={cs('logoHeader')}/>
                                <img src={logoMobile} className={cs('logo_mobile')}/>
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
                          <div className=''>
                            <a href='#' className={cs('navbarText')}>
                                <span className={cs('iconSize')}><TfiHeadphoneAlt /></span>
                                <div className={cs('wrapText')}>
                                  <span>Hotdivne</span>
                                  <span>1900.5301</span>
                                </div>
                            </a>
                          </div>
                          <div className=''>
                            <a href='#' className={cs('navbarText')}>
                                <span className={cs('iconSize')}><GiPositionMarker /></span>
                                <div className={cs('wrapText')}>
                                  <span>Hệ thống</span>
                                  <span>Showroom</span>
                                </div>
                            </a>
                          </div>
                          <div className=''>
                            <a href='#' className={cs('navbarText')}>
                                <span className={cs('iconSize')}><BsClipboard2Check /></span>
                                <div className={cs('wrapText')}>
                                  <span>Tra cứu</span>
                                  <span>đơn hàng</span>
                                </div>
                            </a>
                          </div>
                          <div className=''>
                            <a href='#' className={cs('navbarText')}>
                                <span className={cs('iconSize')}><BsCartCheck /></span>
                                <div className={cs('wrapText')}>
                                  <span>Giỏ</span>
                                  <span>hàng</span>
                                </div>
                            </a>
                          </div>
                          <div className={cs('bgColorLogin')}>
                            <a href='#' className={cs('navbarText')}>
                                <span className={cs('iconSize')}><FaRegUser /></span>
                                <div className={cs('wrapText')}>
                                  <span>Đăng</span>
                                  <span>nhập</span>
                                </div>
                            </a>
                          </div>
                       </div>
                       <div className={cs('cart_mb')}>
                            <a href='#' className={cs('navbarText')}>
                                <span className={cs('iconSize')}><BsCartCheck /></span>
                                <div className={cs('wrapText')}>
                                  <span>Giỏ</span>
                                  <span>hàng</span>
                                </div>
                            </a>
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
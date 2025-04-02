import React, { Fragment, useEffect, useRef, useState } from 'react'
import bannerHeader from '../../assets/logo/banner-header.webp'
import logoHeader from '../../assets/logo/logo-gearvn.svg'
import logoMobile from '../../assets/logo/logo-mobile.svg'
import clsx from "clsx";
import styles from './Header.module.scss';

import { LuMenu } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiPositionMarker } from "react-icons/gi";
import { BsClipboard2Check } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";

import { navigateList } from './_navigation';
import { menuItems, renderMenuItems } from '../Feature/Sidebar/_sidebarMenu';





function Header() {
  const headerRef = useRef()
  const bannerRef = useRef()
  const [fixed, setFixed] = useState('')

  useEffect(() => {
    const header = headerRef.current
    const banner = bannerRef.current
    if(header) {
      window.addEventListener('scroll', () => {
        if(window.scrollY >= 50) {
          setFixed('fixed_header') 
        } else {
          setFixed('') 
        }
      })
    }
  }, [])

  return (
    <>
       <header className={clsx(styles.header)}>
            <div ref={bannerRef} className={clsx(styles.headerBanner)}>
              <div className={clsx(styles.bannerWrap, 'container')}>
                    <div className='row'>
                      <div className='col-xxl-12 col-xl-12 d-lg-none'>
                        <img src={bannerHeader} className={clsx(styles.headerBannerImg)} />
                      </div>
                    </div>
              </div>
            </div>
              <div ref={headerRef} className={clsx(styles.contentHeader, styles[fixed])}>
                <div className={clsx(styles.navbarWrap, 'container')}>
                    <div className={clsx(styles.navbarHeader, 'row')}>
                        <div className=''>
                            <a href='#' className={clsx(styles.divnk)}>
                                <img src={logoHeader} className={clsx(styles.logoHeader)}/>
                                <img src={logoMobile} className={clsx(styles.logo_mobile)}/>
                            </a>
                        </div>
                        <div className={clsx(styles.categoryHeader)}>
                          <span className={clsx(styles.categoryIcon)}><LuMenu /></span>
                          <span className={clsx(styles.categoryText)}>Danh mục</span>
                        </div>
                        <div className={clsx(styles.search)}>
                          <div className={clsx(styles.inputSearchWrap)} >
                            <input type='text' placeholder='Bạn cần tìm gì?' className={clsx(styles.inputSearch)}  />
                            <span className={clsx(styles.inputIcon)}><IoSearch /></span>
                          </div>
                        </div>
                       <div className={clsx(styles.option_wrap)}>
                          <div className=''>
                            <a href='#' className={clsx(styles.navbarText)}>
                                <span className={clsx(styles.iconSize)}><TfiHeadphoneAlt /></span>
                                <div className={clsx(styles.wrapText)}>
                                  <span>Hotdivne</span>
                                  <span>1900.5301</span>
                                </div>
                            </a>
                          </div>
                          <div className=''>
                            <a href='#' className={clsx(styles.navbarText)}>
                                <span className={clsx(styles.iconSize)}><GiPositionMarker /></span>
                                <div className={clsx(styles.wrapText)}>
                                  <span>Hệ thống</span>
                                  <span>Showroom</span>
                                </div>
                            </a>
                          </div>
                          <div className=''>
                            <a href='#' className={clsx(styles.navbarText)}>
                                <span className={clsx(styles.iconSize)}><BsClipboard2Check /></span>
                                <div className={clsx(styles.wrapText)}>
                                  <span>Tra cứu</span>
                                  <span>đơn hàng</span>
                                </div>
                            </a>
                          </div>
                          <div className=''>
                            <a href='#' className={clsx(styles.navbarText)}>
                                <span className={clsx(styles.iconSize)}><BsCartCheck /></span>
                                <div className={clsx(styles.wrapText)}>
                                  <span>Giỏ</span>
                                  <span>hàng</span>
                                </div>
                            </a>
                          </div>
                          <div className={clsx(styles.bgColorLogin)}>
                            <a href='#' className={clsx(styles.navbarText)}>
                                <span className={clsx(styles.iconSize)}><FaRegUser /></span>
                                <div className={clsx(styles.wrapText)}>
                                  <span>Đăng</span>
                                  <span>nhập</span>
                                </div>
                            </a>
                          </div>
                       </div>
                       <div className={clsx(styles.cart_mb)}>
                            <a href='#' className={clsx(styles.navbarText)}>
                                <span className={clsx(styles.iconSize)}><BsCartCheck /></span>
                                <div className={clsx(styles.wrapText)}>
                                  <span>Giỏ</span>
                                  <span>hàng</span>
                                </div>
                            </a>
                          </div>
                    </div>
                </div>
                <div className={clsx(styles.menu_mb_wrap)}>
                  <ul className={clsx(styles.menu_mb_list)}>
                      {renderMenuItems(menuItems)}
                  </ul>
                </div>
            </div>
            <div className={clsx(styles.contentNavigate)}>
                <div className='container'>
                    <ul className={clsx(styles.navigateList, 'row')}>
                      {
                        navigateList.map(item => (
                          <li key={item.id} className={clsx(styles.navigateItem, 'col')}>
                            <a href='#' >
                                <span className={clsx(styles.navigateIcon)}>{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        </li>
                        ))
                      }
                      
                    </ul>
                </div>
            </div>
       </header>
    </>
  )
}

export default Header
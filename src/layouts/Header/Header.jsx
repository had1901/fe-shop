import React, { Fragment } from 'react'
import bannerHeader from '../../assets/logo/banner-header.webp'
import logoHeader from '../../assets/logo/logo-gearvn.svg'
import clsx from "clsx";
import styles from './Header.module.scss';

import { LuMenu } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GiPositionMarker } from "react-icons/gi";
import { BsClipboard2Check } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiAutoRepair } from "react-icons/gi";
import { IoCardOutline } from "react-icons/io5";
import { RiCoinsFill } from "react-icons/ri";
import { AiOutlineFileProtect } from "react-icons/ai";
import Container from '../../components/container/Container';

function Header() {
  return (
    <>
       <header className={clsx(styles.header)}>
            <div className={clsx(styles.contentBanner)}>
              <Container>
                  <img src={bannerHeader} className={clsx(styles.bannerTopImg)} />
              </Container>
            </div>
            <div className={clsx(styles.contentHeader)}>
              <Container>
                <ul className={clsx(styles.navbarHeader)}>
                    <li className=''>
                        <a href='#' className={clsx(styles.link)}>
                            <img src={logoHeader} className={clsx(styles.logoHeader)}/>
                        </a>
                    </li>
                    <li className={clsx(styles.categoryHeader)}>
                      <span className={clsx(styles.categoryIcon)}><LuMenu /></span>
                      <span className={clsx(styles.categoryText)}>Danh mục</span>
                    </li>
                    <li className=''>
                      <div className={clsx(styles.inputSearchWrap)} >
                        <input type='text' placeholder='Bạn cần tìm gì?' className={clsx(styles.inputSearch)}  />
                        <span className={clsx(styles.inputIcon)}><IoSearch /></span>
                      </div>
                    </li>
                    <li>
                      <a href='#' className={clsx(styles.navbarText)}>
                          <span className={clsx(styles.iconSize)}><TfiHeadphoneAlt /></span>
                          <div className={clsx(styles.wrapText)}>
                            <span>Hotline</span>
                            <span>1900.5301</span>
                          </div>
                      </a>
                    </li>
                    <li>
                      <a href='#' className={clsx(styles.navbarText)}>
                          <span className={clsx(styles.iconSize)}><GiPositionMarker /></span>
                          <div className={clsx(styles.wrapText)}>
                            <span>Hệ thống</span>
                            <span>Showroom</span>
                          </div>
                      </a>
                    </li>
                    <li>
                      <a href='#' className={clsx(styles.navbarText)}>
                          <span className={clsx(styles.iconSize)}><BsClipboard2Check /></span>
                          <div className={clsx(styles.wrapText)}>
                            <span>Tra cứu</span>
                            <span>đơn hàng</span>
                          </div>
                      </a>
                    </li>
                    <li>
                      <a href='#' className={clsx(styles.navbarText)}>
                          <span className={clsx(styles.iconSize)}><BsCartCheck /></span>
                          <div className={clsx(styles.wrapText)}>
                            <span>Giỏ</span>
                            <span>hàng</span>
                          </div>
                      </a>
                    </li>
                    <li className={clsx(styles.bgColorLogin)}>
                      <a href='#' className={clsx(styles.navbarText)}>
                          <span className={clsx(styles.iconSize)}><FaRegUser /></span>
                          <div className={clsx(styles.wrapText)}>
                            <span>Đăng</span>
                            <span>nhập</span>
                          </div>
                      </a>
                    </li>
                </ul>
              </Container>
            </div>
            <div className={clsx(styles.contentNavigate)}>
              <Container>
                  <div className={clsx(styles.navigate)}>
                    <ul className={clsx(styles.navigateList)}>
                      <li className={clsx(styles.navigateItem)}>
                        <a href='#' >
                          <span className={clsx(styles.navigateIcon)}><CiCreditCard1 /></span>
                          <span>Tự Build PC theo ý của bạn</span>
                        </a>
                      </li>
                      <li className={clsx(styles.navigateItem)}>
                        <a href='#'>
                          <span className={clsx(styles.navigateIcon)}><HiOutlineClipboardDocumentList /></span>
                          <span>Tin công nghệ</span>
                          </a>
                      </li>
                      <li className={clsx(styles.navigateItem)}>
                        <a href='#'>
                          <span className={clsx(styles.navigateIcon)}><GiAutoRepair /></span>
                          <span>Dịch vụ sửa chữa</span>
                        </a>
                      </li>
                      <li className={clsx(styles.navigateItem)}>
                        <a href='#'>
                          <span className={clsx(styles.navigateIcon)}><IoCardOutline /></span>
                          <span>Dịch vụ kỹ thuật tại nhà</span>
                        </a>
                      </li>
                      <li className={clsx(styles.navigateItem)}>
                        <a href='#'>
                          <span className={clsx(styles.navigateIcon)}><RiCoinsFill /></span>
                          <span>Thu cũ đổi mới</span>
                        </a>
                      </li>
                      <li className={clsx(styles.navigateItem)}>
                        <a href='#'>
                          <span className={clsx(styles.navigateIcon)}><AiOutlineFileProtect /></span>
                          <span>Tra cứu bảo hành</span>
                        </a>
                      </li>
                    </ul>
                  </div>
              </Container>
            </div>
       </header>
    </>
  )
}

export default Header
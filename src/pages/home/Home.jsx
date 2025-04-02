import React, { Fragment } from 'react'
import { NavLink, Link } from "react-router"
import Header from './../../layouts/Header/Header';
import styles from './Home.module.scss';
import clsx from "clsx";
import SidebarLeft from '../../layouts/Feature/Sidebar/SidebarMenu';
import SidebarRight from '../../layouts/Feature/Sidebar/SidebarRight';
import { bannerListBottom } from './../../components/bannerSale/_bannerSale';
import BannerSale from '../../components/bannerSale/BannerSale';
import FlashSale from '../../components/flashSale/FlashSale';
import BannerMid from '../../components/bannerMid/BannerMid';
import ViewedProduct from '../../components/viewedProduct/ViewedProduct';
import ProductList from '../../components/productList/ProductList';

function Home() {
  return (
      <div className={clsx(styles.app)}>
            {/* Header */}
            <header>
              <Header />
            </header>

            {/* Main */}
            <main className={clsx(styles.app_main)}>
              <div className={clsx(styles.menu_wrap, 'container')}>
                  <div className={clsx(styles.wrapper_feature , 'row')}>
                    <SidebarLeft></SidebarLeft>
                    <SidebarRight></SidebarRight>
                  </div>
                  <div className={clsx(styles.bannerList, 'row')}>
                    <BannerSale bannerList={bannerListBottom}/>
                  </div>
                  <ViewedProduct title='Sản phẩm đã xem' />
                  <FlashSale />
                  <BannerMid />
                  <ProductList />

                </div>
            </main>

            {/* Footer */}
            <footer>

            </footer>
      </div>
  )
}

export default Home
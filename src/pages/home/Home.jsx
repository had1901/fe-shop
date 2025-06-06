import React, { Fragment } from 'react'
import { NavLink, Link } from "react-router"
import styles from './Home.module.scss';
import clsx from "clsx";
import { bannerListBottom } from './../../components/bannerSale/_bannerSale';
import BannerSale from '../../components/bannerSale/BannerSale';
import FlashSale from '../../components/flashSale/FlashSale';
import BannerMid from '../../components/bannerMid/BannerMid';
import ViewedProduct from '../../components/viewedProduct/ViewedProduct';
import ProductList from '../../components/productList/ProductList';
import { productList } from '../../api/_products';
import BannerDisplay from '../../components/bannerDisplay/BannerDisplay';
import CategoryProducts from '../../components/categoryProducts/CategoryProducts';
import SidebarMenu from '../../layouts/sidebar/SidebarMenu';
import SidebarRight from '../../layouts/Sidebar/SidebarRight';
import News from '../../components/news/News';

function HomePage() {
  return (
      <main className={clsx(styles.app)}>
            <div className={clsx(styles.app_main)}>
              <div className={clsx(styles.menu_wrap, 'container')}>
                  <div className={clsx(styles.wrapper_feature , 'row')}>
                    <SidebarMenu></SidebarMenu>
                    <SidebarRight></SidebarRight>

                  </div>
                  <div className={clsx(styles.bannerList, 'row')}>
                    <BannerSale bannerList={bannerListBottom}/>
                  </div>
                  <ViewedProduct title='Sản phẩm đã xem' />
                  <FlashSale />
                  <BannerMid />
                  {productList.map((item) => (
                    <ProductList key={item.id} productList={item} numberDisplay={5} title='PC bán chạy' method='Trả góp 0%'/>
                  ))}
                  <BannerDisplay />  
                  <CategoryProducts />
                  <News />
                </div>
            </div>
      </main>
  )
}

export default HomePage
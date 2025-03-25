import React, { Fragment } from 'react'
import { NavLink, Link } from "react-router"
import Header from './../../layouts/Header/Header';
import styles from './Home.module.scss';
import clsx from "clsx";
import Container from '../../layouts/Container/Container';
import SidebarLeft from '../../layouts/Feature/Sidebar/SidebarMenu';
import SidebarRight from '../../layouts/Feature/Sidebar/SidebarRight';
import { bannerListBottom } from './../../components/bannerSale/_bannerSale';
import BannerSale from '../../components/bannerSale/BannerSale';
import ProductList from '../../components/productList/productList';

function Home() {
  return (
      <div className={clsx(styles.wrapper)}>
            <Header />
            <div className={clsx(styles.wrapperMain)}>
              <Container>
                <div className={clsx(styles.wrapperFeature)}>
                  <SidebarLeft></SidebarLeft>
                  <SidebarRight></SidebarRight>
                </div>
                <div className={clsx(styles.bannerList)}>
                  {bannerListBottom.map((banner, index) => (
                    <BannerSale source={banner} index={index}/>
                  ))}
                </div>
              </Container>
              <Container>
                <ProductList title="Sản phẩm đã xem" />
              </Container>
            </div>
      </div>
  )
}

export default Home
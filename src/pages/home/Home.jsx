import React, { Fragment } from 'react'
import { NavLink, Link } from "react-router"
import Header from './../../layouts/Header/Header';
import styles from './Home.module.scss';
import clsx from "clsx";
import Container from '../../components/container/Container';
import SidebarLeft from '../../layouts/Feature/Sidebar/SidebarMenu';
import SidebarRight from '../../layouts/Feature/Sidebar/SidebarRight';
import { bannerList } from './../../components/bannerSale/_bannerSale';
import BannerSale from '../../components/bannerSale/BannerSale';

function Home() {
  return (
      <div className={clsx(styles.wrapper)}>
            <Header />
            <div className={clsx(styles.wrapperMain)}>
              <Container>
                <div className={clsx(styles.wrapFeature)}>
                  <SidebarLeft></SidebarLeft>
                  <SidebarRight></SidebarRight>
                </div>
                <div>
                  {bannerList.map(banner => (
                    <BannerSale source={banner}/>
                  ))}
                </div>
              </Container>
              

            </div>
      </div>
  )
}

export default Home
import React from 'react'
import styles from './SidebarRight.module.scss';
import clsx from "clsx";
import { bannerListLeft, bannerListRight } from './_sidebarMenu';
import Slider from '../../../components/slider/Slider';
import { sliderListImage } from '../../../components/slider/_slider';


function SidebarRight() {
  return (
    <div className='col-xl-10 col-md-12'>
        <div className={clsx(styles.sidebarRight)}>
            <div className={clsx(styles.sidebarSliderLeft)}>
                <Slider sliders={sliderListImage}/>
                <div className={clsx(styles.sidebarBannerList)}>
                    {bannerListLeft.map((item, index) => (
                        <div key={index}>
                            <a href=''>
                                <img src={item} className={clsx(styles.sidebarBannerImg)} />
                            </a>
                        </div>))}
                </div>
            </div>
    
            <div className={clsx(styles.sidebarBannerRight)}>
                <ul className={clsx(styles.list_banner)}>
                    {bannerListRight.map((item, index) => (
                        <li key={index}>
                            <a href='#'>
                                <img src={item}/>
                            </a>
                        </li>))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SidebarRight
import React from 'react'
import styles from './SidebarRight.module.scss';
import { bannerListLeft, bannerListRight } from './_sidebarMenu';
import Slider from '~/components/slider/Slider';
import { sliderListImage } from '~/components/slider/_slider';
import useStyles from '~/hooks/useStyles';


function SidebarRight() {
  const cs = useStyles(styles)

  return (
    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12'>
        <div className={cs('sidebarRight')}>
            <div className={cs('sidebarSliderLeft')}>
                <div>
                    <Slider sliders={sliderListImage}/>
                </div>
                <div className={cs('sidebarBannerList')}>
                    {bannerListLeft.map((item, index) => (
                        <div key={index}>
                            <a href=''>
                                <img src={item} className={cs('sidebarBannerImg')} />
                            </a>
                        </div>))}
                </div>
            </div>
    
            <div className={cs('sidebarBannerRight')}>
                <ul className={cs('list_banner')}>
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
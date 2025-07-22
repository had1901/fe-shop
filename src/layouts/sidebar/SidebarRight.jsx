import React, { useEffect, useRef } from 'react'
import styles from './SidebarRight.module.scss';
import { bannerListLeft, bannerListRight } from './_sidebarMenu';
import Slider from '~/components/slider/Slider';
import { sliderListImage } from '~/components/slider/_slider';
import useStyles from '~/hooks/useStyles';

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

function SidebarRight() {
    const cs = useStyles(styles)
    const bannerRightRef = useRef([])
    const bannerLeftRef = useRef([])

    useEffect(() => {
        bannerRightRef.current.forEach((element, index) => {
            if (!element) return

            gsap.fromTo(
                element, 
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.3,
                    ease: 'power1.inOut',
                },
            )
            }
        )
        bannerLeftRef.current.forEach((element, index) => {
            if (!element) return

            gsap.fromTo(
                element, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.3,
                    ease: 'power1.inOut',
                },
            )
            }
        )
    },[])

  return (
    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12'>
        <div className={cs('sidebar-right')}>
            <div className={cs('sidebar-slider-left')}>
                <div className={cs('slider-img')}>
                    <Slider sliders={sliderListImage}/>
                </div>
                <div className={cs('sidebar-banner-list')}>
                    {bannerListLeft.map((item, index) => (
                        <div ref={el => bannerLeftRef.current[index] = el} key={index}>
                            <a href='#'>
                                <img loading='lazy' src={item} className={cs('sidebarBannerImg')} />
                            </a>
                        </div>))}
                </div>
            </div>
    
            <div className={cs('sidebar-banner-right')}>
                <ul className={cs('list_banner')}>
                    {bannerListRight.map((item, index) => (
                        <li ref={el => bannerRightRef.current[index] = el} key={index} className={cs('list-item')}>
                            <a href='#'>
                                <img loading='lazy' src={item}/>
                            </a>
                        </li>))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SidebarRight
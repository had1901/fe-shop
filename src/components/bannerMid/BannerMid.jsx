import React, { useLayoutEffect, useRef } from 'react'
import m1 from '~/assets/banner/banner-mid/m1.webp'
import m2 from '~/assets/banner/banner-mid/m2.webp'
import styles from './BannerMid.module.scss';
import useStyles from '~/hooks/useStyles';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger)
const listBanner = [
  {
    src: m1,
    alt: 'Built PC theo ý của bạn'
  },
  {
    src: m2,
    alt: 'Ghế bàn giảm đến 40%'
  }, 
]

function BannerMid() {
  const cs = useStyles(styles)
  const bannerRef = useRef([])

  // const handleMove = () => {
  //   const banner = bannerRef.current
  //   gsap.to(banner[0], 
  //       {
  //           // opacity: 0,
  //           y: 100,
  //           duration: 0.8,
  //           // delay: 0.6,
  //           ease: 'power1.inOut',
  //       },
  //     )
  // }
  useLayoutEffect(() => {
    const banner = bannerRef.current
    if (!banner[0] || !banner[1]) return
      const banner1 = gsap.context(() => {
        gsap.from(
          banner[0], 
            {
                opacity: 0,
                x: -30,
                duration: 0.8,
                // delay: 0.6,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: banner[0],
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                  // markers: true, // bật nếu muốn debug vị trí
                }
            },
        )
      }, bannerRef)
      const banner2 = gsap.context(() => {
        gsap.from(
          banner[1], 
            {
                opacity: 0,
                x: 30,
                duration: 0.8,
                // delay: 0.6,
                ease: 'power1.inOut',
                scrollTrigger: {
                  trigger: banner[1],
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                  // markers: true, // bật nếu muốn debug vị trí
                }
            },
        )
      }, bannerRef)
      return () => {
        banner1.revert()
        banner2.revert()
      }
  },[])

  return (
    <div className={cs('banner_mid_wrap', 'row')}>
      {listBanner.length && 
        listBanner.map((item, i) => (
          <Link key={i} ref={el => bannerRef.current[i] = el} to='#' className={cs('banner_mid_item', 'col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-mn-9 gx-md-1 gx-sm-1 gx-mn-1')} >
            <img loading='lazy' src={item.src} className={cs('banner_mid_img')} alt='banner-mid' />
          </Link>
        ))}
    </div>
  )
}

export default BannerMid
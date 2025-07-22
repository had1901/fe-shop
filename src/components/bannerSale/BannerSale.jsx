import React, { Fragment, useEffect, useRef } from 'react'
import styles from './BannerSale.module.scss';
import useStyles from '~/hooks/useStyles';
import gsap from 'gsap';

function BannerSale({ bannerList }) {
  const cs = useStyles(styles)
  const bannerRef = useRef([])

  useEffect(() => {
    bannerRef.current.forEach((element, index) => {
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
    <div className={cs('banner-list', 'row')}>
      {bannerList.map((src, index) => (
        <div ref={el => bannerRef.current[index] = el} key={index} className='col-xxl-3 col-xl-3 col-lg-4 col-md-8 col-sm-8 col-mn-8 p-0'>
            <img loading='lazy' src={src} className={cs('bannerImg')}/>
        </div>
      ))}
    </div>
   
  )
}

export default BannerSale
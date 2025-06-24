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
    <Fragment>
      {bannerList.map((src, index) => (
        <div ref={el => bannerRef.current[index] = el} key={index} className='col-xxl-3'>
            <img src={src} className={cs('bannerImg')}/>
        </div>
      ))}
    </Fragment>
   
  )
}

export default BannerSale
import React from 'react'
import m1 from '~/assets/banner/banner-mid/m1.webp'
import m2 from '~/assets/banner/banner-mid/m2.webp'
import styles from './BannerMid.module.scss';
import useStyles from '~/hooks/useStyles';

function BannerMid() {
  const cs = useStyles(styles)

  return (
    <div className={cs('banner_mid_wrap')}>
        <a href='#' className={cs('banner_mid_item')}>
            <img src={m1} className={cs('banner_mid_img')} alt='Built PC theo ý của bạn' />
        </a>
        <a href='#' className={cs('banner_mid_item')}>
            <img src={m2} className={cs('banner_mid_img')} alt='Ghế bàn giảm đến 40%'/>
        </a>
       
    </div>
  )
}

export default BannerMid
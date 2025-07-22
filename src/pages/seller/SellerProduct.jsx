import React, { useState } from 'react'

import styles from './SellerProduct.module.scss'
import n1 from '~/assets/seller/laptop/nav/n1.webp'
import n2 from '~/assets/seller/laptop/nav/n2.webp'
import n3 from '~/assets/seller/laptop/nav/n3.webp'
import n4 from '~/assets/seller/laptop/nav/n4.webp'

import laptop_office from '../../assets/hero/laptop-office.png'
import laptop_gaming from '../../assets/hero/laptop-gaming.png'
import pc_gaming from '../../assets/hero/pc.jpg'
import man_hinh from '../../assets/hero/man-hinh.jpg'

import b1 from '~/assets/seller/laptop/brand/asus.webp'
import b2 from '~/assets/seller/laptop/brand/acer.webp'
import b3 from '~/assets/seller/laptop/brand/dell.webp'
import b4 from '~/assets/seller/laptop/brand/msi.webp'
import b5 from '~/assets/seller/laptop/brand/lenovo.webp'
import b6 from '~/assets/seller/laptop/brand/hp.webp'
import b7 from '~/assets/seller/laptop/brand/lg.webp'
import useStyles from '../../hooks/useStyles'
import Seller from './../../components/seller/Seller';

const navLaptop = [
    n1,
    n2,
    n3,
    n4
]
const brandLaptop = [
    b1,
    b2,
    b3,
    b4,
    b5,
    b6,
    b7,
]


function SellerProduct({ category, album, promotionColor, listImg }) {
  const cs = useStyles(styles)

  const renderBanner = () => {
    switch(album){
        case 'laptop-office':
            return <img loading='lazy' src={laptop_office} alt='banner' />
        case 'laptop-gaming':
            return <img loading='lazy' src={laptop_gaming} alt='banner' />
        case 'pc-gaming':
            return <img loading='lazy' src={pc_gaming} alt='banner' />
        case 'screen':
            return <img loading='lazy' src={man_hinh} alt='banner' />
    }
  }
  return (
     <div className={cs('seller_wrap')}>
            <section className={cs('top')}>
                {renderBanner()}
                <div className={cs('navbar')} style={{ background: `${promotionColor}`}}>
                    <div className={cs('sub_container', 'container')}>
                        <div className={cs('sub_row', 'row')}>
                            {listImg.map((nav, index) => (
                                <div key={index} className={cs('sub_col hover')}>
                                    <img loading='lazy' src={nav} alt='img' className={cs('nav_img')} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <div className={cs('brand')}>
                    <div className={cs('sub_container', 'container')}>
                        <div className={cs('sub_row', 'row')}>
                            {brandLaptop.map((nav, index) => (
                                <div key={index} className={cs('brand_col hover')}>
                                    <img loading='lazy' src={nav} alt='img' className={cs('nav_img')} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}
            </section>
            <Seller category={category} album={album} />
    
        </div>
  )
}

export default SellerProduct
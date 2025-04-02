import React, { Fragment } from 'react'
import styles from './BannerSale.module.scss';
import clsx from "clsx";

function BannerSale({ bannerList }) {
  return (
    <Fragment>
      {bannerList.map((src, index) => (
        <div key={index} className='col-xxl-3 '>
            <img src={src} className={clsx(styles.bannerImg)}/>
        </div>
      ))}
    </Fragment>
   
  )
}

export default BannerSale
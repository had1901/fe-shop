import React from 'react'
import styles from './BannerSale.module.scss';
import clsx from "clsx";

function BannerSale({source, index}) {
  return (
    <div key={index}>
        <img src={source} className={clsx(styles.bannerImg)}/>
    </div>
   
  )
}

export default BannerSale
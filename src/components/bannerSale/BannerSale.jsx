import React, { Fragment } from 'react'
import styles from './BannerSale.module.scss';
import useStyles from '~/hooks/useStyles';

function BannerSale({ bannerList }) {
  const [cs] = useStyles(styles)
  
  return (
    <Fragment>
      {bannerList.map((src, index) => (
        <div key={index} className='col-xxl-3'>
            <img src={src} className={cs('bannerImg')}/>
        </div>
      ))}
    </Fragment>
   
  )
}

export default BannerSale
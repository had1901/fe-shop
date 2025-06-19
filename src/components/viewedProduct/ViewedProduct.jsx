import React, { useRef } from 'react'
import styles from './ViewedProduct.module.scss';
import { useSlider } from '~/hooks/useSlider';
import Button from '../button/Button';
import { useResponsive } from '~/hooks/useResponsive';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import useStyles from '~/hooks/useStyles';
import { computerList } from '~/api/_products';
import { convertPrice } from '../../utils/convertString/_convertPrice';

function ViewedProduct({ title }) {
    const btnLeftRef = useRef()
    const btnRightRef = useRef()
    const itemRefs = useRef([])
    const numDisplay = useResponsive()
    const {trackRef, prevSlide, nextSlide, percent} = useSlider(computerList.length, numDisplay)
    const cs = useStyles(styles)

  return (
    <div className={cs('viewedProduct')}>
        <div className=''>
            <h2 className={cs('heading')}>{title}</h2>
        </div>
        <div className={cs('productListWrap')}>
            <ul ref={trackRef} className={cs('productList')}>
                {computerList.length && computerList.map((item, index) => (
                    <li key={index} ref={(el) => itemRefs.current.push(el)} className={cs('productItem')} style={{ width: `${percent}%`}}>
                        <a href={item.href} className={cs('productLink')}>
                            <div className={cs('productLinkWrap')}>
                                <div className={cs('productWrapImg')}>
                                    <img src={item.src} className={cs('productImg')}/>
                                </div>
                                <div className={cs('productInfo')}>
                                    <h3 className={cs('productHeading')}>{item.name}</h3>
                                    <del className={cs('productPriceDefault')}>{convertPrice(item.price)}</del>
                                    <div className={cs('productPriceSale')}>
                                        <span className={cs('priceSale')}>{convertPrice(item.priceSale)}</span>
                                        <span className={cs('percentSale')}>{`-${item.salePercent}%`}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
            <Button ref={btnLeftRef} onclick={prevSlide} content={<FaChevronLeft/>} customClass='btn-slider btn-left-viewed' />
            <Button ref={btnRightRef} onclick={nextSlide} content={<FaChevronRight/>} customClass='btn-slider btn-right-viewed'/>
        </div>
    </div>
  )
}

export default ViewedProduct
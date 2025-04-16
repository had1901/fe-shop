import React, { useRef } from 'react'
import styles from './ViewedProduct.module.scss';
import { useSlider } from '~/hooks/useSlider';
import Button from '../button/Button';
import { useResponsive } from '~/hooks/useResponsive';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { productList } from '~/api/_products';
import useStyles from '~/hooks/useStyles';

function ViewedProduct({ title }) {
    const btnLeftRef = useRef()
    const btnRightRef = useRef()
    const itemRefs = useRef([])
    // console.log(productList)
    const numDisplay = useResponsive()
    const {trackRef, prevSlide, nextSlide} = useSlider(productList.length, numDisplay)
    const [cs] = useStyles(styles)

  return (
    <div className={cs('viewedProduct')}>
        <div className=''>
            <h2 className={cs('heading')}>{title}</h2>
        </div>
        <div className={cs('productListWrap')}>
            <ul ref={trackRef} className={cs('productList')}>
                {productList.length && productList.map((item, index) => (
                    <li key={index} ref={(el) => itemRefs.current.push(el)} className={cs('productItem')} >
                        <a href={item.products.href} className={cs('productLink')}>
                            <div className={cs('productLinkWrap')}>
                                <div className={cs('productWrapImg')}>
                                    <img src={item.products.src} className={cs('productImg')}/>
                                </div>
                                <div className={cs('productInfo')}>
                                    <h3 className={cs('productHeading')}>{item.products.name}</h3>
                                    <del className={cs('productPriceDefault')}>{item.products.price}</del>
                                    <div className={cs('productPriceSale')}>
                                        <span className={cs('priceSale')}>{item.products.priceSale}</span>
                                        <span className={cs('percentSale')}>{`-${item.products.salePercent}%`}</span>
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
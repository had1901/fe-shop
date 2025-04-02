import React, { useEffect, useRef } from 'react'
import styles from './ViewedProduct.module.scss';
import clsx from "clsx";
import { useSlider } from '../../hooks/useSlider';
import Button from '../button/Button';
import { useResponsive } from '../../hooks/useResponsive';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { viewedProduct } from './../viewedProduct/_viewedProduct';

function ViewedProduct({ title }) {
    const btnLeftRef = useRef()
    const btnRightRef = useRef()
    const itemRefs = useRef([])
    
    const numDisplay = useResponsive()
    const {trackRef, prevSlide, nextSlide} = useSlider(viewedProduct.length, numDisplay)

  return (
    <div className={clsx(styles.viewedProduct)}>
        <div className=''>
            <h2 className={clsx(styles.heading)}>{title}</h2>
        </div>
        <div className={clsx(styles.productListWrap)}>
            <ul ref={trackRef} className={clsx(styles.productList)}>
                {viewedProduct.length && viewedProduct.map(product => (
                    <li ref={(el) => itemRefs.current.push(el)} className={clsx(styles.productItem)} >
                        <a href={product.href} className={clsx(styles.productLink)}>
                            <div className={clsx(styles.productLinkWrap)}>
                                <div className={clsx(styles.productWrapImg)}>
                                    <img src={product.src} className={clsx(styles.productImg)}/>
                                </div>
                                <div className={clsx(styles.productInfo)}>
                                    <h3 className={clsx(styles.productHeading)}>{product.name}</h3>
                                    <del className={clsx(styles.productPriceDefault)}>{product.price}</del>
                                    <div className={clsx(styles.productPriceSale)}>
                                        <span className={clsx(styles.priceSale)}>{product.priceSale}</span>
                                        <span className={clsx(styles.percentSale)}>{`-${product.salePercent}%`}</span>
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
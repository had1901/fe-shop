import React, { useEffect, useRef, useState } from 'react'
import styles from './ProductList.module.scss';
import ProductCard from '../productCard/ProductCard';
import Button from '../button/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdLocalShipping } from "react-icons/md";
import useStyles from '../../hooks/useStyles';
import { CgLayoutGrid } from 'react-icons/cg';
import { useSlider } from '~/hooks/useSlider';

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


function ProductList({ products, title, numberDisplay, noHeading }) {
  const cs = useStyles(styles)
  const cardRef = useRef([])
  const [isActive, setIsActive] = useState(false)
  // const [move, setMode] = useState(0)
  const {trackRef, prevSlide, nextSlide, setWidthTrack, setCurrentSlide, widthTrack, widthItem} = useSlider(products.length, numberDisplay, isActive)


  const handleScroll = () => {
    const index = Math.round(trackRef.current.scrollLeft / cardRef.current[0].offsetWidth)
    setCurrentSlide(index)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger) 
    const ctx = gsap.context(() => {
      cardRef.current.forEach((element, index) => {
        if (!element) return
  
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          position: 'relative',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            // markers: true,
          }
        })
      })
    },cardRef)
  
    return () => ctx.revert()
  },[products])

  return (
    <section className={cs('product_list', 'row')}>
      <div className='col gx-xxl-2 gx-xl-2 gx-lg-2 gx-md-0 gx-sm-0 gx-mn-0'>
        <div className={cs('content')}>
          <div className={cs('header')} hidden={noHeading ? true : false}>
            <div className={cs('top')} >
              <h3 className={cs('heading')}>{title}</h3>
              <span className={cs('pay_method')}>
                <i className={cs('icon')}><MdLocalShipping /></i>
                <span className={cs('text')}>{products?.method}</span>
              </span>
            </div>
            {/* <ul className={cs('pc_list')}>
              {productList.map((brand) => (
                <li key={brand} className={cs('pc_item')}>
                  <a href='#' className={cs('pc_item_link')}>{brand}</a>
                </li>
                
              ))}
                <li className={cs('pc_item')}>
                  <a href='#' className={cs('pc_item_link')}>Xem tất cả</a>
                </li>
            </ul> */}
          </div>
          <div className={cs('sliders')}>
            <div 
              ref={trackRef}  
              className={cs('slider_track')} 
              onMouseDown={() => setIsActive(true)}
              onMouseUp={() => setIsActive(false)}
              onTouchStart={() => setIsActive(true)}
              onTouchEnd={() => setIsActive(false)}
              onScroll={handleScroll}
              // style={{ transform: `translateX: ${move}px`}}
            >
              {products.length > 0 && products.map((item, i) => (
                <ProductCard 
                      key={i} 
                      ref={el => cardRef.current[i] = el} 
                      productItem={item} 
                      columnValue={numberDisplay} 
                      hasTechnical 
                      hasLabelTop 
                    />
              ))}
              <Button onclick={prevSlide} content={<FaChevronLeft/>} customClass='btn-slider btn-left-products' />
              <Button onclick={nextSlide} content={<FaChevronRight/>} customClass='btn-slider btn-right-products' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductList
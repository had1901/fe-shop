import React, { useRef } from 'react'
import styles from './ProductList.module.scss';
import ProductCard from '../productCard/ProductCard';
import { useSlider } from '../../hooks/useSlider';
import Button from '../button/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdLocalShipping } from "react-icons/md";
import useStyles from '../../hooks/useStyles';



function ProductList({ products, numberDisplay, noHeading }) {
  const cardRef = useRef()
  const {trackRef, prevSlide, nextSlide} = useSlider(products.length, numberDisplay)
  const [ cs ] = useStyles(styles)
  return (
    <section className={cs('product_list')}>
      <div className={cs('content')}>
        <div className={cs('header')} hidden={noHeading ? true : false}>
          <div className={cs('top')} >
            <h3 className={cs('heading')}>{products.title}</h3>
            <span className={cs('pay_method')}>
              <i className={cs('icon')}><MdLocalShipping /></i>
              <span className={cs('text')}>{products.method}</span>
            </span>
          </div>
          <ul className={cs('pc_list')}>
            {products.brands.map((brand, index) => (
              <li key={index} className={cs('pc_item')}>
                <a href='#' className={cs('pc_item_link')}>{brand}</a>
              </li>
              
            ))}
              <li className={cs('pc_item')}>
                <a href='#' className={cs('pc_item_link')}>Xem tất cả</a>
              </li>
          </ul>
        </div>
        <div className={cs('sliders')}>
          <div ref={trackRef} className={cs('slider_track')}>
              {
                products.products.map((product, index) => (
                  <ProductCard key={index} ref={cardRef} productItem={product} columnValue={numberDisplay} hasTechnical hasLabelTop />
                ))
              }
              <Button onclick={prevSlide} content={<FaChevronLeft/>} customClass='btn-slider btn-left-products' />
              <Button onclick={nextSlide} content={<FaChevronRight/>} customClass='btn-slider btn-right-products' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductList
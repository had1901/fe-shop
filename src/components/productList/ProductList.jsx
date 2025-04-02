import React, { useEffect, useRef } from 'react'
import ViewedProduct from '../viewedProduct/ViewedProduct'
import styles from './ProductList.module.scss';
import clsx from "clsx";
import { viewedProduct } from './../viewedProduct/_viewedProduct';
import ProductCard from '../productCard/ProductCard';
import { useSlider } from '../../hooks/useSlider';
import Button from '../button/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdLocalShipping } from "react-icons/md";


function ProductList({ title, children }) {
  const cardRef = useRef()
  const {index, trackRef, prevSlide, nextSlide, percent} = useSlider(viewedProduct.length, 5)
  useEffect(() => {
    if(cardRef.current) {
      const cardPadding = getComputedStyle(cardRef.current).getPropertyValue("--column");
      console.log("Padding của product_card:", cardPadding);
    }
  }, [])
  return (
    <section className={clsx(styles.product_list)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.header)}>
          <div className={clsx(styles.top)}>
            <h3 className={clsx(styles.heading)}>PC bán chạy</h3>
            <span className={clsx(styles.pay_method)}>
              <i className={clsx(styles.icon)}><MdLocalShipping /></i>
              <span className={clsx(styles.text)}>Trả góp 0%</span>
            </span>
          </div>
          <ul className={clsx(styles.pc_list)}>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC I3</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC I5</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC I7</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC I9</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC R5</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC R7</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>PC R9</a>
            </li>
            <li className={clsx(styles.pc_item)}>
              <a href='#' className={clsx(styles.pc_item_link)}>Xem tất cả</a>
            </li>
          </ul>
        </div>
        <div className={clsx(styles.sliders)}>
          <div ref={trackRef} className={clsx(styles.slider_track)}>
              {
                viewedProduct.map((product, index) => (
                  <ProductCard key={product.id} ref={cardRef} productItem={product} hasTechnical hasLabelTop />
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
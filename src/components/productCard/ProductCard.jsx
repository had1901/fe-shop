import React, { forwardRef, useEffect, useRef } from 'react'
import styles from './ProductCard.module.scss';
import { BsCpuFill } from "react-icons/bs";
import { PiGraphicsCard } from "react-icons/pi";
import { BsGpuCard } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { PiHardDrivesFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import useStyles from '~/hooks/useStyles';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setProduct } from '../../store/product/productSlice';
import { convertStringToUrl } from '../../utils/convertString/_convertStringToUrl';
import { convertPrice } from './../../utils/convertString/_convertPrice';
import axiosApi from '../../services/axios';


const ProductCard = memo(forwardRef(({ 
  productItem, 
  columnValue = 5,  
  hasTechnical, 
  hasFlashSale, 
  hasLabelTop, 
}, ref) => {
  const imgRef = useRef()
  const cs = useStyles(styles)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleGetProduct = async (item) => {
    dispatch(setProduct(item))
    navigate(`products/${convertStringToUrl(item.name)}`)

  }

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1,
  //   }
  //   const observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach(entry => {
  //       if(entry.isIntersecting && entry.target.dataset.src) {
  //         entry.target.style.backgroundColor = 'red'
  //         entry.target.src = entry.target.dataset.src

  //       } else {
  //         entry.target.style.backgroundColor = ''

  //       }
        
  //     })
  //   }, options)

  //   observer.observe(imgRef.current)

  // },[])

  return (
    <div ref={ref} onClick={() => handleGetProduct(productItem)} className={cs('product_card')} draggable="false" style={{"--column": `${columnValue}`}}>
      <div className={cs('product_card_bg')}>
        {hasLabelTop && 
          <div className={cs('product_label_top')}>
            <label className={cs('product_label_tag')}></label>
          </div>
        }
        <picture className={cs('product_card_img')}>
          <img ref={imgRef} src={productItem.thumbnail} alt={productItem.thumbnail} data-src={productItem.thumbnail} data-id={productItem.src}/>
        </picture>
        <div className={cs('product_card_bottom')}>
          <div className={cs('product_label')}>
            <span className={cs('product_label_tag_new')}>Sản phẩm mới</span>
          </div>
          <div className={cs('product_desc')}>
            <a href=''>{productItem.name}</a>
          </div>
          {hasTechnical && productItem.indexTech &&
            <div className={cs('technical')}>
              {productItem.indexTech?.map((tech) => (
                <div key={tech} className={cs('technical_item')}>
                  <i><BsCpuFill /></i>
                  <span className={cs('technical_label')}>{tech}</span>
                </div>
              ))}
            </div>
          }
          <div className={cs('price')}>
            <del className={cs('price_default')}>{convertPrice(productItem.price)}</del>
            <div className={cs('price_sale')}>
              <span className={cs('price_sale_main')}>{convertPrice(productItem.sale_price)}</span>
              <span className={cs('price_sale_percent')}>{`-${productItem.sale_percent}%`}</span>
            </div>
          </div>
          <div className={cs('product_rating')}>
            <span className={cs('product_rating_number')}>{productItem.rating_count}</span>
            <span className={cs('product_rating_icon')}><FaStar /></span>
            <span className={cs('product_rating_count')}>(0 đánh giá)</span>
          </div>
          {hasFlashSale &&
            <div className={cs('process')}>
              <span className={cs('process_icon')}><FaGripfire /></span>
              <span className={cs('process_text')}>Đã bán: {productItem.soldQuantity}</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}))

export default ProductCard
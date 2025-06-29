import React, { forwardRef, useRef } from 'react'
import styles from './ProductCard.module.scss';
import { BsCpuFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import useStyles from '~/hooks/useStyles';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import { setProduct } from '../../store/product/productSlice';
import { convertStringToUrl } from '../../utils/convertString/_convertStringToUrl';
import { convertPrice } from './../../utils/convertString/_convertPrice';
import { IoGiftSharp } from 'react-icons/io5';


const ProductCard = memo(forwardRef(({ 
  productItem, 
  columnValue = 5,  
  hasTechnical, 
  hasFlashSale, 
  hasLabelTop,
  linkTo, 
}, ref) => {
  const imgRef = useRef()
  const cs = useStyles(styles)
  
  return (
    <Link 
      to={linkTo || `/product/${productItem.id}/${convertStringToUrl(productItem.name)}`}
      ref={ref} 
      className={cs('product_card')} 
      style={{"--column": `${columnValue}`}}
      draggable="false" 
    >
      <div className={cs('product_card_bg')}>
        {hasLabelTop && 
          <div className={cs('product_label_top')}>
            <label className={cs('product_label_tag')}>Quà tặng HOT</label>
            <IoGiftSharp className={cs('icon-gift')} />
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
            <h3>{productItem.name}</h3>
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
    </Link>
  )
}))

export default ProductCard
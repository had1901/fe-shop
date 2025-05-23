import React, { forwardRef, useEffect } from 'react'
import styles from './ProductCard.module.scss';
import { BsCpuFill } from "react-icons/bs";
import { PiGraphicsCard } from "react-icons/pi";
import { BsGpuCard } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { PiHardDrivesFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";
import useStyles from '~/hooks/useStyles';

const ProductCard = forwardRef(({ 
  productItem, 
  columnValue = 5,  
  hasTechnical, 
  hasFlashSale, 
  hasLabelTop, 
}, ref) => {

  const [cs] = useStyles(styles)
  
  return (
    <div ref={ref} className={cs('product_card')} draggable="false" style={{"--column": `${columnValue}`}}>
      <div className={cs('product_card_bg')}>
        {hasLabelTop && 
          <div className={cs('product_label_top')}>
            <label className={cs('product_label_tag')}></label>
          </div>
        }
        <picture className={cs('product_card_img')}>
          <img src={productItem.src} alt={productItem.src} />
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
              {productItem.indexTech?.map((tech, index) => (
                <div key={index} className={cs('technical_item')}>
                  <i><BsCpuFill /></i>
                  <span className={cs('technical_label')}>{tech}</span>
                </div>
              ))}
            </div>
          }
          <div className={cs('price')}>
            <del className={cs('price_default')}>{productItem.priceDefault}</del>
            <div className={cs('price_sale')}>
              <span className={cs('price_sale_main')}>{productItem.priceSale}</span>
              <span className={cs('price_sale_percent')}>{`-${productItem.salePercent}%`}</span>
            </div>
          </div>
          <div className={cs('product_rating')}>
            <span className={cs('product_rating_number')}>{productItem.ratingCount}</span>
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
})

export default ProductCard
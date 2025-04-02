import React, { forwardRef, useEffect } from 'react'
import styles from './ProductCard.module.scss';
import clsx from "clsx";
import { BsCpuFill } from "react-icons/bs";
import { PiGraphicsCard } from "react-icons/pi";
import { BsGpuCard } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { PiHardDrivesFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaGripfire } from "react-icons/fa";

const ProductCard = forwardRef(({ productItem, columnValue = 5, key, hasTechnical, hasFlashSale, hasLabelTop }, ref) => {
  useEffect(() => {
    
  }, [])
  return (
    <div ref={ref} key={key} className={clsx(styles.product_card)} draggable="false" style={{"--column": `${columnValue}`}}>
      <div className={clsx(styles.product_card_bg)}>
        {hasLabelTop && 
          <div className={clsx(styles.product_label_top)}>
            <label className={clsx(styles.product_label_tag)}></label>
          </div>
        }
        <picture className={clsx(styles.product_card_img)}>
          <img src={productItem.src} alt={productItem.src} />
        </picture>
        <div className={clsx(styles.product_card_bottom)}>
          <div className={clsx(styles.product_label)}>
            <span className={clsx(styles.product_label_tag_new)}>Sản phẩm mới</span>
          </div>
          <div className={clsx(styles.product_desc)}>
            <a href=''>{productItem.name}</a>
          </div>
          {hasTechnical && 
            <div className={clsx(styles.technical)}>
              <div className={clsx(styles.technical_item)}>
                <i><BsCpuFill /></i>
                <span className={clsx(styles.technical_label)}>i3 10100F</span>
              </div>
              <div className={clsx(styles.technical_item)}>
                <i><PiGraphicsCard /></i>
                <span className={clsx(styles.technical_label)}>RTX 4060</span>
              </div>
              <div className={clsx(styles.technical_item)}>
                <i><BsGpuCard /></i>
                <span className={clsx(styles.technical_label)}>B760</span>
              </div>
              <div className={clsx(styles.technical_item)}>                     
                <i><IoCardOutline /></i>
                <span className={clsx(styles.technical_label)}>16GB</span>
              </div>
              <div className={clsx(styles.technical_item)}>
                <i><PiHardDrivesFill /></i>
                <span className={clsx(styles.technical_label)}>1TB</span>
              </div>
            </div>
          }
          <div className={clsx(styles.price)}>
            <del className={clsx(styles.price_default)}>{productItem.priceDefault}</del>
            <div className={clsx(styles.price_sale)}>
              <span className={clsx(styles.price_sale_main)}>{productItem.priceSale}</span>
              <span className={clsx(styles.price_sale_percent)}>{`-${productItem.salePercent}%`}</span>
            </div>
          </div>
          <div className={clsx(styles.product_rating)}>
            <span className={clsx(styles.product_rating_number)}>{productItem.ratingCount}</span>
            <span className={clsx(styles.product_rating_icon)}><FaStar /></span>
            <span className={clsx(styles.product_rating_count)}>(0 đánh giá)</span>
          </div>
          {hasFlashSale &&
            <div className={clsx(styles.process)}>
              <span className={clsx(styles.process_icon)}><FaGripfire /></span>
              <span className={clsx(styles.process_text)}>Đã bán: {productItem.soldQuantity}</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
})

export default ProductCard
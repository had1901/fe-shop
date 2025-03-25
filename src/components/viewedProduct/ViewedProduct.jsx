import React from 'react'
import styles from './ViewedProduct.module.scss';
import clsx from "clsx";

function ViewedProduct({ products }) {
  return (
    <div className={clsx(styles.viewedProduct)}>
        <div>
            <h2 className={clsx(styles.heading)}>Sản phẩm đã xem</h2>
        </div>
        <ul className={clsx(styles.productList)}>
            {products.length && products.map(product => (
                <li className={clsx(styles.productItem)}>
                    <a href={product.href} className={clsx(styles.productLink)}>
                        <div className={clsx(styles.productLinkWrap)}>
                            <div className={clsx(styles.productWrapImg)}>
                                <img src={product.srcImg} className={clsx(styles.productImg)}/>
                            </div>
                            <div className={clsx(styles.productInfo)}>
                                <h3 className={clsx(styles.productHeading)}>{product.title}</h3>
                                <del className={clsx(styles.productPriceDefault)}>{product.price}</del>
                                <div className={clsx(styles.productPriceSale)}>
                                    <span className={clsx(styles.priceSale)}>{product.priceSale}</span>
                                    <span className={clsx(styles.percentSale)}>{product.percentSale}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            ))}
            
        </ul>
    </div>
  )
}

export default ViewedProduct
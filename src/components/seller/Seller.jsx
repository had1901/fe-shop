import React from 'react'
import { productList } from '../../api/_products'
import viewMore from '../../assets/seller/laptop/brand/xem-them.webp'
import bestSeller from '../../../assets/seller/laptop/brand/best-seller.webp'
import { Link } from 'react-router'
import ProductList from '../../../components/productList/ProductList'
import useStyles from '../../hooks/useStyles'
import styles from './SellerLaptop.module.scss'

function Seller() {
    const [cs] = useStyles(styles)
  return (
    <section className={cs('bottom')}>
            <div className="container">
                <div className='title-banner'>
                    <Link to='#' className={cs('banner_best_seller')}>
                        <img src={bestSeller}/>
                    </Link>
                </div>
                <div className={cs('products')}>
                    <ul className={cs('product_listing')}>
                        {productList.slice(0,1).map((products, index) => (
                            <ProductList 
                                key={index} 
                                products={products} 
                                numberDisplay={6}
                                noHeading
                            />
                        ))}
                    </ul>
                </div>
                <div>
                    <img src={viewMore} alt="Xem thêm" className={cs('btn_more')} />
                </div>
            </div>
        </section>
  )
}

export default Seller
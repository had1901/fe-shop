import React, { useEffect, useState } from 'react'
import viewMore from '~/assets/seller/laptop/brand/xem-them.webp'
import bestSeller from '~/assets/seller/laptop/brand/best-seller.webp'
import { Link } from 'react-router'
import ProductList from '~/components/productList/ProductList'
import useStyles from '~/hooks/useStyles'
import styles from './Seller.module.scss'
import axiosApi from '../../services/axios'

function Seller({ category }) {
    const cs = useStyles(styles)
    const [data, setDate] = useState([])

    useEffect(() => {
        const fetchProductByCategory = async () => {
            const res = await axiosApi.get(`api/get-product-type?category=${category}`)
            if(res?.ec === 0 && res.dt) {
                setDate(res.dt)
            }
        }
        fetchProductByCategory() 
    },[category])

  return (
    <section className={cs('bottom')}>
            <div className="container">
                <div className='title-banner'>
                    <Link to='#' className={cs('banner_best_seller')}>
                        <img loading='lazy' src={bestSeller}/>
                    </Link>
                </div>
                <div className={cs('products')}>
                    <ul className={cs('product_listing')}>
                        <ProductList products={data} numberDisplay={5} noHeading />
                    </ul>
                </div>
                <div>
                    <img loading='lazy' src={viewMore} alt="Xem thêm" className={cs('btn_more')} />
                </div>
            </div>
        </section>
  )
}

export default Seller
import React, { useEffect, useState } from 'react'
import viewMore from '../../assets/hero/xem-them.png'
import laptop_office_promotion from '../../assets/hero/laptop-office/promotion.png'
import laptop_gaming_promotion from '../../assets/hero/laptop-gaming/promotion.png'
import { Link } from 'react-router'
import ProductList from '~/components/productList/ProductList'
import useStyles from '~/hooks/useStyles'
import styles from './Seller.module.scss'
import axiosApi from '../../services/axios'
import { useResponsive } from '~/hooks/useResponsive';
import FilterAdmin from '../filter/FilterAdmin'

function Seller({ category, album }) {
    const cs = useStyles(styles)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState([])
    const numberDisplay = useResponsive()
    console.log('filter', filter)
    console.log(data)
    const renderBanner = () => {
        switch(album){
            case 'laptop-office':
                return <img loading='lazy' src={laptop_office_promotion} alt='banner-promotion' />
            case 'laptop-gaming':
                return <img loading='lazy' src={laptop_gaming_promotion} alt='banner-promotion' />
            // case 'pc-gaming':
            //     return <img loading='lazy' src={pc_gaming} alt='banner' />
            // case 'screen':
            //     return <img loading='lazy' src={man_hinh} alt='banner' />
        }
      }
    useEffect(() => {
        const fetchProductByCategory = async () => {
            const res = await axiosApi.get(`api/get-product-type?category=${category}`)
            if(res?.ec === 0 && res.dt) {
                setData(res.dt)
            }
        }
        fetchProductByCategory() 
    },[category])

  return (
    <section className={cs('bottom')}>
            <div className="container">
                <div className='title-banner'>
                    <Link to='#' className={cs('banner_best_seller')}>
                        {renderBanner()}
                    </Link>
                </div>
                <div className={cs('filter')}>
                    <FilterAdmin 
                        data={data}
                        setLoading={setLoading} 
                        setFiltered={setFilter}
                    />
                </div>
                <div className={cs('products')}>
                    <ul className={cs('product_listing')}>
                        <ProductList products={filter} numberDisplay={numberDisplay} noHeading />
                    </ul>
                </div>
                <div className={cs('banner-view-more')}>
                    <img loading='lazy' src={viewMore} alt="Xem thêm" className={cs('btn_more')} />
                </div>
            </div>
        </section>
  )
}

export default Seller
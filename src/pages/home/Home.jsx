import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Link } from "react-router"
import styles from './Home.module.scss';
import clsx from "clsx";
import { bannerListBottom } from './../../components/bannerSale/_bannerSale';
import BannerSale from '../../components/bannerSale/BannerSale';
import FlashSale from '../../components/flashSale/FlashSale';
import BannerMid from '../../components/bannerMid/BannerMid';
import ViewedProduct from '../../components/viewedProduct/ViewedProduct';
import ProductList from '../../components/productList/ProductList';
import BannerDisplay from '../../components/bannerDisplay/BannerDisplay';
import CategoryProducts from '../../components/categoryProducts/CategoryProducts';
import SidebarMenu from '../../layouts/sidebar/SidebarMenu';
import SidebarRight from '../../layouts/sidebar/SidebarRight';
import News from '../../components/news/News';
import { useResponsive } from '~/hooks/useResponsive';
import axiosApi from './../../services/axios';
import useStyles from '../../hooks/useStyles';
// const apiUrl = import.meta.env.VITE_API_URL

console.log("MODE:", import.meta.env.MODE)
console.log("API URL:", import.meta.env.VITE_API_URL)

function HomePage() {
  const cs = useStyles(styles)
  const numberDisplay = useResponsive()
  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const [listProductSale, setProductSale] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const products =  await axiosApi.get('api/get-all-product')
      setData(products.dt)
    }
    const getProductFlashSale = async () => {
      const products = await axiosApi.get('api/get-all-product')
      if(products) {
          const filterFlashSale = products.dt.filter(item => item.flash_sale === 1) 
          setProductSale(filterFlashSale)
      }
    }
    getProducts()
    getProductFlashSale()
  },[])

    
  useEffect(() => {
      
  },[])
  useLayoutEffect(() => {
    const groupedByCategory = data.reduce((acc, product) => {
      const categoryId = product.category_id
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: product.Category, 
          items: []
        }
      }
      acc[categoryId].items.push(product)
      return acc
    }, {})
    const resultArray = Object.values(groupedByCategory)
    setProducts(resultArray)
  },[data])


  return (
      <main className={cs('app')}>
            <div className={cs('app-main')}>
              <div className='container'>
                  <div className='row'>
                    <SidebarMenu></SidebarMenu>
                    <SidebarRight></SidebarRight>
                  </div>
                  <BannerSale bannerList={bannerListBottom}/>
                  <ViewedProduct title='Sản phẩm đã xem' />
                  <FlashSale />
                  <BannerMid />
                  <ProductList products={products[4]?.items || []} numberDisplay={numberDisplay} title='PC bán chạy' method='Trả góp 0%'/>           
                  <ProductList products={products[3]?.items || []} numberDisplay={numberDisplay} title='Laptop bán chạy' method='Trả góp 0%'/>               
                  <ProductList products={products[0]?.items || []} numberDisplay={numberDisplay} title='Màn hình bán chạy' method='Trả góp 0%'/>               
                  <ProductList products={products[1]?.items || []} numberDisplay={numberDisplay} title='Bàn phím bán chạy' method='Trả góp 0%'/>  
                  
                  <BannerDisplay />  
                  <CategoryProducts />
                  <News />
                </div>
            </div>
      </main>
  )
}

export default HomePage
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../button/Button';
import ProductCard from '../productCard/ProductCard';
// import { listProductSale } from './_flashSale';
import styles from './FlashSale.module.scss';
import { IoIosFlash } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import useStyles from '~/hooks/useStyles';
import axiosApi from '../../services/axios';
import TabDate from './TabDate';
import { useResponsive } from '../../hooks/useResponsive';

function FlashSale() {
    // const [currentIndex, setCurrentIndex] = useState(0)
    const productContentRef = useRef()
    const productSaleRef = useRef()
    const flashSaleRef = useRef()
    const itemRef = useRef([])
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState()
    const [startScrollLeft, setStartScrollLeft] = useState()
    const [isClick, setIsClick] = useState(false)
    const [data, setData] = useState([])
    const cs = useStyles(styles)
    const numberDisplay = useResponsive()
    
    const handleDragStop = () => {
        setIsDragging(false)
    }

    const handleDragStart = (e) => {
        setIsDragging(true)
        setStartX(e.pageX)
        setStartScrollLeft(productSaleRef.current.scrollLeft)
    }

    const handleDragMove = (e) => {
        if (!productSaleRef.current) return
        if(!isDragging) return
        productSaleRef.current.scrollLeft = startScrollLeft - (e.pageX - startX)
    }

    const prevSlide = () => {
        if(isClick) return
        if(itemRef.current[0]) {
            setIsClick(true)
            let width = Math.round(productSaleRef.current.getBoundingClientRect().width)
            productSaleRef.current.scrollTo({
                left: productSaleRef.current.scrollLeft - width,
                behavior: 'smooth'
            })
        }
        setTimeout(() => {
            setIsClick(false)
        }, 500)
    }

    const nextSlide = useCallback(() => {
        if(isClick) return
        if(itemRef.current[0]) {
            setIsClick(true)
            let width = Math.round(productSaleRef.current.getBoundingClientRect().width)
            productSaleRef.current.scrollTo({
                left: productSaleRef.current.scrollLeft + width,
                behavior: 'smooth'
            })
        }
        setTimeout(() => {
            setIsClick(false)
        }, 500)
    }, [isClick])

    const getDateNow = () => {
        const now = new Date()
        const day = now.getDate()
        const month = now.getMonth() + 1
        return `${day}/${month}`
    }

    

    useEffect(() => {
        window.addEventListener("mouseup", handleDragStop)
        window.addEventListener("mouseleave", handleDragStop)
        return () => {
            window.removeEventListener("mouseup", handleDragStop)
            window.removeEventListener("mouseleave", handleDragStop)
        }
    }, [])

    // auto loop
    useEffect(() => {
        // const slider = productSaleRef.current

        // const timer = setInterval(() => {
        //     nextSlide()
        // }, 3000)

        // const stopInterval = () => {
        //     clearInterval(timer)
        //     console.log('stop')
        // }
        // // const startInterval = () => {
        // // }
        // // slider.addEventListener('mouseenter', stopInterval)
        // // slider.addEventListener('mouseleave', startInterval)
        
        // return () => {
        //     clearInterval(timer)
        //     if(slider) {
        //         slider.removeEventListener('mouseenter', stopInterval)
        //     }
        // }
    }, [nextSlide])

    useEffect(() => {
        const getProductFlashSale = async () => {
            const products = await axiosApi.get('api/get-all-product')
            if(products) {
                const filterFlashSale = products.dt.filter(item => item.flash_sale === true) 
                setData(filterFlashSale)
            }
        }
        getProductFlashSale()
    },[])

  return (
    <div ref={flashSaleRef} className={cs('flashSale')}>
        <div className={cs('flash_sale_body')}>
            <div className={cs('flash_sale_content')}>
                <section className={cs('heading')}>
                    <div className={cs('wrap')}>
                        {/* <TabDate /> */}
                        <i className={cs('icon')}><IoIosFlash /></i>
                        <h3 className={cs('title')}>Flash sale 10h mỗi ngày</h3>
                        <Button content={getDateNow()} customClass='btnFlashSale' isLink />
                    </div>
                </section>
                <section ref={productContentRef} className={cs('content_sale')}>
                    {/* <div><Button content='Flash sale' customStyle='btnFlashSale' /></div> */}
                    <div className={cs('wrap_product_sale')}>
                        <div 
                            ref={productSaleRef} 
                            onMouseUp={handleDragStop} 
                            onMouseDown={handleDragStart} 
                            onMouseMove={handleDragMove} 
                            className={cs(`list_product_sale ${isDragging && 'dragging'}`)}
                        >
                            {data.map((product, i) => (
                                <ProductCard 
                                    key={i} 
                                    ref={(el) => itemRef.current[i] = el} 
                                    columnValue={numberDisplay} 
                                    productItem={product} 
                                    hasFlashSale
                                />
                            ))}
                        </div>
                        <Button onclick={prevSlide} content={<FaChevronLeft/>} customClass='btn-slider btn-prev-sale' />
                        <Button onclick={nextSlide} content={<FaChevronRight/>} customClass='btn-slider btn-next-sale' />
                    </div>
                </section>
                <div className={cs('list_product_more')}>
                    <Button content='Xem thêm khuyến mãi' customClass='btn_view_more' isLink />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FlashSale
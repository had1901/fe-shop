import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../button/Button';
import ProductCard from '../productCard/ProductCard';
import { listProductSale } from './_flashSale';
import styles from './FlashSale.module.scss';
import clsx from "clsx";
import { IoIosFlash } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

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
            // let width = Math.round(itemRef.current[0].getBoundingClientRect().width)
            // let nextIndex = Math.round(productSaleRef.current.scrollLeft / width) - 1
            // if(productSaleRef.current.scrollLeft % width !== 0) {
            //     productSaleRef.current.scrollTo({
            //         left: Math.ceil(nextIndex * width),
            //         behavior: 'smooth'
            //     })
            // } else {
            //     productSaleRef.current.scrollTo({
            //         left: nextIndex * width,
            //         behavior: 'smooth'
            //     })
            //     setCurrentIndex(prev => prev - 1)
            // }
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

    useEffect(() => {
        window.addEventListener("mouseup", handleDragStop)
        window.addEventListener("mouseleave", handleDragStop)
        return () => {
            window.removeEventListener("mouseup", handleDragStop)
            window.removeEventListener("mouseleave", handleDragStop)
        }
    }, [])

    useEffect(() => {
        const slider = productSaleRef.current

        const timer = setInterval(() => {
            nextSlide()
        }, 3000)

        const stopInterval = () => {
            clearInterval(timer)
            console.log('stop')
        }
        // const startInterval = () => {
        // }
        // slider.addEventListener('mouseenter', stopInterval)
        // slider.addEventListener('mouseleave', startInterval)
        
        return () => {
            clearInterval(timer)
            if(slider) {
                slider.removeEventListener('mouseenter', stopInterval)
            }
        }
    }, [nextSlide])

  return (
    <div ref={flashSaleRef} className={clsx(styles.flashSale)}>
        <div className={clsx(styles.flash_sale_body)}>
            <div className={clsx(styles.flash_sale_content)}>
                <section className={clsx(styles.heading)}>
                    <div className={clsx(styles.wrap)}>
                        <div className={clsx(styles.tabCountDown)}>
                            <span className={clsx(styles.countDown)}>00</span>
                            <span className={clsx(styles.countDownDot)}>:</span>
                            <span className={clsx(styles.countDown)}>00</span>
                            <span className={clsx(styles.countDownDot)}>:</span>
                            <span className={clsx(styles.countDown)}>00</span>
                            <span className={clsx(styles.countDownDot)}>:</span>
                            <span className={clsx(styles.countDown)}>00</span>
                        </div>
                        <i className={clsx(styles.icon)}><IoIosFlash /></i>
                        <h3 className={clsx(styles.title)}>Flash sale 10h mỗi ngày</h3>
                        <Button content='25/3' customClass='btnFlashSale' isLink />
                    </div>
                </section>
                <section ref={productContentRef} className={clsx(styles.content_sale)}>
                    {/* <div><Button content='Flash sale' customStyle='btnFlashSale' /></div> */}
                    <div    className={clsx(styles.wrap_product_sale)}>
                        <div 
                            ref={productSaleRef} 
                            onMouseUp={handleDragStop} 
                            onMouseDown={handleDragStart} 
                            onMouseMove={handleDragMove} 
                            className={clsx(styles.list_product_sale, { [styles.dragging]: isDragging})}
                        >
                            {listProductSale.map((product, i) => (
                                <ProductCard ref={(el) => itemRef.current[i] = el} key={i} columnValue={6} productItem={product} hasFlashSale />
                            ))}
                        </div>
                        <Button onclick={prevSlide} content={<FaChevronLeft/>} customClass='btn-slider btn-prev-sale' />
                        <Button onclick={nextSlide} content={<FaChevronRight/>} customClass='btn-slider btn-next-sale' />
                    </div>
                </section>
                <div className={clsx(styles.list_product_more)}>
                    <Button content='Xem thêm khuyến mãi' customClass='btn_view_more' isLink />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FlashSale
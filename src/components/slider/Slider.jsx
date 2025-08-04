import React, { useEffect, useRef, useState } from 'react'
import styles from './Slider.module.scss';
import clsx from "clsx";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import gsap from 'gsap';
import useStyles from '../../hooks/useStyles';



function Slider({ sliders }) {
    const cs = useStyles(styles)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const chevLeftRef = useRef(null)
    const chevRightRef = useRef(null)
    const sliderRef = useRef()

    // Click dot change slide
    const handleChangeSlider = (index) => {
        setCurrentIndex(index)
    }

    // Button prev - next slide
    const handlePrev = () => {
        if(isAnimating) return 
        console.log('Prev', currentIndex)
        if(currentIndex > 0) {
            setIsAnimating(true)
            setCurrentIndex(prev => prev - 1)
        }
        
    }

    const handleNext= () => {
        if(isAnimating) return 
        console.log('Next', currentIndex)
        if(currentIndex < sliders.length - 1) {
            setIsAnimating(true)
            setCurrentIndex(prev => prev + 1)

        }
    }

    useEffect(() => {
        // Hide - show cursor
        if(currentIndex === sliders.length - 1) {
            if(chevRightRef.current) {
                chevRightRef.current.classList.add(styles.hiddenCursor)
            }
        }else {
            chevRightRef.current.classList.remove(styles.hiddenCursor)
        }
        
        if(currentIndex === 0) {
            if(chevLeftRef.current) {
                chevLeftRef.current.classList.add(styles.hiddenCursor)
            }
        } else {
            chevLeftRef.current.classList.remove(styles.hiddenCursor)
        }

        // Auto 
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % sliders.length)
        }, 4500)

        const timer = setTimeout(() => {
            setIsAnimating(false)
        }, 900)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [currentIndex, sliders.length])

    useEffect(() => {
        const slider = sliderRef.current
            if (!slider) return

            gsap.fromTo(
                slider, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power1.inOut',
                },
            )
            
        
    },[])
  return (
    <div ref={sliderRef} className={cs('slider')}>
        {sliders.map((img, index) => (
            <img 
                key={index} 
                src={img.src} 
                alt={img.id} 
                className={cs(`slider-img ${index === currentIndex && 'show'}`)}
            />
        ))}
        <ul className={cs('sliderDots')}>
            {sliders.map((_, index) => (
                <li key={index} className={cs('dot')}>
                    <button 
                        className={cs(`dot-btn ${index === currentIndex && 'active'}` )}
                        onClick={() => handleChangeSlider(index)}
                    >  
                    </button>
                </li>
            ))}
        </ul>
        <div className={cs('arrow')}>
            <button 
                ref={chevLeftRef}
                className={cs('arrowLeft chevron')}
                onClick={ handlePrev}
            ><FaChevronLeft /></button>
            <button 
                ref={chevRightRef}
                className={cs('arrowRight chevron')}
                onClick={handleNext}
            ><FaChevronRight /></button>
        </div>
    </div>
  )
}

export default Slider
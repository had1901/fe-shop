import React, { useEffect, useRef, useState } from 'react'
import styles from './Slider.module.scss';
import clsx from "clsx";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";



function Slider({ sliders }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const chevLeftRef = useRef(null)
    const chevRightRef = useRef(null)
    
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

  return (
    <div className={clsx(styles.slider)}>
        {sliders.map((img, index) => (
            <img 
                key={index} 
                src={img.src} 
                alt={img.id} 
                className={clsx(styles.sliderImg, { [styles.show]: index === currentIndex })}
            />
        ))}
        <ul className={clsx(styles.sliderDots)}>
            {sliders.map((_, index) => (
                <li className={clsx(styles.dot)}>
                    <button 
                        className={clsx(styles.dotBtn, { [styles.active]: index === currentIndex })}
                        onClick={() => handleChangeSlider(index)}
                    >  
                    </button>
                </li>
            ))}
        </ul>
        <div className={clsx(styles.arrow)}>
            <button 
                ref={chevLeftRef}
                className={clsx(styles.arrowLeft, styles.chevron)}
                onClick={ handlePrev}
            ><FaChevronLeft /></button>
            <button 
                ref={chevRightRef}
                className={clsx(styles.arrowRight, styles.chevron)}
                onClick={handleNext}
            ><FaChevronRight /></button>
        </div>
    </div>
  )
}

export default Slider
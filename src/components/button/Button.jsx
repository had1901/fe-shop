import React, { forwardRef } from 'react'
import styles from './Button.module.scss';
import clsx from "clsx";
console.log(styles)
const Button = forwardRef(({ content, customClass = '', isLink, onclick}, ref) => {
  return (
    <>
        {
            isLink 
           ? <a 
                ref={ref} 
                onClick={onclick} 
                href='#' 
                className={clsx(customClass.split(" ").map(cls => styles[cls]))}
            >
                {content}
            </a>
           : <button 
                ref={ref} 
                onClick={onclick} 
                className={clsx(customClass.split(" ").map(cls => styles[cls]))}
            >
                {content}
            </button>
        }
    </>
  )
})

export default Button
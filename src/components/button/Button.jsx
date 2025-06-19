import React, { forwardRef } from 'react'
import styles from './Button.module.scss';
import useStyles from '~/hooks/useStyles';


const Button = forwardRef(({ content, customClass = '', isLink, onclick}, ref) => {
  const cs = useStyles(styles)

  return (
    <>
        {
            isLink 
           ? <a 
                ref={ref} 
                onClick={onclick} 
                href='#' 
                className={cs(customClass)}
            >
                {content}
            </a>
           : <button 
                ref={ref} 
                onClick={onclick} 
                className={cs(customClass)}
            >
                {content}
            </button>
        }
    </>
  )
})

export default Button
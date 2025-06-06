import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Cart.module.scss'

function Cart() {
    const [cs] = useStyles(styles)
  return (
    <div className={cs('box-cart')}>
        <div className='container'>Cart</div>
    </div>
  )
}

export default Cart
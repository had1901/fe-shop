import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './CartPage.module.scss'
import Cart from '../../components/cart/Cart'

function CartPage() {
    const cs = useStyles(styles)
  return (
    <div className={cs('box-cart')}>
        <div className='container'>
          <Cart />
        </div>
    </div>
  )
}

export default CartPage
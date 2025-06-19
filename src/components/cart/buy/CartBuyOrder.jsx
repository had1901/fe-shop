
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './CartBuyOrder.module.scss'
import useStyles from '../../../hooks/useStyles'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { IoCard, IoShieldCheckmark } from 'react-icons/io5'
import { FaAddressCard, FaCheck } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import ProductCart from '../../productCart/ProductCart'
import { convertPrice } from '../../../utils/convertString/_convertPrice';
import { Link } from 'react-router'


function CartBuyOrder() {
    const cs = useStyles(styles)
    const carts = useSelector(state => state.cart.carts)
    console.log(carts)
  return (
        <div className={cs('form-cart')}>
            <div className={cs('cart-content')}>
                {carts.length > 0 
                    ? carts.map((item, i) => (
                        <ProductCart key={i} item={item} />
                    )) 
                    : 
                    <>
                        <p className={cs('cart-content-text')}>Giỏ hàng của bạn đang trống</p>
                        <Link to='/' className={cs('cart-content-link')}><button>Tiếp tục mua hàng</button></Link>
                    </>
                }
            </div>
        </div>
  )
}

export default CartBuyOrder

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


function CartBuyOrder({ currentStep, isLoading }) {
    const cs = useStyles(styles)
    const carts = useSelector(state => state.cart.carts)
    console.log('load', isLoading)
  return (
        <div className={cs('cart-order')}>
            <div className={cs('cart-content')}>
                {currentStep === 0 && carts.length > 0 && <h3 className={cs('heading')}>Giỏ hàng của bạn</h3>}
                {carts.length > 0 
                    ? (<div className={cs('cart-list')}>
                        <div className={cs((`spinner ${isLoading === true ? 'loading' : ''}`))}>
                            <div className={cs('loader-custom', 'loader')}></div> 
                        </div>
                        {carts.map((item, i) => (
                            <ProductCart key={i} item={item} />
                        ))}
                     </div>)
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
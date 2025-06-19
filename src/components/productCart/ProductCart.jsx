import React, { useEffect, useState } from 'react'
import styles from './ProductCart.module.scss'
import useStyles from '../../hooks/useStyles'
import { Link } from 'react-router'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteToCart, inCreaseQuantity, reduceQuantity } from '../../store/cart/cartSlice'
import axiosApi from '../../services/axios'

function ProductCart({ item }) {
    console.log(item)
    const cs = useStyles(styles)
    const dispatch = useDispatch()
    const quantity = useSelector(state => {
        const product = state.cart.carts.find(i => i.id === item.id)
        return product?.quantity || 1
    })

    const handleIncrease = async () => {
        dispatch(inCreaseQuantity({
            productId: item.id,
            quantity: 1
        }))
        await axiosApi.post('/update-cart', {productId: item.id, type: 'plus'})
    }
    
    const handleMinus = async () => {
        if(quantity > 1) {
            dispatch(reduceQuantity({
                productId: item.id,
                quantity: 1
            }))
        }
        await axiosApi.post('/update-cart', {productId: item.id, type: 'down'})
    }

    const handleRemove = () => {
        dispatch(deleteToCart(item.id))
    }
    
  return (
    <div className={cs('product-cart')}>
        <div className={cs('inner-product-cart')}>
            <div className={cs('product-cart-img')}>
                <Link to='#' className={cs('product-cart-img-link')}>
                    <img src={item.thumbnail} alt="" />
                </Link>
                <span className={cs('btn-delete')} onClick={handleRemove}>Xóa</span>
            </div>
            <div className={cs('product-cart-title')}>
                <h3>{item?.name} </h3>
            </div>
            <div className={cs('product-cart-price')}>
                <div className={cs('product-cart-price-sale')}>{convertPrice(item?.sale_price)}</div>
                <div className={cs('product-cart-price-origin')}>{convertPrice(item?.price)}</div>
                <div className={cs('product-cart-quantity')}>
                    <button onClick={handleMinus} type='button' className={cs('btn-plus btn-quantity')} style={{ color: `${quantity === 1 ? '#ccc' : ''}`, cursor: `${quantity === 1 ? 'not-allowed' : 'pointer'}`}}>-</button>
                    <input type='text' readOnly data-quantity={quantity} min='1' value={quantity} className={cs('input-quantity')} />
                    <button onClick={handleIncrease} type='button' className={cs('btn-down btn-quantity')}>+</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCart
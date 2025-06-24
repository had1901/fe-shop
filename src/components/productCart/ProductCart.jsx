import React, { useEffect, useState } from 'react'
import styles from './ProductCart.module.scss'
import useStyles from '../../hooks/useStyles'
import { Link } from 'react-router'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteToCart, inCreaseQuantity, reduceQuantity, setCarts, setLoading } from '../../store/cart/cartSlice'
import axiosApi from '../../services/axios'
import { Button, message, Popconfirm, Alert } from 'antd';
import { toast } from 'react-toastify'


function ProductCart({ item }) {
    const cs = useStyles(styles)
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.info)
    const quantity = useSelector(state => {
        const product = state.cart.carts.find(i => i.product?.id === item?.product?.id)
        return product?.quantity || 1
    })
    const isLoading = useSelector(state => state.cart.isLoading)

    const handleIncrease = async () => {
        // dispatch(inCreaseQuantity({
        //     productId: item.id,
        //     quantity: 1
        // }))
        dispatch(setLoading(true))
        const res = await axiosApi.post('/update-cart', {productId: item?.product?.id, type: 'plus', userId: user?.id})
        if(res.ec === 0) {
            setTimeout(() => {
                dispatch(setLoading(false)) 
            }, 1000)
        }
    }
    
    const handleMinus = async () => {
        // if(quantity > 1) {
        //     dispatch(reduceQuantity({
        //         productId: item.id,
        //         quantity: 1
        //     }))
        // }
        if(quantity > 1) {
            dispatch(setLoading(true))
            const res = await axiosApi.post('/update-cart', {productId: item?.product?.id, type: 'down', userId: user?.id})
            if(res.ec === 0) {
                setTimeout(() => {
                    dispatch(setLoading(false)) 
                }, 1000)
            }
        }
       
    }

    const handleRemove = async () => {
        // dispatch(deleteToCart(item?.product?.id))
        dispatch(setLoading(true))
        const res = await axiosApi.post('/delete-cart', {productId: item?.product?.id, userId: user?.id})
        if(res.ec === 0) {
            setTimeout(() => {
                dispatch(setLoading(false)) 
            }, 1000)
        }
    }
    
    const handleConfirm = () => {
        message.success('Xóa sản phẩm thành công')
        handleRemove()
        if(!isLoading) {
            toast('Xóa sản phẩm thành công')
        }
      }
      const handleCancel = () => {
        message.error('Click on No')
      }

  return (
    <div className={cs('product-cart')}>
        <div className={cs('inner-product-cart')}>
            <div className={cs('product-cart-img')}>
                <Link to='#' className={cs('product-cart-img-link')}>
                    <img src={item?.product?.thumbnail} alt="" />
                </Link>
                <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc muốn bỏ sản phẩm này không?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    okText="Có"
                    cancelText="Hủy"
                >
                    <Button className={cs('btn-delete')}>Xóa</Button>
                </Popconfirm>
            </div>
            <div className={cs('product-cart-title')}>
                <h3>{item?.product?.name} </h3>
            </div>
            <div className={cs('product-cart-price')}>
                <div className={cs('product-cart-price-sale')}>{convertPrice(item?.product?.sale_price)}</div>
                <div className={cs('product-cart-price-origin')}>{convertPrice(item?.product?.price)}</div>
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
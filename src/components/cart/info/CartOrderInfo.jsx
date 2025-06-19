import React, { useEffect, useState } from 'react'
import styles from './CartOrderInfo.module.scss'
import useStyles from '../../../hooks/useStyles'
import SelectAddress from '../../selectAddress/SelectAddress'
import { useDispatch } from 'react-redux'
import { setInfoCustomer } from '../../../store/cart/cartSlice'




function CartOrderInfo({ currentStep }) {
  const cs = useStyles(styles)
  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    genre: 'male',
    name: '',
    phone: '',
    cityCode: '',
    districtCode: '',
    wardCode: '',
    shipping: true,
    houseNumber: '',
    note: ''
  })


  useEffect(() => {
    if(currentStep >= 2) {
      dispatch(setInfoCustomer(info))
    }
  },[currentStep, dispatch, info])

  return (
    <div className={cs('cart-order-info')}>
      <div>
        <h3 className={cs('cart-title')}>Thông tin khách mua hàng</h3>
        <div className={cs('box-input-sex')}>
            <div className={cs('wrap-input-sex')}>
              <input id='male' type="radio" name='sex' value='male' onChange={(e) => setInfo(prev => ({...prev, genre: e.target.value}))} />
              <label htmlFor="male">Anh</label>
            </div>
            <div className={cs('wrap-input-sex')}>
              <input id='female' type="radio" name='sex' value='female' onChange={(e) => setInfo(prev => ({...prev, genre: e.target.value}))} />
              <label htmlFor="female">Chị</label>
            </div>
        </div>
        <div className={cs('input-info-customer')}>
          <div className={cs('input-info')}>
            <input id='name' type="text" onChange={(e) => setInfo(prev => ({...prev, name: e.target.value}))}/>
            <label htmlFor="name">Nhập họ tên</label>
          </div>
          <div className={cs('input-info')}>
            <input id='phone' type="text" onChange={(e) => setInfo(prev => ({...prev, phone: e.target.value}))}/>
            <label htmlFor="phone">Nhập số điện thoại</label>
          </div>
        </div>
        <h3 className={cs('cart-title')}>Chọn cách nhận hàng</h3>
        <div className={cs('input-ship')}>
          <input id='shipping' type="radio" checked onChange={(e) => setInfo(prev => ({...prev, shipping: e.target.value}))}/>
          <label htmlFor="shipping">Giao hàng tận nơi</label>
        </div>
        <div className={cs('option-address')}>
          <SelectAddress setInfo={setInfo} />
        </div>
      </div>
    </div>
  )
}

export default CartOrderInfo
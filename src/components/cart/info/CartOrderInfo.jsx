import React, { useEffect, useState } from 'react'
import styles from './CartOrderInfo.module.scss'
import useStyles from '../../../hooks/useStyles'
import SelectAddress from '../../selectAddress/SelectAddress'
import { useDispatch, useSelector } from 'react-redux'
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
    houseNumber: '',
  })
  const user = useSelector(state => state.cart.infoCustomer)
  console.log(user)

  const onChange = (e) => {
    setInfo({...info, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    dispatch(setInfoCustomer(info))
  },[dispatch, info])

  return (
    <div className={cs('cart-order-info')}>
      <div>
        <h3 className={cs('cart-title')}>Thông tin khách mua hàng</h3>
        <div className={cs('box-input-sex')}>
            <div className={cs('wrap-input-sex')}>
              <input id='male' type="radio" checked={info.genre === 'male' ? true : false} name='genre' value='male' required onChange={onChange} />
              <label htmlFor="male">Anh</label>
            </div>
            <div className={cs('wrap-input-sex')}>
              <input id='female' type="radio" checked={info.genre === 'female' ? true : false} name='genre' value='female' required onChange={onChange} />
              <label htmlFor="female">Chị</label>
            </div>
        </div>
        <div className={cs('input-info-customer')}>
          <div className={cs('input-info')}>
            <input id='name' type="text" name='name' required onChange={onChange}/>
            <label htmlFor="name">Nhập họ tên</label>
          </div>
          <div className={cs('input-info')}>
            <input id='phone' type="text" name='phone' required onChange={onChange}/>
            <label htmlFor="phone">Nhập số điện thoại</label>
          </div>
        </div>
        <div className={cs('option-address')}>
          <SelectAddress info={info} setInfo={setInfo} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

export default CartOrderInfo
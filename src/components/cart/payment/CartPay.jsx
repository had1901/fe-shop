import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoCustomer, setSelected } from '../../../store/cart/cartSlice'
import styles from './CartPay.module.scss'
import useStyles from '../../../hooks/useStyles'
import { convertPrice } from '../../../utils/convertString/_convertPrice'


function CartPay() {
  const cs = useStyles(styles)
  const info = useSelector(state => state.cart.infoCustomer)
  const total = useSelector(state => state.cart.total)
  const selected = useSelector(state => state.cart.selected)
  const dispatch = useDispatch()

  const handleClick = (e) => {
    const value = e.target.value
    dispatch(setSelected(value))
  }

  useEffect(() => {
    const getAddress = async () => {
      const resCity = await fetch(`https://provinces.open-api.vn/api/p/${info.cityCode}`)
      const resDistrict = await fetch(`https://provinces.open-api.vn/api/d/${info.districtCode}`)
      // const resWard = await fetch(`https://provinces.open-api.vn/api/w/${info.wardCode}`)
      const city = await resCity.json()
      const district = await resDistrict.json()
      // const ward = await resWard.json()
      if(city && district) {
        dispatch(setInfoCustomer({
          ...info, 
          cityCode: city.name, 
          districtCode: district.name, 
          // wardCode: ward.name, 
        }))
      }
    }
    getAddress()
  },[info.cityCode, info.districtCode,info, dispatch])

  return (
    <div className={cs('cart-pay')}>
      <h3 className={cs('heading')}>Thông tin đặt hàng</h3>
      <div>
        <ol className={cs('info-list')}>
          <li>
            <span className={cs('info-list-label')}>Khách hàng</span>
            <span>{info.name}</span>
          </li>
          <li>
            <span className={cs('info-list-label')}>Số điện thoại</span>
            <span>{info.phone}</span>
          </li>
          <li>
            <span className={cs('info-list-label')}>Địa chỉ nhận hàng</span>
            <span>{`${info.houseNumber}, ${info.wardCode}, ${info.districtCode}, ${info.cityCode}`}</span>
          </li>
          <li>
            <span className={cs('info-list-label')}>Tạm tính</span>
            <span className={cs('price')}>{convertPrice(total)}</span>
          </li>
          <li>
            <span className={cs('info-list-label')}>Phí vận chuyển</span>
            <span className={cs('price')}>Miễn phí</span>
          </li>
          <li>
            <span className={cs('info-list-label')}>Tổng tiền</span>
            <span className={cs('price')}>{convertPrice(total)}</span>
          </li>
        </ol>
        <div className={cs('pay-method')}>
          <h2>Chọn phương thức thanh toán</h2>
          <div className={cs('radio-method')} onClick={() => handleClick({ target: { value: 'cod' } })}>
            <input id='cod' type="radio" name='pay-method' value='cod' checked={selected === 'cod'} onChange={handleClick}/>
            <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
            <div className={cs('logo-method')}><img loading='lazy' src="https://cdn-icons-png.flaticon.com/512/9198/9198191.png" alt="" /></div>
          </div>
          <div className={cs('radio-method')} onClick={() => handleClick({ target: { value: 'qr-code' } })}>
            <input id='qr-code' type="radio" name='pay-method' value='qr-code' checked={selected === 'qr-code'} onChange={handleClick} />
            <label htmlFor="qr-code">Chuyển khoản ngân hàng</label>
            <div className={cs('logo-method')}><img loading='lazy' src="https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180824291/109059488-bank-vector-icon-isolated-on-transparent-background-bank-logo-concept.jpg" alt="" /></div>
          </div>
          <div className={cs('radio-method')} onClick={() => handleClick({ target: { value: 'vnp' } })}>
            <input id='vnp' type="radio" name='pay-method' value='vnp' checked={selected === 'vnp'} onChange={handleClick} />
            <label htmlFor="vnp">Thanh toán qua <span className={cs('vnpay-method')}>VNPAY</span></label>
            <div className={cs('logo-method')}><img loading='lazy' src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPay
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { formatTime } from './../../utils/convertString/_formatTime';
import Cart from '../../components/cart/Cart';
import styles from './Payment.module.scss'
import useStyles from '../../hooks/useStyles';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoPayment } from '../../store/order/orderSlice';
import axiosApi from '../../services/axios';
import { generateOrderCode } from '../../utils/convertString/_gennerateOrderCode';
import { setCarts } from '../../store/cart/cartSlice';


function Payment() {
  const { search } = useLocation()
  const cs = useStyles(styles)
  const [responseCode, setResponseCode] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const infoPayment = useSelector(state => state.order.infoPayment)
  const user = useSelector(state => state.auth.info)
  // const customer = useSelector(state => state.cart.infoCustomer)
  // const carts = useSelector(state => state.cart.carts)
  // const total = useSelector(state => state.cart.total)


  console.log('infoPayment', infoPayment)
  
  useEffect(() => {
    let result = {}
    const params = new URLSearchParams(search)
    for (const [key, value] of params.entries()) {
      result[key] = value
    }
    dispatch(setInfoPayment(result))
    setResponseCode(params.get('vnp_ResponseCode'))
  },[search, dispatch])


  useEffect(() => {
    const handleCreateOrder = async (mergeObj) => {
      const info = {
              ...infoPayment,
              ...mergeObj,
              userId: user.id,
              total: mergeObj.vnp_Amount / 100,
              carts: mergeObj.carts,
              orderCode: mergeObj.vnp_OrderInfo
          }
      localStorage.removeItem('infoPayment')
      const res = await axiosApi.post('/create-order', info)
      if(res?.ec === 0) {
        const handleRemoveCart = async () => {
          const res = await axiosApi.post('/delete-all-cart', { userId: user.id })
          if(res?.ec !== 0) {
              throw new Error('Không xóa được giỏ hàng')
          }
          dispatch(setCarts([]))
        }
        handleRemoveCart()
      }
    }

    if(responseCode && responseCode == '00') {
      const raw = localStorage.getItem('infoPayment')
      const info = raw ? JSON.parse(raw) : null
      console.log('raw', info)
      if(info) {
        const mergeObj = {...info, ...infoPayment}
        console.log('mergeObj', mergeObj)
        handleCreateOrder(mergeObj)
    }}
  },[responseCode, infoPayment.vnp_OrderInfo])

  return (
    <div className={cs('payment')}>
      <div className='container'>
        <div className={cs('box-payment')}>
          <div className={cs('icon-status')}>
            <DotLottieReact src={`../../../public/${infoPayment.vnp_ResponseCode == '00' ? 'check-success' : 'fail-error'}.lottie`} autoplay  />
          </div>
          <div className={cs('payment-result')}>
            <h1 className={cs('payment-title')} style={{ color: `${infoPayment.vnp_ResponseCode !== 0 && '#e30119'}`}}>
              <span>{infoPayment.statusText}</span>
            </h1>

            <table className={cs('payment-table')}>
              <tbody>
                <tr>
                  <td><strong>Ngân hàng</strong></td>
                  <td>{infoPayment.vnp_BankCode}</td>
                </tr>
                <tr>
                  <td><strong>Loại thẻ / Hình thức</strong></td>
                  <td>{infoPayment.vnp_CardType}</td>
                </tr>
                <tr>
                  <td><strong>Nội dung</strong></td>
                  <td>{infoPayment.vnp_OrderInfo}</td>
                </tr>
                <tr>
                  <td><strong>Tổng tiền</strong></td>
                  <td className={cs('payment-total-price')}>{(infoPayment.vnp_Amount / 100).toLocaleString('vi-VN')} ₫</td>
                </tr>
                <tr>
                  <td><strong>Thời gian giao dịch</strong></td>
                  <td>{formatTime(infoPayment.vnp_PayDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cs('btn-return')}><Button onClick={() => navigate('/')}>Về trang chủ</Button></div>
        </div>
        
      </div>
    </div>
  )
}

export default Payment
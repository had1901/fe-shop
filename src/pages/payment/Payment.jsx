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


function Payment() {
  const { search } = useLocation()
  const cs = useStyles(styles)
  const [responseCode, setResponseCode] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const infoPayment = useSelector(state => state.order.infoPayment)
 
  console.log(infoPayment)
  useEffect(() => {
    let result = {}
    const params = new URLSearchParams(search)
    for (const [key, value] of params.entries()) {
      result[key] = value
    }
    setResponseCode(params.get('vnp_ResponseCode'))
  },[search, dispatch])


  return (
    <div className={cs('payment')}>
      <div className='container'>
        <div className={cs('box-payment')}>
          <div className={cs('icon-status')}>
            <DotLottieReact src={`../../../public/${infoPayment.vnp_ResponseCode === 0 ? 'check-success' : 'fail-error'}.lottie`} autoplay  />
          </div>
          <div className={cs('payment-result')}>
            <h1 className={cs('payment-title')} style={{ color: `${infoPayment.vnp_ResponseCode !== 0 && '#e30119'}`}}>
              <span>{infoPayment.vnp_ResponseCode && infoPayment.vnp_TransactionStatus === '00'  ? 'Thanh toán thành công' : infoPayment.statusText}</span>
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
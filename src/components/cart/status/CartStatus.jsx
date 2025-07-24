import React from 'react'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { useSelector } from 'react-redux'
import useStyles from '../../../hooks/useStyles'
import styles from './CartStatus.module.scss'
import { generateOrderCode } from '../../../utils/convertString/_gennerateOrderCode'

function CartStatus() {
  const cs = useStyles(styles)
  const total = useSelector(state => state.cart.total)
  const selected = useSelector(state => state.cart.selected)
  let idCode = generateOrderCode()

  
  return (
    <div className={cs('cart-status')}>
      {selected === 'qr-code' && 
          (<div className={cs('img-qr')}>
            <img loading='lazy' src={`https://api.vietqr.io/image/970436-1029440094-qqCIgOE.jpg?accountName=HOANG%20TRUNG%20DUC&amount=${total}&addInfo=${idCode}`}/>
            <div className={cs('info-pay')}>
              <p><span className={cs('qr-code-label')}>Ngân hàng</span> <span>Vietcombank</span></p>
              <p><span className={cs('qr-code-label')}>Số tài khoản</span> <span>1029440094</span></p>
              <p><span className={cs('qr-code-label')}>Tên tài khoản</span> <span>HOANG TRUNG DUC</span></p>
              <p><span className={cs('qr-code-label')}>Nội dung CK</span> <span>{idCode}</span></p>
              <p><span className={cs('qr-code-label')}>Số tiền</span> <span className={cs('cart-status-price')}>{convertPrice(total)}</span></p>
            </div>
          </div>)
        }
    </div>
  )
}

export default CartStatus
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
              <p>Ngân hàng: <span>Vietcombank</span></p>
              <p>Số tài khoản: <span>1029440094</span></p>
              <p>Tên tài khoản: <span>HOANG TRUNG DUC</span></p>
              <p>ND chuyển khoản: <span>{idCode}</span></p>
              <p>Số tiền: <span>{convertPrice(total)}</span></p>
            </div>
          </div>)
        }
    </div>
  )
}

export default CartStatus
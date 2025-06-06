import React from 'react'
import styles from './AuthOrders.module.scss'
import useStyles from '../../../hooks/useStyles'

function AuthOrders() {
  const [cs] = useStyles(styles)

  return (
    <div className={cs('orders')}>
      <div>
        <h1 className={cs('title')}>Quản lý đơn hàng</h1>
      </div>
      
    </div>
  )
}

export default AuthOrders
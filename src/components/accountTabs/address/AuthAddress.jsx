import React from 'react'
import styles from './AuthAddress.module.scss'
import useStyles from '../../../hooks/useStyles'

function AuthAddress() {
  const [cs] = useStyles(styles)

  return (
    <div className={cs('address')}>
      <div>
        <h1 className={cs('title')}>Thông tin tài khoản</h1>
      </div>
      <div>
        <button className={cs('add-address')}>Thêm địa chỉ</button>
      </div>
    </div>
  )
}

export default AuthAddress
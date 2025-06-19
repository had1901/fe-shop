import React from 'react'
import styles from './AuthAddress.module.scss'
import useStyles from '../../../hooks/useStyles'
import { motion } from 'framer-motion';

function AuthAddress() {
  const cs = useStyles(styles)

  return (
    <motion.div 
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 1 }}
      className={cs('address')}
    >
      <div>
        <h1 className={cs('title')}>Thông tin tài khoản</h1>
      </div>
      <div>
        <button className={cs('add-address')}>Thêm địa chỉ</button>
      </div>
    </motion.div>
  )
}

export default AuthAddress
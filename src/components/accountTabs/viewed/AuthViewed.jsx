import React from 'react'
import styles from './AuthViewed.module.scss'
import useStyles from '../../../hooks/useStyles'

function AuthViewed() {
  const cs = useStyles(styles)

  return (
    <div className={cs('viewed')}>
      <div className={cs('title')}>
        <h2>Sản phầm đã xem</h2>
      </div>
    </div>
  )
}

export default AuthViewed
import React from 'react'
import { Outlet } from 'react-router';
import styles from './index.module.scss'
import useStyles from '../../hooks/useStyles';

function AuthPage() {
  const cs = useStyles(styles)

  return (
      <div className={cs('auth')}>
        <Outlet />
      </div> 
  )
}

export default AuthPage
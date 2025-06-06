import React from 'react'
import FormModal from '../../components/form/FormModal'
import useStyles from '../../hooks/useStyles'
import styles from './Login.module.scss'

function Login() {
  return (
    <FormModal isLogin />
  )
}

export default Login
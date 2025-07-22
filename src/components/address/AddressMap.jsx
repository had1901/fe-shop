import React from 'react'
import styles from './AddressMap.module.scss'
import useStyles from '../../hooks/useStyles'
import { Link } from 'react-router'
import { Button } from 'antd'

function AddressMap({ title, address, link }) {
    const cs = useStyles(styles)

  return (
    <div>
        <h3 className={cs('heading')}>{title}</h3>
        <p className={cs('address')}>
            <strong className={cs('address-label')}>Địa chỉ: </strong>
            <a href={link} target='_blank' className={cs('address-desc')}>{address}</a>
        </p>
        <p>
            <strong className={cs('address-label')}>Giờ làm việc: </strong>
            <span>8:00 - 21:00</span>
        </p>
        <Link to={link} target='_blank'><Button type='primary' className={cs('btn')}>Chỉ đường</Button></Link>
    </div>
  )
}

export default AddressMap
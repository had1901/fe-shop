import React from 'react'
import styles from './Breadcrumb.module.scss'
import useStyles from '../../hooks/useStyles'
import { Link, useLocation } from 'react-router'
import { MdHome } from 'react-icons/md'

function Breadcrumb({product}) {
  const cs = useStyles(styles)
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)

  return (
    <div className={cs('breadcrumb-navigate')}>
        <div className={cs('img-nav')}>
            <MdHome className={cs('breadcrumb-link-home')}/> 
            <Link className={cs('breadcrumb-link')}>
                <span>Trang chủ / </span>
            </Link>
            {pathnames.length && pathnames.map((name, index) => {
                const isLast = index === pathnames.length - 1
                if(isLast) {
                    return <span className={cs('breadcrumb-link-sub')}>{product?.name}</span>
                } else {
                    return <Link className={cs('breadcrumb-link')}>{product?.category?.name} / </Link>
                }
            })}
        </div>
    </div>
  )
}

export default Breadcrumb
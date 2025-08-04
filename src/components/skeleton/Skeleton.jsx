import React from 'react'
import styles from './Skeleton.module.scss'
import useStyles from '../../hooks/useStyles'

function Skeleton({ col, height }) {
    const cs = useStyles(styles)
    console.log(`calc(100% / ${col})`)
  return (
    <div className={cs('skeleton')} style={{ width:`calc(100% / ${col})`, height:`${height}px` }}></div>
  )
}

export default Skeleton
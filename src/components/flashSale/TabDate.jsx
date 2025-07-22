import React, { useEffect, useState } from 'react'
import styles from './TabDate.module.scss';
import useStyles from './../../hooks/useStyles';

function TabDate() {
    const cs = useStyles(styles)
    const [time, setTime] = useState({
        d: 0,
        h: 0,
        m: 0,
        s: 0
    })

    const renderDate = () => {
        const date = new Date()
        date.setDate(1)
        setTime(prev => ({
            ...prev,
            d: date.getDate().toString().padStart(2, '0'),
            h: date.getHours().toString().padStart(2, '0'), 
            m: date.getMinutes().toString().padStart(2, '0'),
            s: date.getSeconds().toString().padStart(2, '0'),
        }))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            renderDate()
        }, 1000)

        return () => clearInterval(interval)
    },[])

  return (
    <div className={cs('tabCountDown')}>
        <span className={cs('countDown')}>{time.d}</span>
        <span className={cs('countDownDot')}>:</span>
        <span className={cs('countDown')}>{time.h}</span>
        <span className={cs('countDownDot')}>:</span>
        <span className={cs('countDown')}>{time.m}</span>
        <span className={cs('countDownDot')}>:</span>
        <span className={cs('countDown')}>{time.s}</span>
    </div>
  )
}

export default TabDate
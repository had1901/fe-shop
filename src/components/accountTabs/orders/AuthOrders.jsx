import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './AuthOrders.module.scss'
import useStyles from '../../../hooks/useStyles'
import { motion } from 'framer-motion';
import { IoIosSearch } from 'react-icons/io';

const tabsAction = [
  {
    id: 0,
    label: 'Tất cả',
  },
  {
    id: 1,
    label: 'Mới',
  },
  {
    id: 2,
    label: 'Đang xử lý',
  },
  {
    id: 3,
    label: 'Đang vận chuyển',
  },
  {
    id: 4,
    label: 'Hoàn thành',
  },
  {
    id: 5,
    label: 'Hủy',
  },
  
]
function AuthOrders() {
  const cs = useStyles(styles)
  const [tabActive, setTabActive] = useState(0)
  const [left, setLeft] = useState(0)
  const [widthEl, setWidthEl] = useState(0)
  const underlineRef = useRef()
  const tabRef = useRef()
  console.log('left',left)

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (tabRef.current) {
        const widthEl = Math.floor(tabRef.current.getBoundingClientRect().width)
        setWidthEl(widthEl)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  },[])

  useEffect(() => {
    console.log('tab-index',tabActive)
    const calculator = widthEl * tabActive
    console.log('calculator', widthEl * tabActive)
    setLeft(calculator)
  },[tabActive, widthEl])

  

  return (
    <motion.div 
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 1 }}
      className={cs('orders')}
    >
      <div>
        <h1 className={cs('title')}>Quản lý đơn hàng</h1>
      </div>
      <div>
        <ul className={cs('action-tab-list')}>
          {tabsAction.length && tabsAction.map(tab => (
            <li 
              ref={tabRef}
              key={tab.id} 
              className={cs('action-tab-item')}
              onClick={() => setTabActive(tab.id)}
            >
              {tab.label}
              <span
                ref={underlineRef}
                style={{ transform: `translateX(${left}px)`, width: `${widthEl}px`}}
                className={cs('action-tab-after')}
              ></span>
            </li>
          ))}
        </ul>
        <div className={cs('search-order')}>
          <div className={cs('box-search-order')}>
            <div className={cs('inner-search-order')}>
              <input type="text" placeholder='Tìm đơn hàng theo Mã đơn hàng' className={cs('search-order-input')}/>
              <IoIosSearch className={cs('search-order-icon')}/>
              <label htmlFor="" className={cs('search-order-text')}>Tìm đơn hàng</label>
            </div>
           
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthOrders
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './AuthOrders.module.scss'
import useStyles from '../../../hooks/useStyles'
import { IoIosSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../../../store/order/orderSlice';
import { convertPrice } from '../../../utils/convertString/_convertPrice';
import { Button, Modal } from 'antd';
import OrderDetail from '../../orderDetail/OrderDetail';
import { generateClass, generateStatusText } from '../../../utils/convertString/_gennerateOrderCode';
import { fetchOrders } from './api_order';
import { FaEye } from 'react-icons/fa6';
import { motion } from "framer-motion"
import Skeleton from '../../skeleton/Skeleton';

const tabsAction = [
  {
    id: 0,
    label: 'Tất cả',
    status: 'all'
  },
  // {
  //   id: 1,
  //   label: 'Mới',
  //   status: 'new'
  // },
  {
    id: 1,
    label: 'Đang xử lý',
    status: 'pending'
  },
  {
    id: 2,
    label: 'Vận chuyển',
    status: 'shipping'
  },
  {
    id: 3,
    label: 'Hoàn thành',
    status: 'completed'
  },
  {
    id: 4,
    label: 'Hủy',
    status: 'destroy'
  },
  
]

function AuthOrders() {
  const cs = useStyles(styles)
  const [tabActive, setTabActive] = useState(0)
  const [left, setLeft] = useState(0)
  const [widthEl, setWidthEl] = useState(0)
  const underlineRef = useRef()
  const tabRef = useRef()
  const user = useSelector(state => state.auth.info)
  const orders = useSelector(state => state.order.orders)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detail, setDetail] = useState({})
  const [searchOrder, setSearchOrder] = useState('')

  const tableHeaders = [
    'Mã đơn hàng',
    'Địa chỉ',
    'Tổng tiền',
    'Trạng thái',
    'Xem chi tiết'
  ]
  // // const filterOrders = () => 
  // const filterOrders = orders.filter(item => {
  //   const searchItem = item.order_code.includes(searchOrder)

  //   if(tabsAction[tabActive]?.status == 'all' && searchItem) {
  //     return item
  //   }
  //   return searchItem && item.status_payment == tabsAction[tabActive]?.status
  // })

  const statusFilter = tabsAction[tabActive]?.status || 'all'
  const filterOrders = orders.filter(item => {
    const matchSearch = item.order_code.includes(searchOrder)
    const matchStatusOrder = statusFilter === 'all' || item.status_payment === statusFilter 
    // const matchStatusTransport = statusFilter === 'all' || item.status_transpost === statusFilter

    return matchSearch && matchStatusOrder 
  })
  
  const handleViewDetail = (orderId) => {
    const filterOrderById = orders.filter(order => order.id === orderId)
    if(filterOrderById)
      setDetail(filterOrderById[0])
      setIsModalOpen(true)
  }

  const handleSearchOrder = (e) => {
    setSearchOrder(e.target.value)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }


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
    const calculator = widthEl * tabActive
    setLeft(calculator)
  },[tabActive, widthEl])

  useEffect(() => {
    if(!user.id) return
    (async () => {
      const data = await fetchOrders(user.id)
      if(data) return dispatch(setOrders(data))
    })()
  },[user.id, dispatch])

  return (
    <motion.div 
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
              <input 
                type="text" 
                placeholder='Tìm kiếm theo Mã đơn hàng' 
                className={cs('search-order-input')}
                value={searchOrder}
                onChange={handleSearchOrder}
                />
              <IoIosSearch className={cs('search-order-icon')}/>
              <label htmlFor="" className={cs('search-order-text')}>Tìm đơn hàng</label>
            </div>
          </div>
        </div>
        <div className={cs('orders')}>
          <div className={cs('orders-wrap')}>
            <table className={cs('table-order')}>
              <thead>
                <tr className={cs('table-row-head')}>
                  {tableHeaders.length && tableHeaders.map((label, i) => (
                    <td key={i} className={cs(`table-label ${i === 1 && 'table-col-address'}`)}>{label}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filterOrders.length > 0  
                ? filterOrders.map((order) => (
                  <tr key={order.id} className={cs('table-row')}>
                    <td className={cs('table-col')}>{order.order_code}</td>
                    <td className={cs('table-col table-col-address')}>{order.shipping_address}</td>
                    <td className={cs('table-col total-price')}>{convertPrice(order.total_price)}</td>
                    <td className={cs(`table-col center`)}>
                      <span className={cs(`status-order ${generateClass(order.status_payment)}`)}>{generateStatusText(order.status_payment)}</span>
                    </td>
                    <td className={cs('table-col center')}>
                      <Button type="primary" className={cs('table-btn')} onClick={() => handleViewDetail(order.id)}><FaEye /></Button>
                    </td>
                  </tr>
                ))
                : <Skeleton col={1} height={40} />
                }
                <Modal
                  title="Chi tiết đơn hàng"
                  closable={{ 'aria-label': 'Custom Close Button' }}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  cancelText='Đóng'
                  width={'90%'}
                  mask={true}

                  styles={{
                    content: {
                      padding: '14px 10px'
                    }
                  }}
                >
                  <OrderDetail detail={detail} />
                </Modal>
              </tbody>
            </table>
            {filterOrders.length < 0 && tableHeaders.map((_, i) => (
              <Skeleton col={1} height={20} key={i}/>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthOrders
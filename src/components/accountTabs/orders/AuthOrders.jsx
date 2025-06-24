import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './AuthOrders.module.scss'
import useStyles from '../../../hooks/useStyles'
import { motion } from 'framer-motion';
import { IoIosSearch } from 'react-icons/io';
import axiosApi from '../../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCarts } from '../../../store/cart/cartSlice';
import { setOrders } from '../../../store/order/orderSlice';
import { convertPrice } from '../../../utils/convertString/_convertPrice';
import { Button, Modal } from 'antd';
import { formatDate } from '../../../utils/convertString/_formatTime';
import OrderDetail from '../../orderDetail/OrderDetail';
import { generateClass, generateStatusText } from '../../../utils/convertString/_gennerateOrderCode';

const tabsAction = [
  {
    id: 0,
    label: 'Tất cả',
    status: 'all'
  },
  {
    id: 1,
    label: 'Mới',
    status: 'new'
  },
  {
    id: 2,
    label: 'Đang xử lý',
    status: 'pending'
  },
  {
    id: 3,
    label: 'Đang vận chuyển',
    status: 'shipping'
  },
  {
    id: 4,
    label: 'Hoàn thành',
    status: 'completed'
  },
  {
    id: 5,
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
  const cus = useSelector(state => state.cart.infoCustomer)
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detail, setDetail] = useState({})
console.log(cus)
  const tableHeaders = [
    'Mã đơn hàng',
    'Địa chỉ giao hàng',
    'Tổng tiền',
    'Trạng thái',
    'Xem chi tiết'
  ]

  console.log('orders',orders)
  const handleViewDetail = (orderId) => {
    const filterOrderById = orders.filter(order => order.id === orderId)
    console.log(filterOrderById)
    if(filterOrderById)
      setDetail(filterOrderById[0])
      setIsModalOpen(true)
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
    const fetchOrders = async () => {
      const res = await axiosApi.post('/get-orders', { userId: user.id })
      if(res?.ec === 0 && res?.dt) {
        dispatch(setOrders(res.dt))
      }
    }
    fetchOrders()
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
              <input type="text" placeholder='Tìm đơn hàng theo Mã đơn hàng' className={cs('search-order-input')}/>
              <IoIosSearch className={cs('search-order-icon')}/>
              <label htmlFor="" className={cs('search-order-text')}>Tìm đơn hàng</label>
            </div>
          </div>
        </div>
        <div className={cs('orders')}>
          <div>
            <table className={cs('table-order')}>
              <thead>
                <tr>
                  {tableHeaders.length && tableHeaders.map((label, i) => (
                    <td key={i} className={cs('table-label')}>{label}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length && orders.map((order) => (
                  <tr key={order.id}>
                    <td className={cs('table-col')}>{order.order_code}</td>
                    <td className={cs('table-col')}>{order.shipping_address}</td>
                    <td className={cs('table-col total-price')}>{convertPrice(order.total_price)}</td>
                    <td className={cs(`table-col center`)}>
                      <span className={cs(`status-order ${generateClass(order.status_payment)}`)}>{generateStatusText(order.status_payment)}</span>
                    </td>
                    <td className={cs('table-col center')}>
                      <Button type="primary" onClick={() => handleViewDetail(order.id)}>Xem chi tiết</Button>
                      <Modal
                        title="Thông tin chi tiết đơn hàng"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        cancelText='Đóng'
                        mask={true}
                        closeIcon={false}
                        focusTriggerAfterClose={true}
                        width={{
                          xs: '90%',
                          sm: '85%',
                          md: '75%',
                          lg: '60%',
                          xl: '60%',
                          xxl: '60%',
                        }}
                      >
                        <OrderDetail detail={detail} />
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuthOrders
import { Chart } from 'chart.js/auto'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Dashboard.module.scss'
import useStyles from '../../../hooks/useStyles'
// import { fetchOrders } from '../../../components/accountTabs/orders/api_order'
import axiosApi from '../../../services/axios'
import {
  AreaChartOutlined,
  BarChartOutlined,
  BellOutlined,
  CommentOutlined,
  GatewayOutlined,
  HomeOutlined,
  OrderedListOutlined,
  ProductOutlined,
  RiseOutlined,
  SafetyOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router'
import { convertPrice } from '../../../utils/convertString/_convertPrice'

function formatMoney(value) {
  if (value >= 1_000_000) {
    // Từ 1 triệu trở lên => format dạng M
    return (value / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M"
  } else if (value >= 100) {
    // Từ 100 đến 999 => hiển thị 3 chữ số
    return value.toString().slice(0, 3) + "đ"
  } else if (value >= 10) {
    // Từ 10 đến 99 => hiển thị 2 chữ số
    return value.toString().slice(0, 2) + "đ"
  } else {
    // Dưới 10 thì giữ nguyên
    return value + "đ"
  }
}


function Dashboard() {
  const cs = useStyles(styles)

  const chartRef1 = useRef(null)
  const chartRef2 = useRef(null)
  const chartInstance1 = useRef(null)
  const chartInstance2 = useRef(null)

  const [totalOrders, setTotalOrders] = useState([])
  const [orderGroupDate, setOrderGroupDate] = useState([])
  const [totalUsers, setTotalUsers] = useState([])
  const [totalProducts, setTotalProducts] = useState([])
  const [dates, setDates] = useState([])
  const [dataTotalOrder, setDataTotalOrder] = useState([])


  console.log('dataTotalOrder', dataTotalOrder)

  // Tính doanh thu 
  const calculatorTotalRevenue = () => {
    const orderCompleted = totalOrders.filter(orders => orders.status_payment === 'completed')
    const totalPrice = orderCompleted.reduce((acc, current) => acc + current.total_price ,0)
    return totalPrice
  }
  
  const totalList = [
    {
        label: 'Tài khoản',
        total: totalUsers?.length,
        icon: <Link to='/auth/admin/accounts'><UserOutlined className={cs('pro-icon')} /></Link>
    },
    {
        label: 'Tổng đơn hàng',
        total: totalOrders?.length,
        icon: <Link to='/auth/admin/orders'><OrderedListOutlined className={cs('pro-icon')} /></Link>
    },
    {
        label: 'Tổng sản phẩm',
        total: totalProducts?.length,
        icon: <Link to='/auth/admin/products'><ProductOutlined className={cs('pro-icon')} /></Link>
    },
    {
        label: 'Đã bán',
        total: 5000,
        icon: <Link to='/'><SafetyOutlined className={cs('pro-icon')} /></Link>
    },
    {
      label: 'Doanh thu đơn hàng đã giao',
      total: formatMoney(calculatorTotalRevenue()),
      icon: <Link to='/'><AreaChartOutlined className={cs('pro-icon')} /></Link>
    },
  ]

  const calculatorData = totalOrders.reduce((acc, current) => {
    acc[current.status_payment] = (acc[current.status_payment] || 0) + 1
    return acc
  },{})

  const labelsOrder = Object.keys(calculatorData)
  const valuesOrder = Object.values(calculatorData)

  // const values = []
  
  const dataStatusOrders = labelsOrder.map((item, index) => {
    const data = valuesOrder.filter(value => value)
    return {
      label: item,
      data: data[index]
    }
  })

  const createChart = useCallback((ref, refInstance, title = '', type='bar', data, listBg) => {
    if(!ref.current) return
    if (refInstance.current) {
      refInstance.current.destroy()
    }
    refInstance.current = new Chart(ref.current, {
      type,
      data: {
        labels: data.map(item => item.label),
        datasets: [
          {
            label: title,
            data: data.map(item => item.data),
            backgroundColor: listBg,
            borderColor: 'rgba(83, 175, 255, 0.5)',
            borderWidth: 1
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 30
          }
        },
        // responsive: true
      }
    })
    return refInstance.current
  },[])

  // Tạo chart
  useEffect(() => {
    const chartOrderStatus =  createChart(chartRef1, chartInstance1, 'Trạng thái đơn hàng', 'doughnut', dataStatusOrders, ['#ffdb6d', '#2dc26d', '#fe5252'])
    const chart2 = createChart(chartRef2, chartInstance2, 'Đơn đặt hàng trong 7 ngày gần nhất', 'bar', dataTotalOrder, '#d14781')

    return () => {
      chartOrderStatus?.destroy()
      chart2?.destroy()
    }
  },[createChart,dataStatusOrders, dataTotalOrder])

  // Gọi API
  useEffect(() => {
    (async () => {
      const [ordersRes, ordersGroupDate, usersRes, productsRes] = await Promise.allSettled([
        axiosApi.get('/get-all-order'),
        axiosApi.get('/get-group-orders-date'),
        axiosApi.get('/auth/admin/read-accounts'),
        axiosApi.get('/api/get-all-product')
      ])
    
      if (ordersRes.status === 'fulfilled') setTotalOrders(ordersRes.value.dt)
      if (ordersGroupDate.status === 'fulfilled') setOrderGroupDate(ordersGroupDate.value.dt)
      if (usersRes.status === 'fulfilled') setTotalUsers(usersRes.value.dt)
      if (productsRes.status === 'fulfilled') setTotalProducts(productsRes.value.dt)
    })()
  },[])
  
  // Tạo danh sách ngày trong tuần
  useEffect(() => {
    const createDate = (numberDay) => {
      const days = []
      const today = new Date()
      const startDate = new Date(today)
    
      startDate.setDate(today.getDate() - numberDay) // để lấy 7 ngày, gồm cả hôm nay 
      for (let date = new Date(startDate); date <= today; date.setDate(date.getDate() + 1)) {
        const currentDate = new Date(date) // clone để không bị thay đổi
  
        const iso = currentDate.toISOString().split('T')[0].split('-')
        const [_, month, day] = iso
        const fullDate = `${day}/${month}`
  
        days.push({
          day: date.getDate().toString().padStart(2, '0'),
          full: fullDate, // yyyy-mm-dd
          month: date.getMonth() + 1, // yyyy-mm-dd
          format: `${date.getDate().toString().padStart(2, '0')}/${date.getMonth() + 1}`
        })
      }
      return days
    }
    setDates(createDate(7))
  },[setDates])

  useEffect(() => {
    if(orderGroupDate.length > 0) {
      const formatOrderDate = orderGroupDate.map(item => {
        const date = item.date.split('-')
        const [_, month, day] = date
        const format = `${day}/${month}`
        return {...item, date: format}
      })
    
      const result = dates.map(day => {
        const data = formatOrderDate
          .filter(order => order.date === day.full)
          .reduce((sum, cur) => sum + cur.totalOrders, 0)
        return {
          label: day.full,
          data
        }
      })
      setDataTotalOrder(result)
    }

  },[orderGroupDate.length, dates.length])

  return (
    <div>
      <div className={cs('pro-dashboard')}>
        {totalList.length > 0 && totalList.map((item, i) => (
            <div className={cs('pro-analytics')} key={i}>
                <div className={cs('pro-info')}>
                    <div>
                        <h4>{item.label}</h4>
                        <span className={cs('pro-total')}>{item.total}</span>
                    </div>
                    <i>{item.icon}</i>
                </div>
                <div className={cs('pro-compare')}>
                    <span className={cs('pro-compare-number-up')}><RiseOutlined /> 8% </span> 
                    <span> so với hôm qua</span>
                </div>
            </div>
        ))}
      </div>
      <div className={cs('content')}>
        <div className={cs('chart-box')}>
            <div className={cs('chart-item')}>
              <canvas ref={chartRef1} ></canvas>
            </div>
            <div className={cs('chart-item')}>
              <canvas ref={chartRef2} ></canvas>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
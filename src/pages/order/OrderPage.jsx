import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthOrders from '../../components/accountTabs/orders/AuthOrders'
import { fetchOrders } from '../../components/accountTabs/orders/api_order'
import { setOrders } from '../../store/order/orderSlice'
import styles from './OrderPage.module.scss'
import useStyles from '../../hooks/useStyles'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import { Button } from 'antd'
import { Link } from 'react-router'

function OrderPage() {
  const cs = useStyles(styles)
  const user = useSelector(state => state.auth.info)
  const orders = useSelector(state => state.order.orders)
  const customer = useSelector(state => state.cart.infoCustomer)
  const infoPayment = useSelector(state => state.order.infoPayment)
  const selected = useSelector(state => state.cart.selected)
  const total = useSelector(state => state.cart.total)
  
  const dispatch = useDispatch()
  console.log('order', orders)
  console.log('customer', customer)
  console.log('infoPayment', infoPayment)
  console.log('selected', selected)

  const configInfoPayment = [
    {
      label: 'Tên khách hàng',
      renderInfo: () => customer?.name
    },
    {
      label: 'Địa chỉ giao hàng',
      renderInfo: () => {
        return `${customer?.houseNumber} - ${customer?.wardCode} - ${customer?.districtCode} - ${customer?.cityCode}`
      },
    },
    {
      label: 'Số điện thoại',
      renderInfo: () => customer?.phone
    },
    {
      label: 'Phương thức thanh toán',
      renderInfo: () => {
        switch (selected){
          case 'qr-code':
          case 'vnp':
            return 'Chuyển khoản ngân hàng (QR Code)'
          case 'cod': 
            return 'Thanh toán khi nhận hàng (COD)'
          default:
            return 'Chưa thanh toán'
        }
      }
    },
    {
      type: 'money',
      label: 'Tổng tiền',
      renderInfo: () => convertPrice(total)
    },
  ]
  useEffect(() => {
    if(!user?.id) return
    (async () => {
      const data = await fetchOrders(user.id)
      if(data) dispatch(setOrders(data))
    })()
  },[user?.id, dispatch])

  return (
    <div className={cs('order-page')}>
      <div className='container'>
        <div className={cs('inner-order-page')}>
          <h3 className={cs('order-heading')}>Đặt hàng thành công</h3>
          <h3  className={cs('order-heading-text')}>Cảm ơn quý khách đã mua hàng, đơn hàng sẽ sớm được xử lý và giao đến quý khách</h3>
            <div className={cs('info')}>
              <div className='row'>
                {configInfoPayment.length > 0 && configInfoPayment.map((item, i) => (
                  <div key={i} className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                    <div className={cs('info-order')}>
                      <h2 className={cs('info-order-header')}>{item.label}</h2>
                      <span className={cs(`info-order-text ${item.type === 'money' && 'price'}`)}>{item.renderInfo()}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Link to='/' className={cs('btn-link-home')}>
            <Button type='primary'>Tiếp tục mua hàng</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
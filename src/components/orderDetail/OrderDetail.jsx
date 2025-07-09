import React from 'react'
import styles from './OrderDetail.module.scss'
import useStyles from '../../hooks/useStyles'
import { Button } from 'antd'
import { formatDate, formatTime } from '../../utils/convertString/_formatTime'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import { generateClass, generateStatusText } from '../../utils/convertString/_gennerateOrderCode'

function OrderDetail({ detail }) {
  const cs = useStyles(styles)

  const listLabelOrder = [
    'Mã đơn hàng',
    'Cổng thanh toán',
    'Địa chỉ giao hàng',
    'Ngày đặt hàng',
    'Giảm giá',
    'Tổng tiền',
    'Trạng thái',
    'Hành động',
  ]

  return (
    <div className={cs('order-detail')}>
        <table className={cs('table-detail')}>
            <thead>
                <tr>
                    {listLabelOrder.length && listLabelOrder.map((label, i) => (
                        <td key={i} className={cs('table-col table-label')}>{label}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={cs('table-col')}>{detail.order_code}</td>
                    <td className={cs('table-col')}>{detail.pay_method}</td>
                    <td className={cs('table-col')}>{detail.shipping_address}</td>
                    <td className={cs('table-col')}>{formatDate(detail.createdAt)}</td>
                    <td className={cs('table-col')}>{detail.discount}</td>
                    <td className={cs('table-col price')}>{convertPrice(detail.total_price)}</td>
                    <td className={cs(`table-col`)}>
                        <span className={cs(`status-order ${generateClass(detail.status_payment)}`)}>{generateStatusText(detail.status_payment)}</span>
                    </td>
                    {/* <td className={cs(`table-col`)}>
                        <span className={cs(`status-order ${generateClass(detail.status_payment)}`)}>{detail.status_transpost}</span>
                    </td> */}
                    <td className={cs('table-col')}>
                        <Button danger>Hủy đơn hàng</Button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div className={cs('list-order')}>
            <div>
                <h2>Danh sách sản phẩm đã đặt hàng</h2>
            </div>
            <table className={cs('list-order-product')}>
                <thead>
                    <tr>
                        <td className={cs('order-label')}><span>Hình ảnh</span></td>
                        <td className={cs('order-label')}><span>Tên sản phẩm</span></td>
                        <td className={cs('order-label')}><span>Số lượng</span></td>
                        <td className={cs('order-label')}><span>Giá tiền</span></td>
                    </tr>
                </thead>
                <tbody>
                    {detail?.Order_details?.length && detail?.Order_details.map((item, i) => (
                        <tr key={i}>
                            <td className={cs('order-col img-product')}><img loading='lazy' src={item?.Product?.thumbnail} /></td>
                            <td className={cs('order-col')}><span>{item?.Product?.name}</span></td>
                            <td className={cs('order-col')}><span>{item?.quantity}</span></td>
                            <td className={cs('order-col price')}><span>{convertPrice(item?.Product?.sale_price)}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderDetail
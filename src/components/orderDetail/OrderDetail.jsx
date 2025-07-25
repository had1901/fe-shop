import React from 'react'
import styles from './OrderDetail.module.scss'
import useStyles from '../../hooks/useStyles'
import { Button, Descriptions } from 'antd'
import { formatDate, formatTime } from '../../utils/convertString/_formatTime'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import { generateClass, generateStatusText } from '../../utils/convertString/_gennerateOrderCode'

function OrderDetail({ detail }) {
  const cs = useStyles(styles)

//   const listLabelOrder = [
//     'Mã đơn hàng',
//     'Cổng thanh toán',
//     'Địa chỉ giao hàng',
//     'Ngày đặt hàng',
//     'Giảm giá',
//     'Tổng tiền',
//     'Trạng thái',
//     'Hành động',
//   ]

  const renderMethodText = (method) => {
        switch(method) {
            case 'cod':
                return <span>Giao hàng tận nơi</span>
            case 'vnp':
                return <span>Thanh toán qua VNPAY</span>
            case 'qr-code':
                return <span>Chuyển khoản</span>
        }
    }
  const items = [
    {
        key: '1',
        label: 'Mã đơn hàng',
        children: detail.order_code,
    },
    {
        key: '2',
        label: 'Phương thức thanh toán',
        children: renderMethodText(detail.pay_method),
    },
    {
        key: '3',
        label: 'Địa chỉ giao hàng',
        children: detail.shipping_address,
    },
    {
        key: '4',
        label: 'Ngày đặt hàng',
        children: formatDate(detail.createdAt),
    },
    {
        key: '5',
        label: 'Giảm giá',
        children: detail.discount,
    },
    {
        key: '6',
        label: 'Tổng tiền',
        children: <span className={cs('price')}>{convertPrice(detail.total_price)}</span>,
    },
    {
        key: '7',
        label: 'Trạng thái',
        children: <div className={cs(`status-order ${generateClass(detail.status_payment)}`)}>{generateStatusText(detail.status_payment)}</div>,
    },
    {
        key: '8',
        label: 'Hành động',
        children: <Button danger className={cs('btn-cancel')}>Hủy đơn hàng</Button>,
    },
]

    
  return (
    <div className={cs('order-detail')}>
        {/* <table className={cs('table-detail')}>
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
                
                    <td className={cs('table-col')}>
                        <Button danger>Hủy đơn hàng</Button>
                    </td>
                </tr>
            </tbody>
        </table> */}
        <div className={cs('order-info')}>
            {items.map((item, i) => (
                <div key={i} className={cs('order-info-item')}>
                    <span className={cs('order-info-label')}>{item.label}</span>
                    <span className={cs('order-info-content')}>{item.children}</span>
                </div>
            ))}
        </div>

        <div className={cs('list-order')}>
            <div>
                <h2>Danh sách sản phẩm đã đặt hàng</h2>
            </div>
            <table className={cs('list-order-product')}>
                <thead>
                    <tr className={cs('order-row-header')}>
                        <td className={cs('order-label')}><span>Hình ảnh</span></td>
                        <td className={cs('order-label')}><span>Tên sản phẩm</span></td>
                        <td className={cs('order-label')}><span>Số lượng</span></td>
                        <td className={cs('order-label')}><span>Giá tiền</span></td>
                    </tr>
                </thead>
                <tbody>
                    {detail?.Order_details?.length && detail?.Order_details.map((item, i) => (
                        <tr key={i} className={cs('order-row')}>
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
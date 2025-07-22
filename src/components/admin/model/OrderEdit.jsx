import { Badge, Button, Descriptions, Form, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../../utils/convertString/_formatTime'
import useStyles from '../../../hooks/useStyles'
import styles from './OrderEdit.module.scss'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import axiosApi from '../../../services/axios'
import { toast } from 'react-toastify'

function OrderEdit({ detailOrder, isModalOpen, setIsModalOpen, handleGetAllOrder }) {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const cs = useStyles(styles)

    console.log(detailOrder)
    
    const handleSubmitError = (e) => {
        console.log('Error submit', e)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = async (value) => {
        console.log(value)
        
        setLoading(true)
        try{
            const updateStatusOrder = await axiosApi({
                url: `/update-status`,
                method: 'POST',
                data: {id: detailOrder?.id, ...value} 
            })
            if(updateStatusOrder.ec === 0) {
                setIsModalOpen(false)
                setLoading(false)
                toast(updateStatusOrder.ms)
                await handleGetAllOrder()
            } 
        }catch(e){
            console.log(e)
            if(e.ec !== 0) {
                toast(e.ms)
            }
            setLoading(false)
        }
        
    }

    const items = [
        // {
        //     key: '2',
        //     label: 'Mã đơn hàng',
        //     children: detailOrder?.order_code,
        // },
        // {
        //     key: '3',
        //     label: 'Phương thức thanh toán',
        //     children: detailOrder?.pay_method,

        // },
        // {
        //     key: '4',
        //     label: 'Ngày đặt hàng',
        //     children: formatDate(detailOrder?.createdAt, true) ,

        // },
        // {
        //     key: '5',
        //     label: 'Tên khách hàng',
        //     children: detailOrder?.username,
        //     // span: { xl: 2, xxl: 2 }

        // },
        {
            key: '6',
            label: 'Số điện thoại',
            children: detailOrder?.phone,
            // span: { xl: 2, xxl: 2 }

        },
        // {
        //     key: '7',
        //     label: 'Địa chỉ giao hàng',
        //     children: <p>gia lam - 49 - Quận Hoàn Kiếm - Thành phố Hà Nội</p>,
        //     // span: 3,
        // },
        // {
        //     key: '11',
        //     label: 'Ghi chú đơn hàng',
        //     // span: 3,
        //     children: (
        //         <>
                    
        //         </>
        //     ),
        // },
        {
            key: '6',
            label: 'Trạng thái giao hàng',

            children: (
                <Form.Item
                    name='status_transpost'
                >
                    <Select
                        status='warning'
                        style={{ width: '100%' }}
                        options={[
                            { value: 'pending', label: 'Chờ xác nhận' },
                            { value: 'shipping', label: 'Đang giao hàng' },
                            { value: 'completed', label: 'Đã giao hàng' },
                            { value: 'destroy', label: 'Giao thất bại' },
                        ]}
                    />
                </Form.Item>
            ),
        },
        {
            key: '8',
            label: 'Trạng thái đơn hàng',

            children: (
                <Form.Item
                    name='status_payment'
                >
                    <Select
                        status='warning'
                        style={{ width: '100%' }}
                        options={[
                            { value: 'pending', label: 'Chờ xác nhận' },
                            { value: 'completed', label: 'Đã hoàn thành' },
                            { value: 'destroy', label: 'Đã hủy' },
                        ]}
                    />
                </Form.Item>
            ),
        },
        
        // <Badge status="processing" text="Running" />
        {
            key: '10',
            label: 'Giảm giá',
            children: '$20.00',
            // span: 2
        },
        {
            key: '9',
            label: 'Tổng tiền',
            children: '$80.00',
            // span: 2,
        },
        {
            key: '11',
            label: 'Danh sách sản phẩm',
            className: cs('list-product'),
            span: 4,
            children: (
                <table>
                    <thead>
                        <tr>
                            <td>Ảnh</td>
                            <td>Tên sản phẩm</td>
                            <td>Số lượng</td>
                            <td>Giá</td>
                        </tr>
                    </thead>
                    <tbody>
                        {detailOrder?.Order_details?.map(item => (
                            <tr key={item.id} className={cs('flex-box')}>
                                <td className={cs('order-col img-product')}><img loading='lazy' src={item?.Product?.thumbnail} /></td>
                                <td className={cs('order-col name-product')}><span>{item?.Product?.name}</span></td>
                                <td className={cs('order-col quantity-product')}><span>{item?.quantity}</span></td>
                                <td className={cs('order-col price-product')}><span>{convertPrice(item?.Product?.sale_price)}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ),
        },
    ]

    useEffect(() => {
        if (detailOrder) {
            console.log('re-render')
            form.setFieldsValue({
                status_transpost: detailOrder?.status_transpost,
                status_payment: detailOrder?.status_payment,
            })
        }
    }, [detailOrder, form])

  return (
    <div>
        
            <Modal
                title='Thông tin chi tiết đơn hàng'
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                footer={false}
                width={'80%'}
                onCancel={handleCancel}
            >
            <Form
                form={form}
                name="basic"
                 initialValues={{
                    status_ship: detailOrder?.status_transpost,
                    status_order: detailOrder?.status_order,
                }}
                onFinish={handleSubmit}
                onFinishFailed={handleSubmitError}
                autoComplete="off"
            >
            <Descriptions 
            
                size='small'
                bordered 
                items={items} 
                column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }} 
            />
                
            <Button type="primary" htmlType="submit">
                Cập nhật
            </Button>        
        </Form>
            </Modal>
             
    </div>
  )
}

export default OrderEdit
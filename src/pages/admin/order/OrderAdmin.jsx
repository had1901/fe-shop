import React, { useCallback, useEffect, useState } from 'react'
import axiosApi from '../../../services/axios'
import useStyles from '../../../hooks/useStyles'
import styles from './OrderAdmin.module.scss'
import { useSelector } from 'react-redux'
import { Badge, Button, message, Popconfirm, Select, Table, Tag, Tooltip } from 'antd'
import { Link } from 'react-router'
import FilterAdmin from '../../../components/filter/FilterAdmin'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { formatDate } from '../../../utils/convertString/_formatTime'
import { toast } from 'react-toastify'
import OrderEdit from '../../../components/admin/model/OrderEdit'

function OrderAdmin() {
    const cs = useStyles(styles)

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [filtered, setFiltered] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [detailOrder, setDetailOrder] = useState({})
    const themeRedux = useSelector(state => state.admin.theme)

    
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
            width: '4%',
            align: 'center',
            className: cs('col-table'),
            render: (value) =>  <span className={cs('text-color')}>{value}</span>
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_code',
            key: 'order_code',
            // width: '100px',
            align: 'center',
            className: cs('col-table'),
            render: (_,record) => <span>{record.order_code}</span>,

        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'username',
            key: 'username',
            // width: '100px',
            align: 'center',
            className: cs('col-table'),
            render: (_,record) => <span>{record.username}</span>,
        },
        // {
        //     title: 'Số điện thoại',
        //     dataIndex: 'phone',
        //     key: 'phone',
        //     width: '100px',
        //     align: 'center',
        //     className: cs('col-table'),
        //     render: (_,record) => <span>{record.phone}</span>,
        // },
        {
            title: 'Địa chỉ giao hàng',
            dataIndex: 'shipping_address',
            key: 'shipping_address',
            width: '20%',
            align: 'center',
            className: cs('col-table')
    
        },
        {
            title: 'Thanh toán',
            dataIndex: 'pay_method',
            key: 'pay_method',
            // width: '20%',
            align: 'center',
            className: cs('col-table'),
            render: (_,record) => {
                switch(record.pay_method) {
                    case 'cod':
                        return <span>Giao hàng tận nơi</span>
                    case 'vnp':
                        return <span>Thanh toán qua VNPAY</span>
                    case 'qr-code':
                        return <span>Chuyển khoản</span>
                }
            },
    
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            // width: '8%',
            className: cs('col-table'),
            render: (value, record) =>  <span className={cs('created-at')}>{formatDate(record.createdAt)}</span>
        },
        
        {
            title: 'Giao hàng',
            dataIndex: 'status_transpost',
            key: 'status_transpost',
            align: 'center',
            // width: '5%',
            className: cs('col-table'),
            render: (value, record) =>  {
                switch(record.status_transpost){
                    case 'completed':
                        return <Tag color="green" className={cs('price')}>Đã giao hàng</Tag>
                    case 'pending':
                        return <Tag color="orange" className={cs('price')}>Chờ xác nhận</Tag>
                    case 'shipping':
                        return <Tag color="blue" className={cs('price')}>Đang giao hàng</Tag>
                    case 'destroy':
                        return <Tag color="red" className={cs('price')}>Giao thất bại</Tag>
                    default:
                        return <Tag color="orange" className={cs('price')}>Chờ xác nhận</Tag>
                        
                }
            }
    
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status_payment',
            key: 'status_payment',
            align: 'center',
            // width: '8%',
            className: cs('col-table'),
            render: (value, record) =>  {
                const renderStatusText = () => {
                    switch(record.status_payment){
                        case 'completed':
                            return <Tag  color="green" className={cs('price')}>Đã hoàn thành</Tag>
                        case 'pending':
                            return <Tag color="orange" className={cs('price')}>Chờ xác nhận</Tag>
                        case 'destroy':
                            return <Tag color="red" className={cs('price')}>Đã hủy</Tag>
                        default:
                            return <Tag color="red" className={cs('price')}>Chờ xác nhận</Tag>

                    }
                }
                return <div >{renderStatusText()}</div>
                // return  (
                //     <Select
                //         defaultValue={[ { value: 'pending', label: 'Chờ xác nhận' } ]}
                //         // style={{ width: 120 }}
                //         onChange={(e) => handleGetOrderById(e, record.id)}
                //         options={[
                //             { value: 'pending', label: 'Chờ xác nhận' },
                //             { value: 'completed', label: 'Đã hoàn thành' },
                //             { value: 'destroy', label: 'Đã hủy' },
                //         ]}
                //     />
                // )
                
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            width: '10%',
            align: 'center',
            className: cs('col-table'),
            render: (_, record) => {
                return <span className={cs('total-price')}>{convertPrice(record.total_price)}</span>
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <Tooltip placement="top" title={'Xem'}>
                                <Link to={''}> <Button color="primary" variant="outlined" onClick={() => handleGetOrder(record)}><EditOutlined /></Button></Link>
                            </Tooltip>
                        </div>
                        <div>
                            <Popconfirm
                                title="Ẩn đơn hàng"
                                description="Bạn chắc chắn muốn ẩn đơn hàng này?"
                                cancelText="Hủy"
                                okText="Ok"
                                onConfirm={() => handleDelete(record.id)}
                                onCancel={handleCancel}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <Button danger><DeleteOutlined /></Button> 
                            </Popconfirm>
                            
                        </div>
                    </div>
            ),
            align: 'center',
            // width: '10%',
            className: cs('col-table')
    
        },
    ]

    const handleGetOrder = (order) => {
        // console.log(order)
        setDetailOrder(order)
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        console.log(id)
            // try{
            //     setLoading(true)
            //     const res = await axiosApi.delete(`/api/delete-product/${id}`)
            //     if(res.ec === 0) {
            //         setLoading(false)
            //         toast(res.ms)
            //         await handleGetAllOrder()
            //     }
            // } catch(e){
            //         console.log(e)
            //         toast(e.ms)
            // } finally{
            //         setLoading(false)
            // }
    }

    const handleCancel = e => {
        console.log(e)
        message.error('Click on No')
    }

    const handleGetAllOrder = useCallback(async () => {
        try{
            setLoading(true)
            const res = await axiosApi.get('/get-all-order')
            if(res.ec === 0) {
                setOrders(res.dt)
                setLoading(false)
            }
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    },[])

    useEffect(() => {
        handleGetAllOrder()
    },[handleGetAllOrder])

  return (
    <div className={cs(`order-admin`, `${themeRedux === 'dark' ? 'dark-theme' : ''}`)}>
        <div className={cs('heading-tab')}>
            <FilterAdmin 
                data={orders}
                setFiltered={setFiltered}
                setLoading={setLoading}
                page='order'
            />
            <div className={cs('flex-box')}>
                {/* <div className={cs('flex-box')}>
                    <Link to={'add-new-product'}>
                        <Button color='primary' variant='filled'>
                            <PlusCircleOutlined />
                            Thêm sản phẩm mới
                        </Button>
                    </Link>
                    <Badge className='' status="success" text={`Kết quả tìm kiếm: ${filtered?.length} đơn hàng`} />
                </div> */}
                <Badge status="success" text={`Tổng sản phẩm: ${orders.length}`} />

            </div>
        </div>
        <OrderEdit detailOrder={detailOrder} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleGetAllOrder={handleGetAllOrder} />
        <Table 
            columns={columns} 
            dataSource={filtered} 
            rowKey="id"
            size='middle'
            tableLayout='fixed'
            loading={loading}
            rowClassName={() => `${cs('row-table')}`}
            pagination={{
                position: ['bottomCenter'],
                pageSize: 15,
            }}
            sticky={true}
        />
    </div>
  )
}

export default OrderAdmin
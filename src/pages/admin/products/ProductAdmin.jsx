import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Button, Input, message, Popconfirm, Statistic, Table, Tooltip } from 'antd'
import styles from './ProductAdmin.module.scss'
import useStyles from '../../../hooks/useStyles'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import axiosApi from '../../../services/axios'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { Link } from 'react-router'
import FilterAdmin from '../../../components/filter/FilterAdmin'
import { formatDate } from '../../../utils/convertString/_formatTime'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'




function ProductAdmin() {
    const cs = useStyles(styles)
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(false)
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
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (_,record) => <div><img loading='lazy' src={record.thumbnail} /></div>,
            width: '100px',
            align: 'center',
            className: cs('col-table')
    
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            // width: '20%',
            align: 'center',
            className: cs('col-table')

    
        },
        {
            title: 'Slug',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            align: 'center',
            className: cs('col-table')
    
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: '10%',
            align: 'center',
            className: cs('col-table'),
            render: (_, record) => {
                // console.log(record)
                return <span>{record.Category?.name}</span>
            }
        },
        {
            title: 'Số lượng tồn kho',
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
            align: 'center',
            width: '5%',
            className: cs('col-table')
    
        },
        {
            title: 'Giá gốc',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '8%',
            className: cs('col-table'),
            render: (value) =>  <span className={cs('price')}>{convertPrice(value)}</span>
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'sale_price',
            key: 'sale_price',
            align: 'center',
            width: '8%',
            className: cs('col-table'),
            render: (value) =>  <span className={cs('price')}>{convertPrice(value)}</span>
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: '8%',
            className: cs('col-table'),
            render: (value, record) =>  <span className={cs('created-at')}>{formatDate(record.createdAt)}</span>
    
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <Tooltip placement="top" title={'Chỉnh sửa'}>
                                <Link to={`edit/${record.id}`}> <Button color="primary" variant="outlined" onClick={() => handleGetProductById(record.id)}><EditOutlined /></Button></Link>
                            </Tooltip>
                        </div>
                        <div>
                            <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn chắc chắn muốn xóa sản phầm này?"
                                cancelText="Hủy"
                                okText="Xóa"
                                onConfirm={() => handleDelete(record.id)}
                                onCancel={handleCancel}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                {/* <Tooltip placement="top" title={'Xóa'}>
                                </Tooltip> */}
                                <Button danger><DeleteOutlined /></Button> 
                            </Popconfirm>
                            
                        </div>
                    </div>
            ),
            align: 'center',
            width: '10%',
            className: cs('col-table')
    
        },
    ]

    const handleDelete = async (id) => {
            try{
                setLoading(true)
                const res = await axiosApi.delete(`/api/delete-product/${id}`)
                if(res.ec === 0) {
                    setLoading(false)
                    toast(res.ms)
                    await handleGetAllProduct()
                }
            } catch(e){
                    console.log(e)
                    toast(e.ms)
            } finally{
                    setLoading(false)
            }
    }

    const handleCancel = e => {
        console.log(e)
        message.error('Click on No')
    }

    const handleGetProductById = (id) => {
        console.log(id)
    }

    const handleGetAllProduct = useCallback(async () => {
            setLoading(true)
            const data = await axiosApi.get('/api/get-all-product')
            if(data.ec === 0 && data.dt) {
                setProducts(data.dt)
                setLoading(false)
            }
            setLoading(false)
    },[])
    
    // call api lấy tất cả sản phẩm
    useEffect(() => {
        (async () => {
            await handleGetAllProduct()
        })()
    },[handleGetAllProduct])

  return (
    <div className={cs(`products-admin`, `${themeRedux === 'dark' ? 'dark-theme' : ''}`)}>
        <div className={cs('heading-tab')}>
            <FilterAdmin 
                data={products}
                setFiltered={setFiltered}
                setLoading={setLoading}
                page='product'
            />
            <div className={cs('flex-box')}>
                <div className={cs('flex-box')}>
                    <Link to={'add-new-product'}>
                        <Button color='primary' variant='filled'>
                            <PlusCircleOutlined />
                            Thêm sản phẩm mới
                        </Button>
                    </Link>
                    <Badge className='' status="success" text={`Kết quả tìm kiếm: ${filtered?.length} sản phẩm`} />
                </div>
                <Badge status="success" text={`Tổng sản phẩm: ${products.length}`} />

            </div>
        </div>
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

export default ProductAdmin
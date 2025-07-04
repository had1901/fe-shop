import React, { useEffect, useState } from 'react'
import { Button, Input, message, Popconfirm, Table, Tooltip } from 'antd'
import styles from './ProductAdmin.module.scss'
import useStyles from '../../../hooks/useStyles'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import axiosApi from '../../../services/axios'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { Link } from 'react-router'
import { debounce } from '~/utils/debounce/_debounce';
import FilterAdmin from '../../../components/filter/FilterAdmin'




function ProductAdmin() {
    const cs = useStyles(styles)
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterProduct, setFilterProduct] = useState({
        category: 'all',
        price_name: 'all',
        search: ''
    })
    
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
            width: '4%',
            align: 'center',
            className: cs('col-table'),
            render: (value, record) =>  <span className={cs('text-color')}>{value}</span>
        },
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (_,record) => <div><img src={record.thumbnail} /></div>,
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
            render: (value, record) =>  <span className={cs('price')}>{convertPrice(value)}</span>
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'sale_price',
            key: 'sale_price',
            align: 'center',
            width: '8%',
            className: cs('col-table'),
            render: (value, record) =>  <span className={cs('price')}>{convertPrice(value)}</span>
    
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
                                onConfirm={handleConfirm}
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

    const removeHash = (str) => {
        return str
          .normalize('NFD')                      // Tách dấu ra khỏi ký tự
          .replace(/[\u0300-\u036f]/g, '')       // Xóa dấu
          .replace(/đ/g, 'd')                    // thay đ -> d
          .replace(/Đ/g, 'D')
          .toLowerCase();                        // Viết thường
    }

    const handleConfirm = e => {
        console.log(e.target)
        message.success('Click on Yes')
    }
      const handleCancel = e => {
        console.log(e)
        message.error('Click on No')
    }

    const handleGetProductById = (id) => {
        console.log(id)
    }

    const handleChangeSortCategory = value => {
        setFilterProduct(prev => ({...prev, category: value}))
    }

    const handleChangeSortProduct = value => {
        setFilterProduct(prev => ({...prev, price_name: value}))
    }
    
    const handleSearchText = debounce((e) => {
        setFilterProduct(prev => ({...prev, search: e.target.value}))
    },500)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await axiosApi.get('/api/get-all-product')
            if(data.ec === 0 && data.dt) {
                setProducts(data.dt)
                setLoading(false)
            }
        })()
    },[])

    
 
    useEffect(() => {
        const filterProductList = products.filter(item => {         
            if(filterProduct.category === 'all') {
                return removeHash(item.name).includes(removeHash(filterProduct.search)) && item
            }
            if(filterProduct.category !== 'all') {
                const matchName = filterProduct.price_name ? removeHash(item.name).includes(removeHash(filterProduct.search)) : true
                const matchCategory = filterProduct.category ? removeHash(item.name).includes(removeHash(filterProduct.search)) && item.Category.tag.includes(filterProduct.category) : true
                return matchName && matchCategory 
            }
        })

        filterProduct.price_name === 'asc' && filterProductList.sort((a,b) =>  a.name.localeCompare(b.name))
        filterProduct.price_name === 'desc' && filterProductList.sort((a,b) =>  b.name.localeCompare(a.name))
        filterProduct.price_name === 'min-max' && filterProductList.sort((a,b) =>  a.price - b.price)
        filterProduct.price_name === 'max-min' && filterProductList.sort((a,b) =>  b.price - a.price)
            
        setFiltered(filterProductList)
    },[products, filterProduct.price_name, filterProduct.category, filterProduct.search])
    

  return (
    <div className={cs('products-admin')}>
        <div className={cs('heading-tab')}>
            <FilterAdmin 
                handleChangeSortCategory={handleChangeSortCategory} 
                handleSearchText={handleSearchText} 
                handleChangeSortProduct={handleChangeSortProduct}
            />
            <Link to={'add-new-product'}>
                <Button color='primary' variant='filled'>
                    <PlusCircleOutlined />
                    Thêm sản phẩm mới
                </Button>
            </Link>
        </div>
        <Table 
            columns={columns} 
            dataSource={filtered} 
            rowKey="id"
            loading={loading}
            // rowClassName={() => `${cs('row-table')}`}
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
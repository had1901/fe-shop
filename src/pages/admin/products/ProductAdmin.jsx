import React, { useEffect, useState } from 'react'
import { Button, Input, Select, Space, Table, Tag } from 'antd'
import styles from './ProductAdmin.module.scss'
import useStyles from '../../../hooks/useStyles'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axiosApi from '../../../services/axios'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { CgLayoutGrid } from 'react-icons/cg'
import { Link } from 'react-router'



  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

function ProductAdmin() {
    const cs = useStyles(styles)
    const [products, setProducts] = useState([])
    const [filterProduct, setFilterProduct] = useState({
        category: '',
        price_name: ''
    })
    
    console.log(products)
    console.log(filterProduct)


    const handleGetProductById = (id) => {
        console.log(id)
    }

    const handleChangeSortCategory = value => {
        console.log(`Category: ${value}`)
        setFilterProduct(prev => ({...prev, category: value}))
    }

    const handleChangeSortProduct = value => {
        console.log(`Product: ${value}`)
        setFilterProduct(prev => ({...prev, category: value}))
    }
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
                <Space size="middle">
                   <Link to={`edit/${record.id}`}> <Button color='primary' type='primary' onClick={() => handleGetProductById(record.id)}><EditOutlined /></Button></Link>
                    <Button danger><DeleteOutlined /></Button> 
                </Space>
            ),
            align: 'center',
            width: '10%',
            className: cs('col-table')
    
        },
    ]
    
    useEffect(() => {
        (async () => {
            const data = await axiosApi.get('/api/get-all-product')
            if(data.ec === 0 && data.dt) {
                setProducts(data.dt)
            }
        })()
    },[])

    const text = ['character', 'apple', 'banana', 'home', 'zed']
    const number = [3, 5, 70, 11, 9]
    // console.log(text.sort())
    const newProducts = products.filter(item => {
        // if(filterProduct.price_name === 'min-max') {

        // }
        return item.Category.tag === filterProduct.category 
    })

    console.log('newProducts', newProducts)

  return (
    <div className={cs('products-admin')}>
        <div className={cs('filter')}>
            <div className={cs('filter-search input-search')}>
                <h3 htmlFor="">Tìm kiếm</h3>
                <Input name='filter' placeholder='Tìm kiếm theo tên' />
            </div>
            <div className={cs('filter-search')}>
                <h3 htmlFor="">Danh mục</h3>
                <Select
                    defaultValue="Tất cả"
                    style={{ minWidth: 160 }}
                    onChange={handleChangeSortCategory}
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'pc', label: 'PC' },
                        { value: 'laptop', label: 'Laptop' },
                        { value: 'screen', label: 'Màn hình' },
                        { value: 'keyboard', label: 'Bàn phím' },
                        { value: 'mouse', label: 'Chuột' },
                        { value: 'chair', label: 'Ghế gaming' },
                        { value: 'network', label: 'Thiết bị mạng' },
                    ]}
                />
            </div>
            <div className={cs('filter-search')}>
                <h3 htmlFor="">Lọc sản phẩm</h3>
                <Select
                    defaultValue="Tất cả"
                    style={{ minWidth: 160 }}
                    onChange={handleChangeSortProduct}
                    options={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'min-max', label: 'Giá tăng dần' },
                        { value: 'max-min', label: 'Giá giảm dần' },
                        { value: 'asc', label: 'Theo tên từ A - Z' },
                        { value: 'desc', label: 'Theo tên từ Z - A' },
                    ]}
                />
            </div>

        </div>
        <Table 
            columns={columns} 
            dataSource={products} 
            rowClassName={() => `${cs('row-table')}`}
            bordered={false}
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
import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd'
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
    const handleGetProductById = (id) => {
        console.log(id)
    }
    const columns = [
        {
            title: 'ID',
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

  return (
    <div>
        <Table 
            columns={columns} 
            dataSource={products} 
            rowClassName={() => `${cs('row-table')}`}
            // bordered={true}
            pagination={{
                position: ['bottomCenter'],
                pageSize: 15,
            }}
        />
    </div>
  )
}

export default ProductAdmin
import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Button, Input, message, Popconfirm, Statistic, Table, Tooltip } from 'antd'
import styles from './ProductAdmin.module.scss'
import useStyles from '../../../hooks/useStyles'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import axiosApi from '../../../services/axios'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { Link } from 'react-router'
import { debounce } from '~/utils/debounce/_debounce';
import FilterAdmin from '../../../components/filter/FilterAdmin'
import { formatDate } from '../../../utils/convertString/_formatTime'
import { useSelector } from 'react-redux';




function ProductAdmin() {
    const cs = useStyles(styles)
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(false)
    const [filterProduct, setFilterProduct] = useState({
        category: 'all',
        sortBy: 'all',
        search: '',
        date: {}
    })
    const themeRedux = useSelector(state => state.admin.theme)

    const filterByCreateAt = useCallback((data) => {
        const startFilter = new Date(filterProduct.date.start).setHours(0,0,0,0)
        const endFilter = new Date(filterProduct.date.end).setHours(23,59,59,999)
        if(data?.length) {
            const fil = data.filter(item => {
                if(item.createdAt) {
                    const createdAt = new Date(item.createdAt).getTime()
                    return createdAt >= startFilter && createdAt <= endFilter
                }
                }
            )
            return fil
        }
        return []
    },[filterProduct.date.start, filterProduct.date.end])
    
    
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

    // const handleChangeSortCategory = value => {
    //     setFilterProduct(prev => ({...prev, category: value}))
    // }

    // const handleChangeSortProduct = value => {
    //     setFilterProduct(prev => ({...prev, sortBy: value}))
    // }
    
    // const handleChangeSortDate = value => {
    //     const startDate = value[0]
    //     const endDate = value[1]
    //     setFilterProduct(prev => ({...prev, date: { start: startDate.$d, end: endDate.$d }}))
    // }

    // const handleSearchText = debounce((e) => {
    //     setFilterProduct(prev => ({...prev, search: e.target.value}))
    // },500)

    // const handleFilterAndSort = useCallback(() => {
    //     setLoading(true)
    //     let filterProductList
    //     let result
    //     filterProductList = products.filter(item => {         
    //         if(filterProduct.category === 'all') {
    //             return removeHash(item.name).includes(removeHash(filterProduct.search)) && item
    //         }
    //         if(filterProduct.category !== 'all') {
    //             const matchName = filterProduct.sortBy 
    //                 ? removeHash(item.name).includes(removeHash(filterProduct.search)) 
    //                 : true
    //             const matchCategory = filterProduct.category 
    //                 ? removeHash(item.name).includes(removeHash(filterProduct.search)) && item.Category.tag.includes(filterProduct.category) 
    //                 : true
    //             return matchName && matchCategory
    //         }
    //     })
    //    if(filterProductList?.length > 0) {
    //         filterProduct.sortBy === 'asc' && filterProductList.sort((a,b) =>  a.name.localeCompare(b.name))
    //         filterProduct.sortBy === 'desc' && filterProductList.sort((a,b) =>  b.name.localeCompare(a.name))
    //         filterProduct.sortBy === 'min-max' && filterProductList.sort((a,b) =>  a.price - b.price)
    //         filterProduct.sortBy === 'max-min' && filterProductList.sort((a,b) =>  b.price - a.price)
    //         filterProduct.sortBy === 'new-date' && filterProductList.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt))
    //         filterProduct.sortBy === 'old-date' && filterProductList.sort((a,b) =>  new Date(a.createdAt) - new Date(b.createdAt))
    //     }

    //     if(filterProduct.date.start && filterProduct.date.end) {
    //         result = filterByCreateAt(filterProductList)
    //     } else {
    //         result = filterProductList
    //     }
    //     setFiltered(result)

    //     return true
    // },[products, filterProduct.sortBy, filterProduct.category, filterProduct.search, filterProduct.date.start, filterProduct.date.end, filterByCreateAt])
    
    // // filter product
    // useEffect(() => {
    //     const isFilter = handleFilterAndSort()
    //     if(isFilter) {
    //         setLoading(false)
    //     }
    // },[filterProduct.sortBy, filterProduct.category, filterProduct.search, handleFilterAndSort])
    
    // call api lấy tất cả sản phẩm
    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await axiosApi.get('/api/get-all-product')
            if(data.ec === 0 && data.dt) {
                setProducts(data.dt)
                setLoading(false)
            }
            setLoading(false)

        })()
    },[])

  return (
    <div className={cs(`products-admin`, `${themeRedux === 'dark' ? 'dark-theme' : ''}`)}>
        <div className={cs('heading-tab')}>
            <FilterAdmin 
                data={products}
                setFiltered={setFiltered}
                setLoading={setLoading}
                page='product'
                // handleChangeSortCategory={handleChangeSortCategory} 
                // handleSearchText={handleSearchText} 
                // handleChangeSortProduct={handleChangeSortProduct}
                // handleChangeSortDate={handleChangeSortDate}
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
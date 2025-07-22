import React, { useCallback, useEffect, useState } from 'react'
import styles from './FilterAdmin.module.scss'
import useStyles from '../../hooks/useStyles'
import { Input, Select } from 'antd'
import { DatePicker, Space } from 'antd'
import { debounce } from './../../utils/debounce/_debounce';
import { removeHash } from '../../utils/convertString/_removeHash'
const { RangePicker } = DatePicker

function FilterAdmin({ data, setLoading, setFiltered, page = 'product' }) {
    const cs = useStyles(styles)
    const [filterData, setFilterData] = useState({
            category: 'all',
            sortBy: 'all',
            search: '',
            date: {}
        })

    // Tìm kiếm theo tên
    const handleSearchText = debounce((e) => {
        console.log(e.target.value)
        setFilterData(prev => ({...prev, search: e.target.value}))
    },500)

    // Lọc theo danh mục
    const handleChangeSortCategory = value => {
        setFilterData(prev => ({...prev, category: value}))
    }

    // Lọc theo các tiêu chí khác
    const handleChangeSortProduct = value => {
        setFilterData(prev => ({...prev, sortBy: value}))
    }

    // Lọc theo mốc thời gian
    const handleChangeSortDate = value => {
        if(value === null) {
            setFilterData(prev => ({...prev, date: {}}))
        }
        if(value?.length > 0) {
            const startDate = value[0]
            const endDate = value[1]
            setFilterData(prev => ({...prev, date: { start: startDate.$d, end: endDate.$d }}))
        }
    }

    // Lọc theo ngày tạo (khoảng thời gian)
    const filterByCreateAt = useCallback((data) => {
            const startFilter = new Date(filterData.date.start).setHours(0,0,0,0)
            const endFilter = new Date(filterData.date.end).setHours(23,59,59,999)
            if(data?.length) {
                console.log('fil-date')
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
        },[filterData.date.start, filterData.date.end])

    const handleFilterAndSort = useCallback(() => {
        if(page === 'product') {
            setLoading(true)
            let filterDataList
            let result
            filterDataList = data.filter(item => {         
                if(filterData?.category === 'all') {
                    return removeHash(item?.name).includes(removeHash(filterData?.search)) && item
                }
                if(filterData.category !== 'all') {
                    const matchName = filterData?.sortBy 
                        ? removeHash(item?.name).includes(removeHash(filterData?.search)) 
                        : true
                    const matchCategory = filterData?.category 
                        ? removeHash(item?.name).includes(removeHash(filterData?.search)) && item?.Category?.tag.includes(filterData.category) 
                        : true
                    return matchName && matchCategory
                }
            })

            if(filterDataList?.length > 0) {
                filterData.sortBy === 'asc' && filterDataList.sort((a,b) =>  a.name.localeCompare(b.name))
                filterData.sortBy === 'desc' && filterDataList.sort((a,b) =>  b.name.localeCompare(a.name))
                filterData.sortBy === 'min-max' && filterDataList.sort((a,b) =>  a.price - b.price)
                filterData.sortBy === 'max-min' && filterDataList.sort((a,b) =>  b.price - a.price)
                filterData.sortBy === 'new-date' && filterDataList.sort((a,b) =>  new Date(b.createdAt) - new Date(a.createdAt))
                filterData.sortBy === 'old-date' && filterDataList.sort((a,b) =>  new Date(a.createdAt) - new Date(b.createdAt))
            }
    
            if(filterData.date.start && filterData.date.end) {
                result = filterByCreateAt(filterDataList)
            } else {
                result = filterDataList
            }

            setFiltered(result)
            setLoading(false)
    
            return true
        }
    
        if(page === 'account') {
            setLoading(true)
            let filterDataList
            let result
            filterDataList = data.filter(item => removeHash(item?.username).includes(removeHash(filterData?.search)) && item )

            // lọc theo khoảng thời gian
            if(filterData.date.start && filterData.date.end) {
                result = filterByCreateAt(filterDataList)
            } else {
                result = filterDataList
            }

            setFiltered(result)
            setLoading(false)
        }

        if(page === 'order') {
            setLoading(true)
            let filterDataList
            let result
            filterDataList = data.filter(item => removeHash(item?.username || item?.shipping_address || item?.order_code || item?.pay_method).includes(removeHash(filterData?.search)) && item )

            // lọc theo khoảng thời gian
            if(filterData.date.start && filterData.date.end) {
                result = filterByCreateAt(filterDataList)
            } else {
                result = filterDataList
            }

            setFiltered(result)
            setLoading(false)
        }
            
    },[data, filterData.sortBy, filterData.category, filterData.search, filterData.date.start, filterData.date.end, page, filterByCreateAt, setFiltered, setLoading])
        
    useEffect(() => {
        const isFilter = handleFilterAndSort()
        if(isFilter) {
            setLoading(false)
        }
    },[filterData.sortBy, filterData.category, filterData.search, setLoading, page, handleFilterAndSort])

    return (
        <div className={cs('filter')}>
            <div className={cs('filter-search input-search')}>
                <h3 htmlFor="">Tìm kiếm</h3>
                <Input name='filter' placeholder='Tìm kiếm theo tên' onChange={handleSearchText}/>
            </div>
            {page === 'product' && 
                (<div className={cs('filter-search')}>
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
                </div>)
            }
            {page === 'product' && 
                (<div className={cs('filter-search')}>
                    <h3 htmlFor="">Lọc sản phẩm</h3>
                    <Select
                        defaultValue="Tất cả"
                        style={{ minWidth: 160 }}
                        onChange={handleChangeSortProduct}
                        options={[
                            { value: 'all', label: 'Tất cả' },
                            { value: 'min-max', label: 'Giá tăng dần' },
                            { value: 'max-min', label: 'Giá giảm dần' },
                            { value: 'old-date', label: 'Cũ nhất' },
                            { value: 'new-date', label: 'Mới nhất' },
                            { value: 'asc', label: 'Theo tên từ A - Z' },
                            { value: 'desc', label: 'Theo tên từ Z - A' },
                        ]}
                    />
                </div>)
            }
             <div className={cs('filter-search filter-date')}>
                <h3 htmlFor="">Lọc theo ngày tạo</h3>
                <RangePicker onChange={handleChangeSortDate}/>
            </div>
                

        </div>
  )
}

export default FilterAdmin
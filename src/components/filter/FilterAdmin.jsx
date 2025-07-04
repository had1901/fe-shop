import React from 'react'
import styles from './FilterAdmin.module.scss'
import useStyles from '../../hooks/useStyles'
import { Input, Select } from 'antd'

function FilterAdmin({ handleSearchText, handleChangeSortCategory, handleChangeSortProduct }) {
  const cs = useStyles(styles)

  return (
    <div className={cs('filter')}>
            <div className={cs('filter-search input-search')}>
                <h3 htmlFor="">Tìm kiếm</h3>
                <Input name='filter' placeholder='Tìm kiếm theo tên' onChange={handleSearchText}/>
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
  )
}

export default FilterAdmin
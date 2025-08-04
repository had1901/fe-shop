import React, { useState } from 'react'
import styles from './AuthAddress.module.scss'
import useStyles from '../../../hooks/useStyles'
import SelectAddress from '../../selectAddress/SelectAddress';
import { Modal } from 'antd';

function AuthAddress() {
  const cs = useStyles(styles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addressList, setAddressList] = useState([])
  const [data, setData] = useState({
    cityCode: '',
    districtCode: '',
    wardCode: '',
    houseNumber: '',
  })

  console.log(data)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  return (
    <div 
      className={cs('address')}
    >
      <div>
        <h1 className={cs('title')}>Thông tin tài khoản</h1>
      </div>
      <div>
        <button className={cs('add-address')} onClick={showModal}>Thêm địa chỉ</button>
        <Modal
          title="Chọn địa chỉ"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <SelectAddress info={data} onChange={handleChange} />
          {!addressList.length && 'Hãy thêm một địa chỉ'}
      </Modal>
      </div>
    </div>
  )
}

export default AuthAddress
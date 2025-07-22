import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './AddressPage.module.scss'
import AddressMap from '../../components/address/AddressMap'

const listAddress = [
  {
    title: 'TÂN BÌNH - HOÀNG HOA THÁM',
    address: '78-80-82 Hoàng Hoa Thám, Phường Bảy Hiền, TP.HCM',
    map: 'https://maps.app.goo.gl/yNFuHkrBSZRGc3s49',
  },
  {
    title: 'TP THỦ ĐỨC - KHA VẠN CÂN',
    address: '905 Phường Linh Tây, TP.HCM',
    map: 'https://maps.app.goo.gl/wVy8YCeoYGB5T7vw8',
  },
  {
    title: 'QUẬN 5 - TRẦN HƯNG ĐẠO',
    address: '1081-1083 Trần Hưng Đạo, Phường An Đông, TP.HCM',
    map: 'https://maps.app.goo.gl/Gx3sk3cT4pYfQSJF7',
  },
  {
    title: 'BÌNH THẠNH - NGUYỄN CỬU VÂN',
    address: '63 Nguyễn Cửu Vân, Phường Gia Định, TP.HCM',
    map: 'https://maps.app.goo.gl/idUpAFfE1b7U26KJA',
  },
  
]
function AddressPage() {
    const cs = useStyles(styles)

  return (
    <div className={'container'}>
        <div className={cs('address')}>
          <h2 className={cs('heading')}>Cửa hàng tại Hà Nội</h2>
          <div className='row'>
            <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12'>
              <div className={cs('box')}>
                <AddressMap title='Đống Đa - Thái Hà' address='162-164 Thái Hà, Phường Đống Đa, Hà Nội' link='https://maps.app.goo.gl/bFrvK9HhaGrkKxe89' />
              </div>
            </div>
          </div>
          <h2 className={cs('heading')}>Cửa hàng tại TP. Hồ Chí Minh</h2>
          <div className='row gutter-1'>
              {listAddress.map(item => (
                <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                  <div className={cs('box')}>
                    <AddressMap title={item.title} address={item.address} link={item.map} />
                  </div>
                </div>
              ))}
          </div>
        </div>
    </div>
  )
}

export default AddressPage
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoCustomer } from '../../../store/cart/cartSlice'

function CartPay() {
  const info = useSelector(state => state.cart.infoCustomer)
  const dispatch = useDispatch()

  useEffect(() => {
    const getAddress = async () => {
      const resCity = await fetch(`https://provinces.open-api.vn/api/p/${info.cityCode}`)
      const resDistrict = await fetch(`https://provinces.open-api.vn/api/d/${info.districtCode}`)
      // const resWard = await fetch(`https://provinces.open-api.vn/api/w/${info.wardCode}`)
      const city = await resCity.json()
      const district = await resDistrict.json()
      // const ward = await resWard.json()

      console.log('city', city)
      console.log('district', district)
      if(city && district) {
        dispatch(setInfoCustomer({
          ...info, 
          cityCode: city.name, 
          districtCode: district.name, 
          // wardCode: ward.name, 
        }))
      }
    }
    getAddress()
  },[info, dispatch])

  return (
    <div>
      <h3>Thông tin đặt hàng</h3>
      <div>
        <ul>
          <li>
            <span>Khách hàng</span>
            <span>{info.name}</span>
          </li>
          <li>
            <span>Số điện thoại</span>
            <span>{info.phone}</span>
          </li>
          <li>
            <span>Địa chỉ nhận hàng</span>
            <span>{`${info.houseNumber}, ${info.wardCode}, ${info.districtCode}, ${info.cityCode}`}</span>
          </li>
          <li>
            <span>Tạm tính</span>
            <span></span>
          </li>
          <li>
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </li>
          <li>
            <span>Tổng tiền</span>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CartPay
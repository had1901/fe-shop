import React, { useEffect, useState } from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './SelectAddress.module.scss'
import axiosApi from './../../services/axios';


function SelectAddress({ setInfo }) {
    const [selectedProvince, setSelectedProvince] = useState("")
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const cs = useStyles(styles)

    const [selectedProvinceCode, setSelectedProvinceCode] = useState("")
    const [selectedDistrictCode, setSelectedDistrictCode] = useState("")
    const [selectedWardCode, setSelectedWardCode] = useState("")

  const handleChange = (e) => {
    setSelectedProvince(e.target.value)
  }

  const filteredDistricts = districts.filter(
    (d) => d.province_code === selectedProvinceCode
  )

  const filteredWards = wards.filter(
    (w) => w.district_code === selectedDistrictCode
  )

  useEffect(() => {
    const getProvinces = async () => {
        const res = await fetch('https://provinces.open-api.vn/api/p/')
        const result = await res.json()
        setProvinces(result)
    }
    getProvinces()
    const getDistricts = async () => {
        const res = await fetch('https://provinces.open-api.vn/api/d/')
        const result = await res.json()
        setDistricts(result)
    }
    getDistricts()
    const getWards = async () => {
        const res = await fetch('https://provinces.open-api.vn/api/w/')
        const result = await res.json()
        setWards(result)
    }
    getWards()
  },[])
  return (
        <div className={cs('select-province')}>
            <select 
                id="province" className={cs('province')} 
                value={selectedProvinceCode} 
                onChange={(e) => {
                    const code = parseInt(e.target.value)
                    setInfo(prev => ({...prev, cityCode: e.target.value}))
                    setSelectedProvinceCode(code)
                    setSelectedDistrictCode('')
                    setSelectedWardCode('')
                }}
            >
                <option value="">-- Chọn tỉnh/thành --</option>
                {provinces.map(province => (
                <option key={province.code} value={province.code}>
                    {province.name}
                </option>
                ))}
            </select>

            <select 
                id="province" 
                className={cs('province')} 
                value={selectedDistrictCode}
                onChange={(e) => {
                    const code = parseInt(e.target.value)
                    setInfo(prev => ({...prev, districtCode: e.target.value}))

                    setSelectedDistrictCode(code)
                    setSelectedWardCode('')
                }}
            >
                <option value="">-- Chọn quận/huyện --</option>
                {filteredDistricts.map(district => (
                <option key={district.code} value={district.code}>
                    {district.name}
                </option>
                ))}
            </select>
            
            <select id="province" className={cs('province')} value={selectedWardCode} 
                onChange={(e) => {
                    const code = parseInt(e.target.value)
                    setSelectedWardCode(code)
                    setInfo(prev => ({...prev, wardCode: e.target.value}))
                }}
            >
                <option value="">-- Chọn xã/thị trấn --</option>
                {filteredWards.map(ward => (
                <option key={ward.code} value={ward.code}>
                    {ward.name}
                </option>
                ))}
            </select>
            <div className={cs('address-number')}>
                <input id='address-number' type="text" className={cs('province')} onChange={(e) => setInfo(prev => ({...prev, houseNumber: e.target.value}))}/>
                <label htmlFor="address-number">Số nhà, tên đường</label>
            </div>
           
            {/* <select id="province" className={cs('province')} value={selectedProvince}>
                <option value="">-- Chọn tỉnh/thành --</option>
                {provinces.map(province => (
                <option key={province.code} value={province.name}>
                    {province.name}
                </option>
                ))}
            </select> */}
        </div>
  )
}

export default SelectAddress
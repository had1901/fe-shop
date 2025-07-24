import React, { useEffect, useState } from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './SelectAddress.module.scss'
import axiosApi from './../../services/axios';


function SelectAddress({ info, onChange }) {
    const [selectedProvince, setSelectedProvince] = useState("")
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const cs = useStyles(styles)

    // const [selectedProvinceCode, setSelectedProvinceCode] = useState("")
    const [selectedDistrictCode, setSelectedDistrictCode] = useState("")
    const [selectedWardCode, setSelectedWardCode] = useState("")


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
    useEffect(() => {
        if(info.cityCode !== '') {
            const filteredDistricts = districts.filter(
                (d) => d.province_code === Number(info.cityCode)
            )
            setSelectedDistrictCode(filteredDistricts)
        }
        if(info.districtCode !== '') {
            const filteredWards = wards.filter(
                (w) => w.district_code === Number(info.districtCode)
            )
            setSelectedWardCode(filteredWards)
        }
    },[info, info.cityCode, info.districtCode, districts, wards])
    
    return (
        <div className={cs('select-province')}>

            <select id="province-city" className={cs('province')} name='cityCode' required onChange={onChange}>
                <option value="">-- Chọn tỉnh/thành --</option>
                {provinces.map(province => (
                    <option key={province.code} value={province.code}>
                        {province.name}
                    </option>
                ))}
            </select>

            <select id="province-district" className={cs('province')} name='districtCode' required onChange={onChange}>
                <option value="">-- Chọn quận/huyện --</option>
                {selectedDistrictCode.length && selectedDistrictCode.map(district => (
                    <option key={district.code} value={district.code}>
                        {district.name}
                    </option>
                ))}
            </select>
            
            <select id="province-ward" className={cs('province')} name='wardCode' required onChange={onChange}>
                <option value="">-- Chọn xã/thị trấn --</option>
                {selectedWardCode.length && selectedWardCode.map(ward => (
                    <option key={ward.code} value={ward.code}>
                        {ward.name}
                    </option>
                ))}
            </select>

            <div className={cs('address-number')}>
                <input id='address-number' type="text" name='houseNumber' className={cs('province')} required onChange={onChange}/>
                <label htmlFor="address-number">Số nhà, tên đường</label>
            </div>
        </div>
    )
}

export default SelectAddress
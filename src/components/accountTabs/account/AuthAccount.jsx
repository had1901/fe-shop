import React, { useEffect, useState } from 'react'
import { CgLayoutGrid } from 'react-icons/cg'
import useStyles from '../../../hooks/useStyles'
import styles from './AuthAccount.module.scss'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from 'antd'
import axiosApi from '../../../services/axios'
import { toast } from 'react-toastify'
import { setUser } from '../../../store/auth/authSlice'

const day = [...Array(32).keys()]
const month = [...Array(13).keys()]

function AuthAccount() {
  const [years, setYears] = useState([]);
  const cs = useStyles(styles)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const user = useSelector(state => state.auth.info)
  console.log(user)
  const submitForm = async (data) => {
      try{
        const res = await axiosApi.post('/auth/update-profile', data)
        console.log(res)
        if(res.ec === 0) {
          dispatch(setUser(res.dt))
          toast(res.ms)
        }
      }catch(e){
        console.log(e)
        toast(e.ms)
      }
  }

  // const configInput = [
  //   {
  //     label: 'Họ tên',
  //     name: 'lastname',
  //     errorMessage: 'Vui lòng nhập tên'
  //   }
  // ]
  useEffect(() => {
    const createYear = () => {
      const arr = []
      for(let i = 1970; i <= 2010; i++) {
        arr.push(i)
      }
      setYears(arr)
    }
    createYear()
  },[])
  

  return (
      <div className={cs('account')}>
        <motion.div>
          <div className={cs('title')}>
            <h1 >Thông tin tài khoản</h1>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className={cs('form-information')}>

          <div className={cs('input-form')}>
              <label htmlFor="username" className={cs('input-label')}>Tên tài khoản</label>
              <input id='username' name='username' defaultValue={user.username && user.username} className={cs('input-field')} type="text" disabled />
            </div>

            <div className={cs('input-form')}>
              <label htmlFor="firstname" className={cs('input-label')}>Họ</label>
              <input id='firstname' name='firstname' defaultValue={user.firstname && user.firstname} className={cs('input-field')} type="text" {...register('firstname', { required: true, maxLength: 14 })} />
              {errors.firstname && <span className={cs('error-label')}>Vui lòng nhập họ</span>}
            </div>

            <div className={cs('input-form')}>
              <label htmlFor="lastname" className={cs('input-label')}>Tên</label>
              <input id='lastname' name='lastname' defaultValue={user.lastname && user.lastname} className={cs('input-field')} type="text" {...register('lastname', { required: true, maxLength: 14 })} />
              {errors.lastname && <span className={cs('error-label')}>Vui lòng nhập tên</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="nam" className={cs('input-label')}>Giới tính</label>
              <div className={cs('gender-radio')}>
                <div className={cs('gender-group')}>
                  <label htmlFor="nam" className={cs('label-gender')}>Nam</label>
                  <input id='nam' type="radio" name='gender' value='Nam' {...register('gender', { required: true, maxLength: 14 })}/>
                </div>
                <div className={cs('gender-group')}>
                  <label htmlFor="nu" className={cs('label-gender')}>Nữ</label>
                  <input id='nu' type="radio" name='gender' value='Nữ' {...register('gender', { required: true, maxLength: 14 })}/>
                </div>
              </div>
              {errors.gender && <span className={cs('error-label')}>Vui lòng chọn giới tính</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="phone" className={cs('input-label')}>Số điện thoại</label>
              <input id='phone' className={cs('input-field')} name='phone' type="text" {...register('phone', { maxLength: 10 })}/>
              {errors.phone && <span className={cs('error-label')}>Vui lòng nhập số điện thoại</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="email" className={cs('input-label')}>Email</label>
              <input id='email' defaultValue={user.email && user.email} name='email' className={cs('input-field')} type="email" {...register('email', { required: true, maxLength: 30 })} />
              {errors.email && <span className={cs('error-label')}>Vui lòng nhập số email</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="birthday" className={cs('input-label')}>Ngày sinh</label>
              <select name="day" id="" className={cs('select-form')} {...register('day')}>
              <option key={0} value={''}>Ngày</option>
                {day.length && day.filter(d => d > 0).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select name="month" id="" className={cs('select-form')} {...register('month')}>
                <option key={0} value={''}>Tháng</option>
                {month.length && month.filter(d => d > 0).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select name="year" id="" className={cs('select-form')} {...register('year')}>
                <option value={''}>Năm</option>
                {years.length && years.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
              {/* {errors.year && <span>Vui lòng chọn năm sinh</span>} */}
    
            </div>
              <div className={cs('btn-submit')}><Button type='primary' htmlType='submit' value='Lưu thay đổi'>Lưu thay đổi</Button></div>
          </form>
        </motion.div>
      </div>
  )
}

export default AuthAccount
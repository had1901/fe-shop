import React, { useEffect, useState } from 'react'
import { CgLayoutGrid } from 'react-icons/cg'
import useStyles from '../../../hooks/useStyles'
import styles from './AuthAccount.module.scss'
import { useForm } from "react-hook-form"
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from 'antd'

const day = [...Array(32).keys()]
const month = [...Array(13).keys()]

function AuthAccount() {
  const [years, setYears] = useState([]);
  const cs = useStyles(styles)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const user = useSelector(state => state.auth.info)

  const submitForm = (data) => {
      console.log('data', data)
  }

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
      <div 
        
        className={cs('account')}
      >
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 1 }}
        >
          <div className={cs('title')}>
            <h1 >Thông tin tài khoản</h1>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className={cs('form-information')}>
            <div className={cs('input-form')}>
              <label htmlFor="username" className={cs('input-label')}>Họ Tên</label>
              <input id='username' defaultValue={user.username && user.username} className={cs('input-field')} type="text" {...register('username', { required: true, maxLength: 14 })} />
              {errors.username && <span>Vui lòng nhập tên</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="nam" className={cs('input-label')}>Giới tính</label>
              <div className={cs('gender-radio')}>
                <div className={cs('gender-group')}>
                  <label htmlFor="nam" className={cs('label-gender')}>Nam</label>
                  <input id='nam'  type="radio" name='sex' value='Nam' defaultChecked {...register('gender', { required: true, maxLength: 14 })}/>
                </div>
                <div className={cs('gender-group')}>
                  <label htmlFor="nu" className={cs('label-gender')}>Nữ</label>
                  <input id='nu'  type="radio" name='sex' value='Nữ' {...register('gender', { required: true, maxLength: 14 })}/>
                </div>
              </div>
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="phone" className={cs('input-label')}>Số điện thoại</label>
              <input id='phone' className={cs('input-field')} type="text" {...register('phone', { maxLength: 10 })}/>
              {errors.phone && <span>Vui lòng nhập số điện thoại</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="email" className={cs('input-label')}>Email</label>
              <input id='email' defaultValue={user.email && user.email} style={{border: user.email ? 'none' : '1px solid #ccc'}} className={cs('input-field')} type="text" {...register('email', { required: true, maxLength: 30 })} />
              {errors.email && <span>Vui lòng nhập số email</span>}
            </div>
    
            <div className={cs('input-form')}>
              <label htmlFor="birthday" className={cs('input-label')}>Ngày sinh</label>
              <select name="" id="" className={cs('select-form')} {...register('day')}>
              <option key={0} value={''}>Ngày</option>
                {day.length && day.filter(d => d > 0).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select name="" id="" className={cs('select-form')} {...register('month')}>
                <option key={0} value={''}>Tháng</option>
                {month.length && month.filter(d => d > 0).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select name="" id="" className={cs('select-form')} {...register('year')}>
                <option value={''}>Năm</option>
                {years.length && years.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
              {errors.year && <span>Vui lòng chọn năm sinh</span>}
    
            </div>
              <Button type='submit' value='Lưu thay đổi'>Lưu thay đổi</Button>
          </form>
        </motion.div>
      </div>
  )
}

export default AuthAccount
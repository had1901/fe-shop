import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Input.module.scss'
import { Form, Input } from 'antd'

function InputItem({ id, label, value, name, type, maxLength, showCount= true, handlePricePreview}) {
    const cs = useStyles(styles)
    
  return (
    <div className={cs('input-container')}>
        <label htmlFor={id} className={cs('input-label')}>
            {label}
            <span className={cs('require-text')}>*</span>
        </label>
        <Form.Item name={name} className={cs('input-wrap')}>
            <Input 
                name={name}
                value={value}
                id={id} 
                type={type} 
                className={cs('input-item')} 
                showCount={showCount}
                maxLength={maxLength} 
                autoComplete='true'
                onChange={handlePricePreview}
            />
        </Form.Item>
        {/* <input id={id} type={type} className={cs('input-item')} /> */}
    </div>
  )
}

export default InputItem
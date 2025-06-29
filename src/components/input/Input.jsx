import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Input.module.scss'
import { Form, Input } from 'antd'

function InputItem({ id, label, name, type, maxLength  }) {
    const cs = useStyles(styles)
    
  return (
    <div className={cs('input-box')}>
        <label htmlFor={id} className={cs('input-label')}>
            {label}
            <span className={cs('require-text')}>*</span>
        </label>
        <Form.Item name={name} className={cs('input-wrap')}>
            <Input 
                id={id} 
                type={type} 
                className={cs('input-item')} 
                showCount 
                maxLength={maxLength} 
                autoComplete='true'
            />
        </Form.Item>
        {/* <input id={id} type={type} className={cs('input-item')} /> */}
    </div>
  )
}

export default InputItem
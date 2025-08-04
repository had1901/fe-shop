import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Input.module.scss'
import { Form, Input } from 'antd'

function InputItem({ id, label, value, name, type, maxLength, disabled, showCount= true, handlePricePreview}) {
    const cs = useStyles(styles)
    
  return (
    <div className={cs('input-container')}>
        <Form.Item name={name} label={label} labelAlign='left' className={cs('input-wrap')} rules={[{ required: name !== 'id' && true, message: 'Vui lòng nhập trường này' }]}>
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
                disabled={disabled}
            />
        </Form.Item>
    </div>
  )
}

export default InputItem
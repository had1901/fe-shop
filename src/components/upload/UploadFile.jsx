import React, { useState } from 'react'
import styles from './UploadFile.module.scss'
import useStyles from '../../hooks/useStyles'

import { AiOutlineClose } from "react-icons/ai"

import { InboxOutlined } from '@ant-design/icons'
import { Form, message, Upload } from 'antd'
import { CgLayoutGrid } from 'react-icons/cg';
const { Dragger } = Upload





function UploadFile({ label, listImg, setListImg, noAvatar, multiple = false }) {
    const cs = useStyles(styles)
    const [isUpload, setIsUpload] = useState(false)
    console.log('list-img', listImg)
    console.log('isUpload', isUpload)

    const handleDropImg = () => setListImg([])

    const handleRemove = (file) => {
        const filterListImg = listImg.filter(img => img.uid !== file.uid)
        if(filterListImg) {
            setListImg(filterListImg)
        }
    }

    const props = {
        name: 'file',
        multiple: multiple,
        action: 'https://httpbin.org/post',
        maxCount: 5,
        // listImg,
        showUploadList: true,
        // beforeUpload: () => false,
        onChange(info) {
          const { status } = info.file
          console.log('status', status)

            if (status === 'uploading') {
                setIsUpload(true)
            }
            if (status === 'done') {
                setIsUpload(false)
                setListImg(prev => [...prev, info.file])
                message.success(`${info.file.name} tải lên thành công!.`)
            }
            if (status === 'error') {
                message.error(`${info.file.name} tải lên thất bại.`)

            } 
        
        },
        onDrop(e) {
          console.log('Đã thả file', e.dataTransfer.files)
        },
        onPreview(file) {
          console.log('preview-file', file)
        },
        onRemove(file) {
            console.log('Đã xóa file', file)
            handleRemove(file)
        }
      }
      console.log('props', props)
  return (
    <div className={cs('upload')}>
        <label htmlFor="upload">{label}</label>
            <Form.Item 
                name='avatar'
                // valuePropName="listImg"
                // getValueFromEvent={(e) => {
                //     // console.log('Upload', e)
                //     return e?.listImg
                // }}   
                rules={[{ required: true, message: 'Vui lòng tải ảnh lên!' }]} 
            >
            {
                
                listImg.length > 0 && noAvatar  ? 
                (<div className={cs('preview-img')}>
                    <div className={cs('preview-img-box')}>
                        <img src={listImg[0].response.files.file} alt="" />
                        <span className={cs('preview-drop')} onClick={() => handleRemove(listImg[0])}><AiOutlineClose /></span>
                    </div>
                </div>)
            : 
                (<Dragger {...props} id='upload'>
                    <p className="upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="upload-text">Click chọn hoặc kéo tệp tin vào đây</p>
                    <p className="upload-hint">
                        Có hỗ trợ tải lên một hoặc nhiều tệp tin cùng lúc
                    </p>
                </Dragger>)
            }
            </Form.Item>
    </div>
  )
}

export default UploadFile
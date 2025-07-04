import React, { useState } from 'react'
import styles from './UploadFile.module.scss'
import useStyles from '../../hooks/useStyles'

import { AiOutlineClose } from "react-icons/ai"

import { InboxOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Image, message, Spin, Upload } from 'antd'
import { CgLayoutGrid } from 'react-icons/cg';
const { Dragger } = Upload



function UploadFile({ label, name, fileList, isEmptyImage, thumbnail, noAvatar, multiple = false }) {
    const cs = useStyles(styles)
    let ComponentUploadCustom = name === 'avatar' ? Dragger : Upload
    const [prevImg, setPrevImg] = useState('')

 
   
    const props = {
        name: name,
        multiple,
        // action: 'https://httpbin.org/post',
        // action: 'http://localhost:8888/api/upload-images',
        maxCount: noAvatar ? 1 : 5,
        listType: 'picture-card',
        beforeUpload: (file) => {  
            // console.log('file', file)
            const limitFile = file.size / 1024 / 1024 < 5
            if (!limitFile) {
              message.error('Ảnh phải nhỏ hơn 5MB')
            }
            return false
        },
        itemRender: (originNode, file, fileList, actions) => {
            const imgUrl = file.thumbUrl || file.url || file?.response?.files?.file

            if(!imgUrl) return
            return (
                <div className={cs(`${noAvatar ? 'preview-img' : 'preview-img-list'}`)}>
                    <div className={cs('preview-img-box')}>
                        {/* { */}
                              {/* <div className={cs('loading')}><Spin indicator={<LoadingOutlined spin />} /></div> */}
                             <Image src={imgUrl || prevImg} alt='avatar' height={'100%'} />
                        {/* } */}
                        <span className={cs(`${noAvatar ? 'preview-drop' : 'preview-drop-list'}`)} onClick={() => actions.remove(file)}><AiOutlineClose /></span>
                    </div>
                </div>
            )
        }
      }

  return (
    <div className={cs('upload')}>
        <label htmlFor="upload">{label}</label>
            <div className={cs('upload-box')}>
                <Form.Item 
                    name={name} 
                    colon={false}  
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        return Array.isArray(e) ? e : e?.fileList
                    }}
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                >
                    <ComponentUploadCustom {...props} style={{ border: `${isEmptyImage ? '1px dashed red' : ''}'`}} >
                        <div>
                            <p className="upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="upload-text">Tải ảnh lên</p>
                        </div>
                        {name === 'avatar' &&
                            <div>
                                <p className="upload-hint">
                                    Tải lên tối đa một tệp tin 
                                </p>
                            </div>
                        }
                    </ComponentUploadCustom>
                </Form.Item>
                <div>
                    {/* {fileList.map(file => (
                        <span>{file.name}</span>
                    ))} */}
                </div>
            </div>
    </div>
  )
}

export default UploadFile
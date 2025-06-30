import React, { useState } from 'react'
import styles from './UploadFile.module.scss'
import useStyles from '../../hooks/useStyles'

import { AiOutlineClose } from "react-icons/ai"

import { InboxOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Image, message, Spin, Upload } from 'antd'
import { CgLayoutGrid } from 'react-icons/cg';
const { Dragger } = Upload





function UploadFile({ label, name, fileList, setFileList,  noAvatar, multiple = false }) {
    const cs = useStyles(styles)
    // const [imgPreview, setImgPreview] = useState('')
    // const [isUpload, setIsUpload] = useState(true)
    let ComponentUploadCustom = name === 'avatar' ? Dragger : Upload
    console.log('fileList', fileList)

    // const handleRemove = (file) => {
    //     const filterListImg = listImg.filter(img => img.uid !== file.uid)
    //     if(filterListImg) {
    //         setListImg(filterListImg)
    //     }
    // }
    
    // const handlePreview = (file) => {
    //     if(!file.thumbUrl || !file.response.files.file) {
    //         return 
    //     }
    //     setImgPreview(file.thumbnail || file.response.files.file)
    // }

    // const previewFile = 
    //   }

    const props = {
        name: 'file',
        multiple: multiple,
        action: 'https://httpbin.org/post',
        maxCount: 5,
        fileList: fileList,
        showUploadList: true,
        listType: 'picture-card',
        // beforeUpload: () => false,
        // previewFile: async (file) => {
        //     return new Promise((resolve, reject) => {
        //         const reader = new FileReader()
        //         reader.readAsDataURL(file)
        //         reader.onload = () => resolve(reader.result)
        //         reader.onerror = error => reject(error)
        //     })
        // },
        onChange(info) {
          const { status } = info.file
            if (status === 'uploading') {
                // setIsUpload(true)
            }
            if (status === 'done') {
                // setListImg(prev => [...prev, info.file])
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
        // onRemove(file) {
        //     handleRemove(file)
        // },
        itemRender: (originNode, file, fileList, actions) => {
            if(noAvatar) {
                return (
                    
                    <div className={cs('preview-img')}>
                        <div className={cs('preview-img-box')}>
                            {file.status !== 'done' 
                                ?  <div className={cs('loading')}><Spin indicator={<LoadingOutlined spin />} /></div>
                                : <Image src={file.thumbUrl || file?.response?.files?.file || fileList[0].url} alt='avatar' height={'100%'} />
                            }
                            {/* <img src={file.thumbUrl || file?.response?.files?.file} alt="" /> */}
                            {/* <span className={cs('preview-view')} onClick={() => handlePreview(file)}>Xem trước</span> */}
                            <span className={cs('preview-drop')} onClick={() => actions.remove(file)}><AiOutlineClose /></span>
                        </div>
                    </div>
                )
            } 
            else {
                return (
                    
                    <div className={cs('preview-img-list')} >
                        <div className={cs('preview-img-box')}>
                            {file.status !== 'done' 
                                ?  <div className={cs('loading')}><Spin indicator={<LoadingOutlined spin />} /></div>
                                : <Image src={file.thumbUrl || file?.response?.files?.file || fileList[0].url} alt='avatar' height={'100%'} />
                            }
                            {/* <img src={file.thumbUrl || file?.response?.files?.file} alt="" /> */}
                            {/* <span className={cs('preview-view')} onClick={() => handlePreview(file)}>Xem trước</span> */}
                            <span className={cs('preview-drop-list')} onClick={() => actions.remove(file)}><AiOutlineClose /></span>
                        </div>
                    </div>
                )
            }
            
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
                    // rules={[{ required: true, message: 'Vui lòng tải ảnh lên!' }]} 
                >
                        <ComponentUploadCustom 
                            {...props} 
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                        >
                            <div>
                                <p className="upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="upload-text">Tải ảnh lên</p>
                            </div>
                            {name === 'avatar' &&
                                <div>
                                    <p className="upload-hint">
                                        Có hỗ trợ tải lên một hoặc nhiều tệp tin cùng lúc
                                    </p>
                                </div>
                            }

                        </ComponentUploadCustom>
                </Form.Item>
            </div>
    </div>
  )
}

export default UploadFile
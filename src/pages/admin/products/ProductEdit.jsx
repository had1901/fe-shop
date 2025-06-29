import React, { useEffect, useState } from 'react'
import styles from './ProductEdit.module.scss'
import useStyles from '../../../hooks/useStyles'
import { Button, Checkbox, Form, Input, Select, Space, Switch } from 'antd'
import Editor from '../../../components/editor/Editor'
import InputItem from '../../../components/input/Input'
import UploadFile from '../../../components/upload/UploadFile'
import { useParams } from 'react-router'
import { useEditor } from '@tiptap/react'
import axiosApi from '../../../services/axios'

 
function ProductEdit() {
    const cs = useStyles(styles)
    const [img, setImg] = useState([])
    const [listImg, setListImg] = useState([])
    const [products, setProducts] = useState({})
    const { id } = useParams()

    const onFinish = values => {
        console.log('Data:', values)
        const fileList = values.avatar 

        if (fileList && fileList.length > 0) {
            const file = fileList[0].originFileObj
            const previewURL = URL.createObjectURL(file)
            console.log('Preview URL:', previewURL)
            setImg(previewURL)
        }
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    // const handleChange = value => {
    //     console.log(`selected ${value}`)
    // }

    const handleChangeSwitchFlashSale = checked => {
        console.log(`switch to ${checked}`)
      }

      const handleChangeSwitchHidden = checked => {
        console.log(`switch to ${checked}`)
      }

      useEffect(() => {
        if(id) {
            (async () => {
                const res = await axiosApi.get('/api/get-product', {id: id})
                if(res.ec === 0 && res.dt) {
                    setProducts(res.dt)
                }
            })()
        }   
      },[id])
    
  return (
    <div className={cs('edit')}>
        <Form
            className={cs('form')}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '100%' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className={cs('form-left')}>
                <h1 className={cs('heading')}>Thông tin sản phẩm</h1>
                <InputItem id='name' label='Tên sản phẩm' name='name' type='text' maxLength={140} />
                <InputItem id='description' label='Slug' name='slug' type='text' maxLength={140} />
                <div className={cs('input-box')}>
                    <InputItem id='description-short' label='Mô tả ngắn' name='description-short' type='text' maxLength={100}/>
                    <div>
                        <div className={cs('label-editor')}><label >Danh mục</label></div>
                        <Space wrap>
                            <Select
                                // defaultValue=""
                                // className={cs('select-category')}
                                style={{ minWidth: 160}}
                                className='select-category'
                                allowClear
                                placeholder="Chọn danh mục"
                                options={[
                                    { value: 'pc', label: 'PC' },
                                    { value: 'screen', label: 'Màn hình' },
                                    { value: 'laptop', label: 'Laptop' },
                                    { value: 'keyboard', label: 'Bàn phím' },
                                    { value: 'mouse', label: 'Chuột' },
                                    { value: 'headphone', label: 'Tai nghe' },
                                    { value: 'chair', label: 'Ghế' },
                                    { value: 'accessory', label: 'Linh kiện' },
                                    { value: 'network', label: 'Thiết bị mạng' },
                                ]}
                            />
                        </Space>
                    </div>
                    <div>
                        <div className={cs('label-editor')}><label >Thương hiệu</label></div>
                        <Space wrap>
                            <Select
                                // defaultValue=""
                                allowClear
                                style={{ minWidth: 160}}
                                placeholder="Chọn thương hiệu"
                                options={[
                                    { value: 'pc', label: 'PC' },
                                    { value: 'screen', label: 'Màn hình' },
                                    { value: 'laptop', label: 'Laptop' },
                                    { value: 'keyboard', label: 'Bàn phím' },
                                    { value: 'mouse', label: 'Chuột' },
                                    { value: 'headphone', label: 'Tai nghe' },
                                    { value: 'chair', label: 'Ghế' },
                                    { value: 'accessory', label: 'Linh kiện' },
                                    { value: 'network', label: 'Thiết bị mạng' },
                                ]}
                            />
                        </Space>
                    </div>
                </div>
                <div className={cs('label-editor')}><label >Mô tả chỉ tiết</label></div>
                <Editor />
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </div>
            <div className={cs('form-right')}>
                <div className={cs('form-box')}>
                    <div className={cs('price')}>
                        <InputItem id='price' label='Giá gốc' name='price' type='number' maxLength={16}/>
                        <InputItem id='price_sale' label='Giá khuyến mãi' name='price_sale' type='number' maxLength={16} />
                    </div>
                    <UploadFile label='Ảnh đại diện' listImg={img} setListImg={setImg} noAvatar />
                    <UploadFile label='Bộ sưu tập ảnh' listImg={listImg} setListImg={setListImg} multiple={true} />

                    <ul className={cs('list-img')}>
                        {listImg.length > 0 && listImg.map((list, i) => (
                            <li key={i} className={cs('list-img-item')}>
                                <img src={list.response.files.file} alt='avatar'/>
                                {/* <span className={cs('remove')} onClick={() => handleRemove(list)}><AiOutlineClose /></span> */}
                            </li>
                        ))}
                    </ul>
                    <InputItem id='stock' label='Tồn kho' name='stock' type='number' maxLength={10} />
                    <div className={cs('flex-switch')}>
                        <div className={cs('flex-item')}>
                            <div className={cs('label-editor')}><label >Đang khuyến mãi</label></div>
                            <Switch defaultChecked onChange={handleChangeSwitchFlashSale} />
                        </div>
                        <div className={cs('flex-item')}>
                            <div className={cs('label-editor')}><label >Ẩn sản phẩm</label></div>
                            <Switch defaultChecked onChange={handleChangeSwitchHidden} />
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </div>
  )
}

export default ProductEdit
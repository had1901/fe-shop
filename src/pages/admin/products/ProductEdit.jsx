import React, { useEffect, useState } from 'react'
import styles from './ProductEdit.module.scss'
import useStyles from '../../../hooks/useStyles'
import { Button, Checkbox, Form, Input, Select, Space, Switch } from 'antd'
import Editor from '../../../components/editor/Editor'
import InputItem from '../../../components/input/Input'
import UploadFile from '../../../components/upload/UploadFile'
import { useParams } from 'react-router'
import axiosApi from '../../../services/axios'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { IoMdArrowDropdown } from "react-icons/io";
 
function ProductEdit() {
    const cs = useStyles(styles)
    // const [img, setImg] = useState([])
    // const [listImg, setListImg] = useState([])
    const [products, setProducts] = useState({})
    const [pricePreview, setPricePreview] = useState(0)
    const [salePricePreview, setSalePricePreview] = useState(0)
    const [content, setContent] = useState('')
    const { id } = useParams()
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: 'products?.thumbnail', // hoặc base64 nếu local
        },
    ])
    const [valuesForm, setValuesForm] = useState({})


    const onFinish = values => {
        // const fileList = values.avatar 
        
        // if (fileList && fileList.length > 0) {
        //     const file = fileList[0].originFileObj
        //     const previewURL = URL.createObjectURL(file)
        //     setImg(previewURL)
        //     setDataForm({...values, file: previewURL, fileList: listImg})
        // } 
        console.log('values', values)
        if(values) {
            setValuesForm(values)
        }
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const handleChangeSwitchFlashSale = checked => {
        console.log(`switch to ${checked}`)
    }

    const handleChangeSwitchHidden = checked => {
        console.log(`switch to ${checked}`)
    }

    const handlePricePreview = (e) => {
        if(e.target.name === 'price') {
            setPricePreview(e.target.value)
        }
    }
    const handleSalePricePreview = (e) => {
        if(e.target.name === 'sale_price') {
            setSalePricePreview(e.target.value)
            console.log('sale', e.target.value)
        }
    }

    useEffect(() => {
    if(id) {
        (async () => {
            const res = await axiosApi.post('/api/get-product', {id: id})
            if(res.ec === 0 && res.dt) {
                setProducts(res.dt)
                const pro = res.dt
                setPricePreview(pro.price)
                setSalePricePreview(pro.sale_price)
                setFileList([
                    {
                      uid: '-1',
                      name: 'thumbnail.jpg',
                      status: 'done',
                      url: pro.thumbnail,
                    },
                  ])
            }
        })()
    }   
    },[id, form])

    useEffect(() => {
        if(products) {
            form.setFieldsValue({
                name: products?.name,
                description: products?.description,
                Category: products?.Category?.name,
                Brand: products?.Brand?.name,
                price: products?.price,
                sale_price: products?.sale_price,
                stock: products?.stock_quantity,
                avatar: [
                    {
                      uid: '-1',
                      name: 'thumbnail.jpg',
                      status: 'done',
                      url: products.thumbnail,
                    },
                ],
                collection: []
            })
        }
    }, [form, products])

    useEffect(() => {
        if(content) {
            form.setFieldsValue({
                content: content,
            })
        }
    }, [form, content])
    
    
  return (
    <div className={cs('edit')}>
        <Form
            form={form}
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
                {/* <input type="file" name='file'  accept="image/*" onChange={(e) => console.log(e.target.files)} /> */}
                <h1 className={cs('heading')}>Thông tin sản phẩm</h1>
                <InputItem id='name' label='Tên sản phẩm' name='name' type='text' maxLength={140} />
                <InputItem id='slug' label='Slug' name='description' type='text' maxLength={140} />
                <div className={cs('input-box')}>
                    <InputItem id='description-short' label='Mô tả ngắn' name='description-short' type='text' maxLength={100}/>
                    <div>
                        <Form.Item name="Category" label="Danh mục">
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
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="Brand" label="Thương hiệu">
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
                        </Form.Item>
                    </div>
                </div>
                <div className={cs('label-editor')}><label >Mô tả chỉ tiết</label></div>
                <Editor content={content} setContent={setContent} />
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </div>
            <div className={cs('form-right')}>
                <div className={cs('form-box')}>
                    <div className={cs('price')}>
                        <div>
                            <InputItem id='price' label='Giá gốc' name='price' type='number' showCount={false} maxLength={16} handlePricePreview={handlePricePreview} />
                            <div className={cs('label-price')}>
                                <div className={cs('icon-price-arrow')}><IoMdArrowDropdown /></div>
                                <Input type='text' showCount={false} readOnly value={convertPrice(Number(pricePreview))} />
                            </div>
                                
                        </div>
                        <div>
                            <InputItem id='sale_price' label='Giá khuyến mãi' name='sale_price' showCount={false} type='number' maxLength={16} handlePricePreview={handleSalePricePreview} />
                            <div className={cs('label-price')}>
                                <div className={cs('icon-price-arrow')}><IoMdArrowDropdown /></div>
                                <Input type='text' showCount={false} readOnly value={convertPrice(Number(salePricePreview))} />
                            </div>
                        </div>
                    </div>
                    <UploadFile label='Ảnh đại diện' name='avatar' noAvatar fileList={fileList} setFileList={setFileList}/>
                    <UploadFile label='Bộ sưu tập ảnh' name='collection' fileList={fileList} setFileList={setFileList} multiple={true} />

                    {/* <ul className={cs('list-img')}> */}
                        {/* {listImg.length > 0 && listImg.map((list, i) => (
                            <li key={i} className={cs('list-img-item')}>
                                <img src={list.response.files.file} alt='avatar'/>
                                
                            </li>
                        ))} */}
                    {/* </ul> */}
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
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './ProductEdit.module.scss'
import useStyles from '../../../hooks/useStyles'
import { Button, Checkbox, Form, Input, message, Select, Space, Spin, Switch } from 'antd'
import Editor from '../../../components/editor/Editor'
import InputItem from '../../../components/input/Input'
import UploadFile from '../../../components/upload/UploadFile'
import { useNavigate, useParams } from 'react-router'
import axiosApi from '../../../services/axios'
import { convertPrice } from '../../../utils/convertString/_convertPrice'
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from 'react-toastify'
import axios from 'axios'
import { urlToFile } from '../../../utils/convertString/_convertURLtoFile'
import { v4 as uuidv4 } from 'uuid'

// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

const optionsCategory =[
    { value: 1, label: 'Màn hình' },
    { value: 2, label: 'Bàn phím' },
    { value: 3, label: 'Chuột' },
    { value: 4, label: 'Tai nghe' },
    { value: 6, label: 'Laptop' },
    { value: 7, label: 'PC' },
    { value: 9, label: 'Ghế' },
    { value: 10, label: 'Thiết bị mạng' },
    { value: 11, label: 'Linh kiện' },
]

const optionsBrand = [
    { value: 1, label: 'ASUS' },
    { value: 2, label: 'MSI' },
    { value: 3, label: 'LENOVO' },
    { value: 4, label: 'DELL' },
    { value: 5, label: 'LG' },
    { value: 6, label: 'ACER' },
    { value: 7, label: 'VIEWSONIC' },
    { value: 8, label: 'GIGABYTE' },
    { value: 9, label: 'AOC' },
    { value: 10, label: 'HKC' },
    { value: 11, label: 'RAZER' },
    { value: 12, label: 'LOGITECH' },
    { value: 15, label: 'CORSAIR' },
    { value: 16, label: 'INTEL' },
    { value: 17, label: 'AMD' },
]
function ProductEdit({ title, mode = 'edit' }) {
    const cs = useStyles(styles)
    const navigate = useNavigate()
    const { id } = useParams()
    const [form] = Form.useForm()
    const [products, setProducts] = useState({})
    const [pricePreview, setPricePreview] = useState(0)
    const [salePricePreview, setSalePricePreview] = useState(0)
    const [content, setContent] = useState('')
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

  

    const handleUploadCloud = async (file, folder) => {
        try{
            const formData = new FormData()
            console.log('file', file)
            formData.append('file', file)
            formData.append('upload_preset', 'gearvn')
            formData.append('folder', folder)
            const res = await axios.post('https://api.cloudinary.com/v1_1/mp3-img/image/upload', formData)
            console.log(res)
            if (res.data){
                return res.data.secure_url
            }
        } catch(e){
            console.log(e)
        }
    }

    const handleSubmitAndUploadClient = async (values) => {
        const formData = new FormData()
        const collectionUrls = []
        console.log('values', values)
        setIsLoadingUpdate(true)

        // upload avatar
        let avatarUrl = values.avatar[0]?.originFileObj 
            ? await handleUploadCloud(values.avatar[0].originFileObj, 'gearvn/product-images/avatar')
            : values.avatar[0].url || ''

        // upload collection
        for(const file of values.collection) {
            if(file.originFileObj) {
                const url = await handleUploadCloud(file.originFileObj, 'gearvn/product-images/collection')
                collectionUrls.push(url)
            } else if(file.url) {
                collectionUrls.push(file.url)
            }
        }
    
        console.log('avatar', avatarUrl )
        console.log('collection', collectionUrls )

        formData.append('id', values.id)
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('price', values.price)
        formData.append('sale_price', values.sale_price)
        formData.append('flash_sale', values.flash_sale || 0)
        formData.append('content', values.content)
        formData.append('stock', values.stock)
        formData.append('Brand', values.Brand)
        formData.append('Category', values.Category)
        formData.append('avatar', avatarUrl)

        collectionUrls.map(item => (
            formData.append('collection', item)
        ))

        try{
            const url_API = mode === 'edit' ? '/api/client/update-product' : '/api/client/create-new-product'
            const resProduct = await axiosApi.post(url_API, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if(resProduct.ec === 0) {
                setIsLoadingUpdate(false)
                messageApi.open({ type: 'success', content: resProduct.ms })
                if(mode === 'edit') {
                    navigate('/auth/admin/products')
                } else {
                    form.resetFields()
                    setPricePreview('')
                    setSalePricePreview('')
                }
            } else {
                setIsLoadingUpdate(false)
                messageApi.open({ type: 'error', content: resProduct.ms })
            }
        } catch(e){
            messageApi.open({ type: 'error', content: e.ms || 'Có lỗi xảy ra'})
            console.error('Lỗi khi tạo/cập nhật sản phẩm:', e)
        } finally {
            setIsLoadingUpdate(false)
        }
    }


    // const handleSubmitAndUploadServer = async (values) => {
    //     const formData = new FormData()

    //     formData.append('id', values.id)
    //     formData.append('name', values.name)
    //     formData.append('description', values.description)
    //     formData.append('price', values.price)
    //     formData.append('sale_price', values.sale_price)
    //     formData.append('flash_sale', values.flash_sale)
    //     formData.append('content', values.content)
    //     formData.append('stock', values.stock)
    //     formData.append('Brand', values.Brand)
    //     formData.append('Category', values.Category)

    //     const createFile = async (fileUrl, i) => {
    //         let files = await urlToFile(fileUrl, `collection${i}.jpg`, 'image/*')
    //         return files
    //     } 
    
    //     if (values.avatar && values.avatar.length > 0) {
    //         let file
    //         const item = values.avatar[0]
    //         if (item.originFileObj) {
    //             file = item.originFileObj
    //         } else if (item.url) {
    //             file = await urlToFile(item.url, 'thumbnail.jpg', 'image/*')
    //         }
    //         if (file) {
    //             formData.append('avatar', file)
    //         }
    //     }

    
    //     const filesFromUrl = await Promise.all(
    //         values.collection.map(async (file, i) => {
    //             if (file.originFileObj) {
    //                 return file.originFileObj
    //             }
    //             if (file.url) {
    //                 return await createFile(file.url, i)
    //             }
    //             return null
    //         })
    //         )

    //     filesFromUrl.forEach((file) => {
    //         if (file) {
    //             formData.append('collection', file)
    //         }
    //     })

    //     try{
    //         setIsLoadingUpdate(true)
    //         const url_API = mode === 'edit' ? '/api/update-product' : '/api/create-new-product'
    //         const resProduct = await axiosApi.post(url_API, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //         console.log('resProduct', resProduct)

    //         if(resProduct.ec === 0) {
    //             setIsLoadingUpdate(false)
    //             toast(resProduct.ms)
    //             if(mode === 'edit') {
    //                 navigate('/auth/admin/products')
    //             } else {
    //                 form.resetFields()
    //                 setPricePreview('')
    //                 setSalePricePreview('')
    //             }
    //         } else {
    //             setIsLoadingUpdate(false)
    //             toast(resProduct.ms)
    //         }
    //     } catch(e){
    //         setIsLoadingUpdate(false)
    //         toast(e?.ms || 'Có lỗi xảy ra')
    //         console.error('Lỗi khi tạo/cập nhật sản phẩm:', e)
    //     }
    // }

    const onFinishFailed = errorInfo => {
        console.log('Lỗi form:', errorInfo)
    }

    const handlePricePreview = (e) => {
        if(e.target.name === 'price') {
            setPricePreview(e.target.value)
        }
    }
    const handleSalePricePreview = (e) => {
        if(e.target.name === 'sale_price') {
            setSalePricePreview(e.target.value)
        }
    }

    useEffect(() => {
        if(mode === 'edit') {
            setIsLoadingUpdate(true)
            if(id) {
                (async () => {
                    try{
                        const res = await axiosApi.post('/api/get-product', {id: id})
                        if(res.ec === 0 && res.dt) {
                            const pro = res.dt
                            setProducts(pro)
                            setPricePreview(pro.price)
                            setSalePricePreview(pro.sale_price)
                            setIsLoadingUpdate(false)
                        }
                    } catch(e) {
                        console.log(e)
                    }
                })()
            } 
        } 
    },[id, form, mode])

    useEffect(() => {
        function appendVersionParam(url) {
            if(url) {
                const cleanUrl = url.split('?')[0] // loại bỏ mọi query string
                return `${cleanUrl}?v=${crypto.randomUUID()}`
            }
        }
        if(mode === 'edit' && products) {
            form.setFieldsValue({
                id: products.id || '',
                name: products.name || '',
                description: products.description || '',
                Category: products.Category?.id || 'Chọn danh mục',
                Brand: products.Brand?.id || 'Chọn thương hiệu',
                price: products.price || '',
                sale_price: products.sale_price || '',
                stock: products.stock_quantity || '',
                content: products.content || '',
                avatar: [
                    {
                      uid: uuidv4(),
                      name: `thumbnail${uuidv4()}.jpg`,
                      status: 'done',
                      url: appendVersionParam(products?.thumbnail),
                    },
                ],
                collection: Array.isArray(products.Product_images) 
                    ?   products.Product_images.map(img => {
                            const uuid = uuidv4()
                            return    {
                                    uid: img.id,
                                    name: `collection${uuid}.jpg`,
                                    status: 'done',
                                    url: appendVersionParam(img?.url)
                                }
                            }) 
                    : []
            })
        }

    }, [form, products, mode])

    useEffect(() => {
        if(content) {
            form.setFieldsValue({
                content: content || '',
            })
        }
    }, [form, content])

    
  return (
    <div className={cs('edit')}>
        {contextHolder}
        <div className={cs(`overlay-loading ${isLoadingUpdate ? 'show' : ''}`)}><Spin size='large'/></div>
        <Form
            form={form}
            className={cs('form')}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: '100%', flash_sale: true }}
            initialValues={{ remember: true }}
            onFinish={handleSubmitAndUploadClient}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            
        >
            <div className={cs('form-left')}>
                <h1 className={cs('heading')}>{title}</h1>

                {mode !== 'edit' ? null : <InputItem id='id' label='Mã sản phẩm' name='id' type='text' disabled />}
                <InputItem id='name' label='Tên sản phẩm' name='name' type='text' maxLength={140} />
                <InputItem id='slug' label='Slug' name='description' type='text' maxLength={140} />
                <InputItem id='description_short' label='Mô tả ngắn' name='description_short' type='text' maxLength={100}/>
                <div className={cs('input-box')}>
                    <div>
                        <Form.Item name="Category" label="Danh mục" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
                            <Select
                                // defaultValue=""
                                // className={cs('select-category')}
                                style={{ minWidth: 160}}
                                className='select-category'
                                allowClear
                                placeholder="Chọn danh mục"
                                options={optionsCategory}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="Brand" label="Thương hiệu" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}>
                            <Select
                                // defaultValue=""
                                allowClear
                                style={{ minWidth: 160}}
                                placeholder="Chọn thương hiệu"
                                options={optionsBrand}
                            />
                        </Form.Item>
                    </div>
                    {/* <Form.Item name="flash_sale" label='Đang khuyến mãi' valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item name="isHidden" label='Ẩn sản phẩm' valuePropName="checked">
                        <Switch />
                    </Form.Item> */}
                </div>
                <div className={cs('label-editor')}><label >Mô tả chỉ tiết</label></div>
                <Editor content={products.content} setContent={setContent} />
                <Form.Item label={null}>
                    <Button loading={isLoadingUpdate} type="primary" htmlType="submit" disabled={isLoadingUpdate} >
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
                    <UploadFile 
                        label='Ảnh đại diện' 
                        name='avatar' 
                        noAvatar 
                        multiple={false}
                    />
                    <UploadFile 
                        label='Bộ sưu tập ảnh' 
                        name='collection'  
                        multiple={true}
                    />
                    <InputItem id='stock' label='Tồn kho' name='stock' type='number' maxLength={10} />
                   
                    <div className={cs('flex-switch')}>
                        <div className={cs('flex-item')}>
                            <Form.Item name="flash_sale" label='Đang khuyến mãi' valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </div>
                        <div className={cs('flex-item')}>
                            <Form.Item name="isHidden" label='Ẩn sản phẩm' valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </div>
  )
}

export default ProductEdit
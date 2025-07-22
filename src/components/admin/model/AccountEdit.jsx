import { Button, Form, Input, Modal, Select, Space, Tag } from 'antd'
import React, { Children, useEffect, useState } from 'react'
import axiosApi from '../../../services/axios'
import { toast } from 'react-toastify'
import { renderRules } from '../../../utils/validation/_validation'


// const permissionOptions = [
//     { value: '1', label: 'Tạo mới', color: 'green' },
//     { value: '2', label: 'Cập nhật', color: 'yellow' },
//     { value: '3', label: 'Xem', color: 'blue' },
//     { value: '4', label: 'Xóa', color: 'red' },
// ]

function AccountEdit({ isModalOpen, setIsModalOpen, handleGetUsers, user, mode = 'edit'}) {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const handleSubmit = async (value) => {
        let data = value
        if(value.roleId === 'Admin') {
            data = {...data, roleId: '1'}
        }
        if(value.roleId === 'Customer') {
            data = {...data, roleId: '2'}
        }
        const action = mode === 'edit' ? 'update' : 'create'
        const method = mode === 'edit' ? 'PUT' : 'POST'
        setLoading(true)
        try{
            const createAccount = await axiosApi({
                url: `/auth/admin/${action}-account`,
                method: method,
                data: data
            })
            if(createAccount.ec === 0) {
                setIsModalOpen(false)
                setLoading(false)
                toast(createAccount.ms)
                await handleGetUsers()
            } 
        }catch(e){
            console.log(e)
            if(e.ec !== 0) {
                toast(e.ms)
            }
            setLoading(false)
        }
        
    }

    const handleSubmitError = (e) => {
        console.log('Error submit', e)
    }


    const handleCancel = (e) => {
        console.log(e)
        setIsModalOpen(false)
    }

    // const tagRender = props => {
    //     const { label, value, closable, onClose } = props

    //     const onPreventMouseDown = event => {
    //         event.preventDefault()
    //         event.stopPropagation()
    //     }

    //     const option = permissionOptions.find(item => item.value === value)
    //     const color = option?.color || 'default'

    //     return (
    //         <Tag
    //             color={color}
    //             onMouseDown={onPreventMouseDown}
    //             closable={closable}
    //             onClose={onClose}
    //             style={{ marginInlineEnd: 4 }}
    //         >
    //             {label}
    //         </Tag>
    //     )
    // }

    const renderDataInit = (data) => {
        if(mode === 'edit' && Object.entries(data).length > 0) {
            return {
                id: data?.id,
                username: data?.username,
                email: data?.email,
                roleId: data.Role.id, 
            }
        }
    }

    useEffect(() => {
        if (mode === 'edit' && user) {
            form.setFieldsValue({
                id: user?.id,
                username: user?.username,
                email: user?.email,
                roleId: user?.Role?.id === 1 ? 'Admin' : 'Customer',
            })
        }
    }, [user, mode, form])

  return (
    <div>
        <Modal
            title={mode === 'edit' ? 'Chỉnh sửa thông tin' : 'Tạo mới tài khoản'}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            footer={false}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="basic"
                onFinish={handleSubmit}
                onFinishFailed={handleSubmitError}
                autoComplete="on"
                layout='vertical'
                initialValues={renderDataInit(user)}
            >
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Form.Item label='ID' name='id'>
                        <Input placeholder="ID" disabled hidden />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={renderRules(3, 40, 'text')}
                    >
                        <Input placeholder="Username" name='username' />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={renderRules(3, 40, 'email')}
                    >
                        <Input placeholder="Email" name='email'/></Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="roleId"
                        rules={renderRules(1, 40, 'text')}
                    >
                        <Select
                            style={{ width: 120 }}                   
                            options={[
                                { value: '1', label: 'Admin' },
                                { value: '2', label: 'Customer' },
                            ]}
                        />
                    </Form.Item>
                    {/* <Form.Item
                        label="Quyền hạn"
                        name="permissionId"
                        rules={[{ required: true, message: 'Please input your permisstion!' }]}
                    >
                        <Select
                            mode="multiple"                  
                            style={{ width: '100%' }}
                            tagRender={tagRender}
                            options={permissionOptions}
                        />
                    </Form.Item> */}
                    <Button loading={loading} type="primary" htmlType="submit">{mode === 'edit' ? 'Cập nhật' : 'Tạo mới'}</Button>
                    <Button type="danger" danger htmlType="cancel" onClick={handleCancel}>{'Hủy'}</Button>

                </Space>
                
            </Form>
        </Modal>
    </div>
  )
}

export default AccountEdit
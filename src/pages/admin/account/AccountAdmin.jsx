import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './AccountAdmin.module.scss'
import useStyles from '../../../hooks/useStyles'
import axiosApi from '../../../services/axios'
import { Badge, Button, Flex, message, Popconfirm, Space, Statistic, Table, Tag, Tooltip } from 'antd'
import { data, Link } from 'react-router'
import FilterAdmin from '../../../components/filter/FilterAdmin'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import AccountEdit from '../../../components/admin/model/AccountEdit'
import { toast } from 'react-toastify'
import useFetch from '../../../hooks/userAxios'


function AccountAdmin() {
    const cs = useStyles(styles)
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [mode, setMode] = useState('create')
    const showModal = () => {
        setIsModalOpen(true)
        setMode('create')

    }
    console.log('data', data)
    const handleGetProductById = (id) => { 
        console.log(id)
        setIsModalOpen(true)
        setMode('edit')
    }
 
    const handleDelete = async (id) => { 
        try{
            setLoading(true)
            const res = await axiosApi.delete(`/auth/admin/delete-account/${id}`)
            if(res.ec === 0) {
                setIsModalOpen(false)
                setLoading(false)
                toast(res.ms)
            }
        }catch(e) {
            console.log(e)
            if(e.ec !== 0) {
                toast(e.ms)
                setLoading(false)
            }
        }
    }

    const changeColorText = (actionName) => {
            switch(actionName) {
                case 'read': 
                    return  (<Tag icon={<ExclamationCircleOutlined />} color="processing">
                                Xem
                            </Tag>)
                case 'create': 
                    return (<Tag icon={<CheckCircleOutlined />} color="success">
                                Tạo mới
                            </Tag>)   
                case 'update': 
                    return (<Tag icon={<SyncOutlined spin />} color="warning">
                                Chỉnh sửa
                            </Tag>)
                case 'delete': 
                    return  (<Tag icon={<CloseCircleOutlined />} color="error">
                                Xóa
                            </Tag>)
                default: 
                    return ''
            }
    }

    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
            width: '4%',
            align: 'center',
            className: cs('col-table'),
            render: (value, record) =>  <span className={cs('text-color')}>{value}</span>
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
            // width: 'auto',
            align: 'center',
            className: cs('col-table')

    
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            // width: 'auto',
            align: 'center',
            className: cs('col-table')
    
        },
        {
            title: 'Vai trò',
            dataIndex: 'role_id',
            key: 'role_id',
            // width: '10%',
            align: 'center',
            className: cs('col-table'),
            render: (value, record) => {
                
                return <span className={cs(`${record?.Role?.id === 1 ? 'price' : ''}`)}>{record?.Role?.name || 'Customer'}</span>
            }
        },
        {
            title: 'Quyền thao tác',
            dataIndex: 'Permisstion',
            key: 'Permisstion',
            align: 'center',
            // width: '8%',
            className: cs('col-table'),
            render: (value, record) => {
              return (
                <ul className={cs('list-permission')} >
                    {record.Role.Permisstions.map(per => (
                        <li>{changeColorText(per.action)}</li>
                    ))}
                </ul>

              )
            //   <ul className={cs('list-permission')}>
            //     {
            //       record.Role.Permisstions.map(per => (
            //         <li className={cs(changeColorText(per.action))}>{per.action}</li>
            //       ))
            //     }
            //   </ul>
            }},
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <Tooltip placement="top" title={'Chỉnh sửa'}>
                                <Link to={''}> 
                                    <Button color="primary" variant="outlined" onClick={() => handleGetProductById(record.id)}><EditOutlined /></Button>
                                </Link>
                            </Tooltip>
                        </div>
                        <div>
                            <Popconfirm
                                title="Xóa sản phẩm"
                                description="Bạn chắc chắn muốn xóa sản phầm này?"
                                cancelText="Hủy"
                                okText="Xóa"
                                onConfirm={() => handleDelete(record.id)}
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                {/* <Tooltip placement="top" title={'Xóa'}>
                                </Tooltip> */}
                                <Button danger><DeleteOutlined /></Button> 
                            </Popconfirm>
                            
                        </div>
                    </div>
            ),
            align: 'center',
            width: '10%',
            className: cs('col-table')
    
        },

    ]

   const handleGetUsers = useCallback(async () => {
        try{
            setLoading(true)
            const res = await axiosApi.get('/auth/admin/read-accounts')
            if(res.ec === 0 && res.dt) {
                setAccounts(res.dt)
                setLoading(false)
            }
        } catch(e){
            setLoading(false)
            console.log(e)
        }
   }, [])
     
    useEffect(() => {
       handleGetUsers()
    },[handleGetUsers])

  return (
     <div className={cs('account-admin')}>
        <div className={cs('heading-tab')}>
            <FilterAdmin 
                // handleChangeSortCategory={handleChangeSortCategory} 
                // handleSearchText={handleSearchText} 
                // handleChangeSortProduct={handleChangeSortProduct}
            />
            <div className={cs('flex-box')}>
                <Space>
                    <Link to={''} onClick={showModal}>
                        <Button color='primary' variant='filled'>
                            <PlusCircleOutlined />
                            Tạo tài khoản mới
                        </Button>
                    </Link>

                </Space>
                <Badge status="success" text={`Tổng tài khoản: ${accounts.length}`} />

            </div>
            <AccountEdit mode={mode} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleGetUsers={handleApi} />
        </div>
        <Table 
            columns={columns} 
            dataSource={accounts} 
            rowKey="id"
            loading={loading}
            rowClassName={() => `${cs('row-table')}`}
            pagination={{
                position: ['bottomCenter'],
                pageSize: 15,
            }}
            sticky={true}
        />
    </div>
  )
}

export default AccountAdmin
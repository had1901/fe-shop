import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styles from './FormModel.module.scss';
import useStyles from '../../hooks/useStyles';
import { close } from '../../store/navbar/formLoginSlice';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axiosApi from '../../services/axios';
import { setUser } from '../../store/auth/authSlice';


function FormModal({ isLogin }) {
  const [cs] = useStyles(styles)
  const dispatch = useDispatch()
  const state = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log('info', state)


    const submitFormLogin = async values => {                                                       
        try{
          const result = await toast.promise(
            axiosApi.post('auth/login', values),
            {
              pending: 'Đang đăng nhập...',
              success: 'Đăng nhập thành công',
              error: 'Lỗi đăng nhập'
            }
          )
          dispatch(setUser(result.data.dt))
          localStorage.setItem('_infoClient', JSON.stringify(result.data.dt))
          // const result = await axios.post('auth/login', values)
          navigate('/')
          console.log('result-login', result)
        } catch(e) {
          console.log(e)
        }
      }

    const submitFailedLogin = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const submitFormRegister = async values => {
      try{
        const result = await toast.promise(
          axiosApi.post('auth/register', values),
          {
            pending: 'Vui lòng chờ giây lát...',
            success: 'Tạo thành công',
            error: 'Không tạo được tài khoản'
          }
        )
        // const result = await axios.post('http://localhost:8888/auth/register', values)
        // console.log('result', result)
        // if(result.data.success){
        //   return toast(result.data.message)
        // }
        console.log(result)

      } catch(e) {
        console.log(e.result.data)
        if(!e.response.data.success) {
          return toast(e.response.data.ms)
        }
      }
    }

    const submitFailedRegister = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const closeForm = () => {
      dispatch(close())
    }

    const validateMessages = {
      required: `Vui lòng nhập ${name}!`,
      // ...
    }
    if(isLogin) {
      return (
        <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={submitFormLogin}
        onFinishFailed={submitFailedLogin}
        autoComplete="off"
        labelAlign='left'
        className={cs('form')}
        validateMessages={validateMessages}
      >
        <h2 className={cs('label')}>Đăng nhập</h2>
        <Form.Item
          label="Username"
          name="username"
          colon={false}
          hasFeedback={true}
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue='anhduc'
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Password"
          name="password"
          colon={false}
          hasFeedback={true}
    
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        <div className={cs('switch-form')}>
          <span>Bạn chưa có tài khoản?</span>
          <Link to='/auth/register' className={cs('link-register')}>Đăng ký ngay</Link>
        </div>
    
        <div className={cs('close')} onClick={closeForm}>X</div>
      </Form>
    
      )
    } else {
      return (
        <>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={submitFormRegister}
            onFinishFailed={submitFailedRegister}
            autoComplete="off"
            labelAlign='left'
            className={cs('form')}
            validateMessages={validateMessages}
          >
          <h2 className={cs('label')}>Đăng ký</h2>
          <Form.Item
            label="Username"
            name="username"
            colon={false}
            hasFeedback={true}
            rules={[{ required: true, message: 'Please input your username!' }]}
            initialValue='anhduc'
          >
            <Input />
          </Form.Item>
      
          <Form.Item
            label="Password"
            name="password"
            colon={false}
            hasFeedback={true}
      
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
  
          <Form.Item
            label="Email"
            name="email"
            colon={false}
            hasFeedback={true}
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Phone"
            name="phone"
            colon={false}
            hasFeedback={true}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
          <div className={cs('switch-form')}>
            <span>Bạn đã có tài khoản?</span>
            <Link to='/auth' className={cs('link-register')}>Đăng nhập ngay</Link>
          </div>
      
          <div className={cs('close')} onClick={closeForm}>X</div>
        </Form>
       
        </>
      )
    }
}

export default FormModal
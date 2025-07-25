import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styles from './FormModel.module.scss';
import useStyles from '../../hooks/useStyles';
import { close } from '../../store/navbar/formLoginSlice';
import { Link, useNavigate } from 'react-router';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axiosApi from '../../services/axios';
import { setUser } from '../../store/auth/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import { CgLayoutGrid } from 'react-icons/cg';

function FormModal({ isLogin }) {
  const cs = useStyles(styles)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const submitFormLogin = async values => {                                                        
    try {
      const response = await toast.promise(
        axiosApi.post('auth/login', values),
        {
          pending: 'Đang đăng nhập...',
          success: 'Đăng nhập thành công',
          error: 'Lỗi đăng nhập'
        }
      )
      // const response = await axiosApi.post('auth/login', values)
      const user = response?.dt

      if (!user) throw new Error('Không nhận được dữ liệu người dùng')

      dispatch(setUser(user))
      localStorage.setItem('_infoClient', JSON.stringify(user))
      messageApi.open({
        type: 'success',
        content: 'Đăng nhập thành công',
      })
      // Navigate sau khi đã có user rõ ràng
      if (user?.Role?.name === 'admin') {
        navigate('/auth/admin', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } catch (e) {
      console.log('Lỗi đăng nhập:', e)
    }
    
    

  } 

    const submitFailedLogin = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    const submitFormRegister = async values => {
      console.log('dang ky')
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

    const handleLoginGoogle = async (credentialResponse) => {
      const { credential } = credentialResponse
      const res = await axiosApi.post('auth/google-login', {token: credential})
      dispatch(setUser({
        username: res.dt.name,
        ...res.dt
      }))
        console.log('có google')

      // navigate('/')
      console.log('res-decode', res)
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
        {contextHolder}
        <h2 className={cs('label')}>Đăng nhập</h2>
        <Form.Item
          label="Username"
          name="username"
          colon={false}
          hasFeedback={true}
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue='anhduc'
          style={{ marginBottom: '14px'}}
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
    
        <div className={cs('btn-submit')}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </div>
        
        <div className={cs('switch-form')}>
          <span>Bạn chưa có tài khoản?</span>
          <Link to='/auth/register' className={cs('link-register')}>Đăng ký ngay</Link>
        </div>
    
        <div className={cs('close')} onClick={closeForm}>X</div>
        <div className={cs('google-box')}>
          <GoogleLogin 
            onSuccess={handleLoginGoogle} 
            onError={() => console.log('Fail login gg')}
            auto_select='false'
            ux_mode="popup"
            prompt="select_account"
          >
          </GoogleLogin>
        </div>
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
  
          <div className={cs('btn-submit')}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </div>
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
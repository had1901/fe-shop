import { Form, Input, Switch } from 'antd'
import React from 'react'

function Setting() {
  return (
    
    <div>
        <Form layout='vertical' >
            <div>
                <h2>Cài đặt chung</h2>
                <Form.Item label='Tên cửa hàng' name='shop_name' >
                    <Input />
                </Form.Item>
                <Form.Item label='Logo' name='logo_url'>
                    <Input type='file'/>
                </Form.Item>
                <Form.Item label='Favicon' name='favicon_url'>
                    <Input type='file'/>
                </Form.Item>
                <Form.Item label='Email liên hệ' name='email'>
                    <Input type='email'/>
                </Form.Item>
            </div>
            <div>
                <h2>Cài đặt giao diện</h2>
                <Form.Item label='Chương trình Flash Sale' name='flash_sale_ui'>
                    <Switch />
                </Form.Item>
                <Form.Item label='Banner trang chủ' name='banner_ui'>
                    <Switch />
                </Form.Item>
                <Form.Item label='Danh sách sản phẩm đã xem' name='viewed_product_ui'>
                    <Switch />
                </Form.Item>
                <Form.Item label='Màu chủ đề' name='theme_color_ui'>
                    <Input type='color'/>
                </Form.Item>
                <Form.Item label='Slideshow trang chủ' name='theme_color_ui'>
                    <Input type='color'/>
                </Form.Item>
            </div>
        </Form>
    </div>
  )
}

export default Setting
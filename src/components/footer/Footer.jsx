import React from 'react'
import styles from './Footer.module.scss';
import ship1 from '~/assets/shipping/ship_1.webp'
import ship2 from '~/assets/shipping/ship_2.webp'
import ship3 from '~/assets/shipping/ship_3.webp'
import ship4 from '~/assets/shipping/ship_4.webp'

import pay1 from '~/assets/pay_method/pay_1.webp'
import pay2 from '~/assets/pay_method/pay_2.webp'
import pay3 from '~/assets/pay_method/pay_3.webp'
import pay4 from '~/assets/pay_method/pay_4.webp'
import pay5 from '~/assets/pay_method/pay_5.webp'
import pay6 from '~/assets/pay_method/pay_6.webp'
import pay7 from '~/assets/pay_method/pay_7.webp'
import pay8 from '~/assets/pay_method/pay_8.webp'

import fb from '~/assets/social/fb.webp'
import tiktok from '~/assets/social/tiktok.webp'
import yt from '~/assets/social/yt.webp'
import zalo from '~/assets/social/zalo.webp'
import gr_fb from '~/assets/social/gr_fb.webp'
import useStyles from './../../hooks/useStyles';

const footer = [
  {
    title: 'Về gearvn',
    list: [
      'Giới thiệu',
      'Tuyển dụng',
      'Liên hệ',
    ]
  },
  {
    title: 'Chính sách',
    list: [
      'Chính sách bảo hành',
      'Chính sách giao hàng',
      'Chính sách bảo mật',
    ]
  },
  {
    title: 'Thông tin',
    list: [
      'Hệ thống cửa hàng',
      'Hướng dẫn mua hàng',
      'Hướng dẫn thanh toán',
      'Hướng dẫn trả góp',
      'Tra cứu địa chỉ bảo hành',
    ]
  },
  {
    title: 'Tổng đài hỗ trợ (8:00 - 21:00)',
    list: [
      {
        name: 'Mua hàng:',
        content: '1900.5301'
      },
      {
        name: 'Bảo hành:',
        content: '1900.5325'
      },
      {
        name: 'Khiếu nại:',
        content: '1800.6173'
      },
      {
        name: 'Email:',
        content: 'cskh@gearvn.com'
      },
    ]
  },
]

const ship = [
  ship1,
  ship2,
  ship3,
  ship4,
]
const payMethod = [
  pay1,
  pay2,
  pay3,
  pay4,
  pay5,
  pay6,
  pay7,
  pay8,
]
function Footer() {
  const [cs] = useStyles(styles)

  return (
    <footer className={cs('footer')}>
      <div className={cs('fo', 'container')}>
        <div className={cs('foo', 'row')}>
          {footer.slice(0,3).map((item, index) => (
            <div key={index} className='col-sm-12 col-md-6 col-lg-3 col-xl-2'>
              <div className={cs('heading')}>
                <h3>{item.title}</h3>
              </div>
              <div className={cs('wrap_list')}>
                <ul className={cs('list')}>
                  {item.list.map((about, index) => (
                    <li key={index} className={cs('item')}>
                      <a href='' className={cs('link')}>{about}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {footer.slice(3).map((item, index) => (
            <div key={index}>
              <div  className='col-sm-12 col-md-6 col-lg-3 col-xl-3'>
                <div className={cs('heading')}>
                  <h3>{item.title}</h3>
                </div>
                <div className={cs('wrap_list')}>
                  <ul className={cs('list')}>
                    {item.list.map((about, i) => (
                      <li key={i} className={cs('item')}>
                          <div>
                            {about.name ?
                                <div className={cs('content')}>
                                  <p>{about.name}</p>
                                  <a 
                                    href={about.content.includes('@') ? `mailto:${about.content}` : `tel:${about.content}`} 
                                    className={cs('link_content')}
                                  >
                                    {about?.content}
                                  </a>
                                </div>
                                :
                                <a href='' className={cs('link')}>
                                  <img src={about}/>
                                </a>
                            }
                          </div>
                      </li>
                    ))}
                    
                  </ul>
                  
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-3 col-xl-3'>
                        <div>
                          <h3>Đơn vị vận chuyển</h3>
                          <div className={cs('ship_list')}>
                            {ship.map((shipItem, i) => (
                              <div key={i} className={cs('pay_item')}>
                                <img src={shipItem}/>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div >
                          <h3>Cách thức thanh toán</h3>
                          <div className={cs('ship_list')}>
                            {payMethod.map((pay, i) => (
                              <div key={i} className={cs('pay_item')}>
                                <img src={pay}/>
                              </div>
                            ))}
                          </div>
                        </div>
              </div>
            </div>
          ))}
        </div>
        <div className={cs('contact')}>
          <div className={cs('contact_social')}>
            <span>Kết nối với chúng tôi</span>
            <ul className={cs('social_list')}>
              <li><a className={cs('social_link')} href={fb}/></li>
              <li><a className={cs('social_link')} href={tiktok}/></li>
              <li><a className={cs('social_link')} href={yt}/></li>
              <li><a className={cs('social_link')} href={zalo}/></li>
              <li><a className={cs('social_link')} href={gr_fb}/></li>
            </ul>
          </div>
          <div className={cs('congthuong')}>
            <img src='https://theme.hstatic.net/200000722513/1001090675/14/logo-bct.png?v=8407'/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './DetailProduct.module.scss'
import useStyles from '../../hooks/useStyles'
import { useDispatch, useSelector } from 'react-redux'
import { FaCartPlus, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa6'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import Breadcrumb from './../../components/breadcrumb/Breadcrumb';
import Sale from '../../components/sale/Sale'
import { placeList } from './../../components/address/_listPlace';
import Address from './../../components/address/Address';
import { debounce } from './../../utils/debounce/_debounce';
import { IoChevronUpOutline } from 'react-icons/io5'
import { addToCart, setCarts, setLoading } from '../../store/cart/cartSlice'
import axiosApi from './../../services/axios';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'
import { Button, Modal } from 'antd';
import { setProduct } from '../../store/product/productSlice'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const sliders = [
  'http://localhost:5173/src/assets/flash_sale/img/f1.webp',
  'http://localhost:5173/src/assets/flash_sale/img/f4.webp',
  'http://localhost:5173/src/assets/flash_sale/img/f3.webp',
  'http://localhost:5173/src/assets/flash_sale/img/f2.webp',
  'http://localhost:5173/src/assets/flash_sale/img/f5.webp',
  'http://localhost:5173/src/assets/flash_sale/img/f6.webp',
  'http://localhost:5173/src/assets/flash_sale/img/f7.webp',
  
]
const blogs = [
  {
    id: 1,
    title: 'Sửa lỗi không đánh được số trên bàn phím laptop Dell, HP, ASUS, Macbook nhanh chóng',
  },
  {
    id: 2,
    title: 'Hướng dẫn cách sửa lỗi không vào được Roblox dành cho PC và điện thoại',
  },
  {
    id: 3,
    title: 'Sửa lỗi không đánh được số trên bàn phím laptop Dell, HP, ASUS, Macbook nhanh chóngChi tiết cách ẩn bạn bè trên Facebook trên máy tính, điện thoại nhanh chóng',
  },
  {
    id: 4,
    title: 'Link nhận Spin Coin Master free, code Spin Master mới nhất 2025',
  },
  {
    id: 5,
    title: 'Cách tạo Zalo không cần số điện thoại trên PC, điện thoại nhanh chóng',
  },
  
]

const arr2 = [
  'Đế Tản nhiệt Cooler Master Notepal C3',
  'b',
  'c'
]

function DetailProductPage() {
  const imgRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [width, setWidth] = useState(0)
  const [open, setOpen] = useState(false)
  const cs = useStyles(styles)
  const boxRef = useRef()
  const btnRef = useRef()
  const newsRef = useRef()
  const dispatch = useDispatch()
  const product = useSelector(state => state.product.info)
  const user = useSelector(state => state.auth.info)
  const carts = useSelector(state => state.cart.carts)
  const navigate = useNavigate()
  const [cartTemp, setCartTemp] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addCart, setAddCart] = useState(false)
  const { id } = useParams()

  const handlePrev = debounce(() => {
    if(currentIndex > 0) {
        setIsAnimating(true)
        setCurrentIndex(prev => prev - 1)
    }
  }, 200)

  const handleNext = debounce(() => {
    if(currentIndex < sliders.length - 1) { 
        setIsAnimating(true)
        setCurrentIndex(prev => prev + 1)
    }
  }, 200)

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleBuy = async (product) => {
    // dispatch(addToCart({...product, quantity: 1}))
    setAddCart(true)
    if(!user) {
      showModal()
      return
    }
    dispatch(setLoading(true))
    const res = await axiosApi.post('/add-cart', ({product, user}))
    if(res.ec === 0) {
      toast('Đã thêm vào giỏ hàng')
      setTimeout(() => {
        dispatch(setLoading(false))
        // setAddCart(false)
      }, 1000)
      setTimeout(() => {
        // navigate('/cart')
        setAddCart(false)
      }, 2500)
    }
    
    const fetchCarts = async () => {
      const res = await axiosApi.post('get-all-cart', {id: user.id})
      if(res.dt) {
          dispatch(setCarts(res.dt))
        }
      }
    fetchCarts()
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    navigate('/auth')
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setWidth(imgRef.current.getBoundingClientRect().width)
  },[currentIndex])

  useLayoutEffect(() => {
    if(open) {
      boxRef.current.style.maxHeight = '100%'
      btnRef.current.textContent = 'Thu gọn bài viết'
    } else {
      boxRef.current.style.maxHeight = newsRef.current.getBoundingClientRect().height + 'px'
      btnRef.current.textContent = 'Đọc tiếp bài viết'
    }
  },[open])

  useEffect(() => {
    const getProduct = async () => {
      const res = await axiosApi.post('/api/get-product', { id: id })
      console.log(res)
      if(res.ec === 0) {
        dispatch(setProduct(res.dt))
      }
    }
    getProduct()
  },[dispatch, id])


  return (
    <div className={cs('product-inner', 'container')}>
      <Modal
        title="Thông báo"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText='Hủy'
      >
        <p>Vui lòng đăng nhập để đặt hàng!</p>
      </Modal>
      <Breadcrumb product={product} />
      <div className={cs('product-main', 'row')}>
        <section className='col-xl-7'>
          <div className={cs('box-slide')}>
            <div className={cs('wrapper-slide')}>
              <div className={cs('carousel')}>
                <div className={cs('slide-show')} style={{ transform: `translateX(${-currentIndex * width}px)`}}>
                  {sliders.length && sliders.map((src, index) => (
                    <span key={index} className={cs('img-item')} ref={imgRef}>
                      <img src={product?.thumbnail} alt="product" className={cs('img')}/>
                    </span>
                  ))}
                </div>
                <div className={cs('arrow')}>
                    <button 
                        // ref={chevLeftRef}
                        className={cs('arrow-left chevron')}
                        onClick={handlePrev}
                        style={{ color: currentIndex === 0 ? '#ccc' : '#1f1f1f'}}
                    ><FaChevronLeft /></button>
                    <button 
                        // ref={chevRightRef}
                        className={cs('arrow-right chevron')}
                        onClick={handleNext}
                        style={{ color: currentIndex === sliders.length - 1 ? '#ccc' : '#1f1f1f'}}
                    ><FaChevronRight /></button>
                  </div>
              </div>
              
            </div>
            <ul className={cs('list-img-product')}>
                {blogs.length && blogs.map((item, index) => (
                    <li 
                      onClick={() => setCurrentIndex(index)} 
                      className={cs('img-item')} 
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: 'violet', 
                        margin: '6px',
                        borderRadius: '6px',
                        border: index === currentIndex ? '5px solid red' : 'transparent'
                      }}
                      key={index}
                    >
                      <span>{index}</span>
                    </li>
                  ))}
            </ul>
            <div className={cs('calculator')}>
              <div>
                <span>Tạm tính: </span>
                <span className={cs('calculator-number')}>0</span>đ
              </div>
              <button className={cs('add-to-cart')}>
                <FaCartPlus />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        </section>
        <section className='col-xl-5'>
            <div className={cs('content')}>

              <h1 className={cs('product-name')}>{product?.name}</h1>
              <div className={cs('review')}>
                <span className={cs('rating')}>{product?.rating_count}.0 <FaStar fill='#FF8A00' className={cs('rating-star')}/></span>
                <span className={cs('review-comment')}>Xem đánh giá</span>
              </div>

              <div className={cs('product-price')}>
                <span className={cs('price')}>{convertPrice(product?.price)}</span>
                <del>{convertPrice(product?.sale_price)}</del>
                <span className={cs('percent')}>-{product?.salce_percent}%</span>
              </div>
              
              <Sale title='Quà tặng khuyến mãi' isIconGift listSale={arr2}/>
              <div className={cs('action-buys')}>
                <button className={cs('btn-buynow')} onClick={() => handleBuy(product)}>
                  {addCart 
                  ? <DotLottieReact src='../../../public/add-to-cart.lottie' loop autoplay style={{ width: '20%', margin: '0 auto'}}/>
                  : (<>
                      <span>Mua ngay</span>
                      <span>Giao tận nơi hoặc nhận tại cửa hàng</span>
                    </>)
                  }
                </button>
              </div>
              <div className={cs('info-general')}>
                <h5 className={cs('info-title')}>Thông tin chung:</h5>
                <p ><strong>- Hỗ trợ đổi mới trong 7 ngày</strong></p>
                <p className={cs('credit-card')}>
                  Hỗ trợ trả góp MPOS (thẻ tín dụng)
                  (<span className={cs('view-more')}>Xem chi tiết</span>)
                </p>
                <p><strong>- Khuyến mãi giảm thêm 100K khi mua kèm PC/Laptop</strong></p>
              </div>
              <Sale title='Khuyến mãi' headerColor='#CFCFCF' listSale={arr2}/>
              <Address place='HCM' placeList={placeList.HCM} />
              <Address place='HN' placeList={placeList.HN} />
            </div>
        </section>
      </div>
      <div className='row'>
        <div className='col-xl-8'>
          <div ref={boxRef} className={cs('product-info')}>
              <div className={cs('box-wrap')}>
                <h3 className={cs('info-title')}>Thông tin sản phẩm</h3>
                <div>
                  <h4>Thông số kỹ thuật</h4>
                  <div className={cs('box-table')}>
                    <table className={cs('table-product-info')}>
                      <tbody>
                        <tr>
                          <td>Mainboard</td>
                          <td>Bo mạch chủ MSI MAG B760M MORTAR II WIFI DDR5</td>
                          <td>36 Tháng</td>
                        </tr>
                        <tr>
                          <td>CPU</td>
                          <td>CPU Intel Core i5 13400F / 2.7GHz Turbo 5.0GHz / 10 Nhân 16 Luồng</td>
                          <td>36 Tháng</td>
                        </tr>
                        <tr>
                          <td>RAM</td>
                          <td>Ram Corsair Vengeance RGB 32GB 5600 DDR5</td>
                          <td>36 Tháng</td>
                        </tr>
                        <tr>
                          <td>VGA</td>
                          <td>Card màn hình Gigabyte GeForce RTX 5060 Ti Windforce OC 8GB</td>
                          <td>36 Tháng</td>
                        </tr>
                        <tr>
                          <td>HDD</td>
                          <td><strong>Có thể tuỳ chọn Nâng cấp</strong></td>
                          <td>24 Tháng</td>
                        </tr>
                        <tr>
                          <td>SSD</td>
                          <td>Ổ cứng SSD Kingston NV3 1TB M.2 PCIe NVMe Gen4</td>
                          <td>36 Tháng</td>
                        </tr>
                        <tr>
                          <td>PSU</td>
                          <td>Nguồn FSP HV PRO 650W - 80 Plus Bronze</td>
                          <td>36 Tháng</td>
                        </tr>
                        <tr>
                          <td>Case</td>
                          <td>Vỏ máy tính Xigmatek QUANTUM 3GF</td>
                          <td>12 Tháng</td>
                        </tr>
                        <tr>
                          <td>Tản nhiệt</td>
                          <td>Cooler Master Hyper 212 Spectrum V3 ARGB</td>
                          <td>24 Tháng</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className={cs('text-example')}>* Hình ảnh minh hoạ có thể khác với cấu hình thực tế </p>
                  <button ref={btnRef} onClick={handleToggle} className={cs(`btn-toggle ${!open && 'fade-overlay'}`)}>
                    <i><IoChevronUpOutline /></i>
                  </button>
                </div>
              </div>
          </div>
        </div>
        <div className='col-xl-4'>
          <div ref={newsRef} className={cs(`news ${open && 'sticky-news'}`)}>
            <h3>Tin tức về công nghệ</h3>
            <ul className={cs('list-news')}>
              {blogs.map(item => (
                <li key={item.id} className={cs('list-news-item')}>
                    <a className={cs('list-news-link')}>
                      <div className={cs('content-thumbnail')}>
                        <img src="https://file.hstatic.net/200000722513/article/gearvn-link-nhan-spin-coin-master-banner_c728769f9fe84e42a60b56bdf6773831_grande.jpg" alt="" />
                      </div>
                      <p className={cs('news-title')}>{item.title}</p>
                    </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProductPage
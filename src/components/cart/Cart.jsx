import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Cart.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import CartBuyOrder from './buy/CartBuyOrder'
import CartOrderInfo from './info/CartOrderInfo'
import CartPay from './payment/CartPay'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FaAddressCard, FaCheck } from 'react-icons/fa6'
import { IoCard, IoShieldCheckmark } from 'react-icons/io5'
import { convertPrice } from '../../utils/convertString/_convertPrice'
import { setCarts, setInfoCustomer } from '../../store/cart/cartSlice'
import axiosApi from '../../services/axios'

const checkoutSteps = [
    {
        name: 'Giỏ hàng',
        icon: <BsFillCartCheckFill />,
    },
    {
        name: 'Thông tin đặt hàng',
        icon: <FaAddressCard />,
    },
    {
        name: 'Thanh toán',
        icon: <IoCard />,
    },
    {
        name: 'Hoàn tất',
        icon: <IoShieldCheckmark />,
    },
]

function Cart() {
    const [currentStep, setCurrentStep] = useState(1)
    const cs = useStyles(styles)
    const stepIconRef = useRef([])
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0
    })
    const stepRef = useRef()
    const carts = useSelector(state => state.cart.carts)
    // const info = useSelector(state => state.cart.infoCustomer)
    const user = useSelector(state => state.auth.info)
    // console.log('carts', carts)
    
    const dispatch = useDispatch()

    const handleNext = async () => {
        if(currentStep <= checkoutSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
        if(currentStep === 3) {
            const info = {
                amount: 50000,
                bankCode: "NCB", 
                orderDescription: "Thanh toan don hang",
                orderType: "billpayment",
                language: "vn"
              }
            const res = await axiosApi.post('payment/create-payment-url', info)
            if(res.redirectUrl) {
                window.location.href = res.redirectUrl
            }
            console.log('payment', res)
        }
    }

    const calculatorProcessBar = () => {
        if (checkoutSteps.length <= 1) return 0
        return ((currentStep - 1) / (checkoutSteps.length - 1)) * 100
    }

    const handleCalculatorTotalPrice = () => {
        return carts.reduce((init, currentItem) => {
            return init + currentItem.sale_price * currentItem.quantity
        },0)
    }
    const checkStep = () => {
            switch (currentStep) {
                case 1:
                    return 'Đặt hàng ngay'
                case 2:
                    return 'Đặt hàng ngay'
                case 3:
                    return 'Thanh toán'
                case 4:
                    return 'Hoàn tất'
                default:
                    return ''
            }
        }

    const renderComponentByStep = (currentStep) => {
            switch (currentStep) {
                case 1:
                    return <CartBuyOrder />
                case 2:
                    return <CartOrderInfo currentStep={currentStep} />
                case 3:
                    return <CartPay />
                case 4:
                    return <CartPay />
                default:
                    return <CartBuyOrder />
            }
        }
    useLayoutEffect(() => {
        const firstEl = stepIconRef.current[0];
        const left = firstEl.offsetLeft + firstEl.offsetWidth / 2
        setMargins({
            marginLeft: left,
            marginRight: left
        })
        stepIconRef.current = []
    },[currentStep, stepIconRef])
    

    useEffect(() => {
        const fetchCarts = async () => {
            const res = await axiosApi.post('get-all-cart', {id: user.id})
            console.log('all-cart', res.dt)
            // if(res.dt) {
            //     dispatch(setCarts(res.dt))
            // }
        }
        fetchCarts()
    },[user?.id])

  return (
    <div className={cs('form-cart')}>
        <div className={cs('cart-header')}>
            <div ref={stepRef} className={cs('cart-checkout')}>
                <ul  className={cs('steps')}>
                    {checkoutSteps.length && checkoutSteps.map((step, index) => (
                        <li  
                            key={step.name} 
                            className={cs(`step-item `)}
                        >
                            <span 
                                ref={el => stepIconRef.current[index] = el}
                                className={cs(`step-icon ${currentStep > index + 1 || currentStep === checkoutSteps.length ? 'completed-step' : currentStep === index + 1 ? 'active-step' : ''}`)}
                            >
                                {currentStep > index + 1 || currentStep === checkoutSteps.length ? <FaCheck /> : step.icon}
                            </span>
                            <span 
                                className={cs(`step-text ${currentStep > index + 1 || currentStep === checkoutSteps.length ? 'completed-text-step' : currentStep === index + 1 ? 'active-text-step' : ''}`)}
                            >
                                {step.name}
                            </span>
                        </li>
                    ))}
                </ul>
                <div 
                    className={cs('process-bar')} 
                    style={{
                        
                        left: margins.marginLeft + 'px',
                        right: margins.marginLeft + 'px',
                    }}
                >
                    <div className={cs('process')} style={{width: `${calculatorProcessBar()}%`}}></div>
                </div>
            </div>
        </div>
        {renderComponentByStep(currentStep)}
        {carts.length > 0 && 
            <div className={cs('cart-bot')}>
                <div className={cs('shipping')}>
                    <span>Phí vận chuyển:</span>
                    <span>Miễn phí</span>
                </div>
                <div className={cs('total-price')}>
                    <span className={cs('total-text')}>Tổng tiền:</span>
                    <span className={cs('total-number')}>{convertPrice(handleCalculatorTotalPrice())}</span>
                </div>
                
                <button className={cs('btn-checkout')} onClick={handleNext}>
                    {checkStep()}
                </button>
            </div>
        }
    </div>
  )
}

export default Cart
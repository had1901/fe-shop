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
import { setCarts, setInfoCustomer, setTotal } from '../../store/cart/cartSlice'
import axiosApi from '../../services/axios'
import FadeLoader from './../../../node_modules/react-spinners/esm/FadeLoader';
import CountUp from 'react-countup';
import CartStatus from './status/CartStatus'
import { useNavigate } from 'react-router'
import { useForm } from "react-hook-form";
import { Button, Steps } from 'antd'
import { generateOrderCode } from '../../utils/convertString/_gennerateOrderCode'

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
    const [currentStep, setCurrentStep] = useState(0)
    const cs = useStyles(styles)
    const stepIconRef = useRef([])
    const stepRef = useRef()
    const carts = useSelector(state => state.cart.carts)
    const user = useSelector(state => state.auth.info)
    const total = useSelector(state => state.cart.total)
    const isLoading = useSelector(state => state.cart.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0
    })
    const selected = useSelector(state => state.cart.selected)
    const customer = useSelector(state => state.cart.infoCustomer)
    const infoPayment = useSelector(state => state.order.infoPayment)

    const isValidateForm = () => {
        const isAllFieldsFilled = Object.values(customer).every(value => value)
        return isAllFieldsFilled
    }

    const stepConfigs = {
        0: {
          label: "Đặt hàng ngay",
          action: () => setCurrentStep(1),
        },
        1: {
          label: "Đặt hàng",
          action: () => {
            if(isValidateForm()) setCurrentStep(2)
          },
        },
        2: {
          label: "Thanh toán",
          action: async () => {
            const info = {
                ...customer, 
                methodPay: selected,
                total,
                carts
            }
            if(selected === "vnp") {
                await handleCreatePaymentUrl()
            }
            localStorage.setItem('infoPayment', JSON.stringify(info))
            if(selected === 'cod' || selected === 'qr-code') {
                setCurrentStep(3)
            }
          },
        },
        3: {
          label: "Hoàn tất",
          action: async () => {
            const res = await handleCreateOrder()
            if(res?.ec === 0) {
                await handleRemoveCart()
            }
            navigate("/order")
          },
        },
    }

    // API tạo URL thanh toán VNPAY
    const handleCreatePaymentUrl = async () => {
        const info = {
            amount: Number(total),
            bankCode: "NCB", 
            orderDescription: "Thanh toan don hang",
            orderType: "billpayment",
            language: "vn",
            orderCode: generateOrderCode()
        }
        const res = await axiosApi.post('payment/create-payment-url', info)
        if(res.redirectUrl) {
            window.location.href = res.redirectUrl
        }
    }

    const handleCreateOrder = async () => {
        const info = {
                ...customer,
                userId: user.id,
                total,
                carts,
                methodPay: selected,
                orderCode: generateOrderCode()
            }
        localStorage.setItem('infoPayment', JSON.stringify(info))
        const res = await axiosApi.post('/create-order', info)
        return res
    }

    const handleRemoveCart = async () => {
        const res = await axiosApi.post('/delete-all-cart', { userId: user.id })
        if(res?.ec !== 0) {
            throw new Error('Không xóa được giỏ hàng')
        }
        localStorage.removeItem('infoPayment')
        dispatch(setCarts([]))
        return
    }
    // Tính % các bước checkout
    const calculatorProcessBar = () => {
        if (checkoutSteps.length <= 1) return 0
        return ((currentStep - 1) / (checkoutSteps.length - 1)) * 100
    }

    const renderComponentByStep = (currentStep) => {
            switch (currentStep) {
                case 0:
                    return <CartBuyOrder currentStep={currentStep} isLoading={isLoading}/>
                case 1:
                    return <CartOrderInfo currentStep={currentStep} />
                case 2:
                    return <CartPay />
                case 3:
                    return <CartStatus />
                default:
                    return <CartBuyOrder />
            }
    }

    // useLayoutEffect(() => {
    //     const firstEl = stepIconRef.current[0];
    //     const left = firstEl.offsetLeft + firstEl.offsetWidth / 2
    //     setMargins({
    //         marginLeft: left,
    //         marginRight: left
    //     })
    //     stepIconRef.current = []
    // },[currentStep, stepIconRef])

    // API lấy danh sách product
    useEffect(() => {
        if(user?.id){
            const fetchCarts = async () => {
                const res = await axiosApi.post('get-all-cart', {id: user.id})
                if(res?.dt?.length > 0) {
                    dispatch(setCarts(res?.dt))
                }
              }
            fetchCarts()
        }
    },[user?.id, dispatch, isLoading])

    // Tính tổng tiền giỏ hàng
    useEffect(() => {
        const handleCalculatorTotalPrice = () => {
            return carts.reduce((init, currentItem) => {
                if(currentItem.product) {
                    dispatch(setTotal(init + currentItem?.product.sale_price * currentItem.quantity))
                    return init + currentItem?.product.sale_price * currentItem.quantity
                } else{
                    dispatch(setTotal(init + currentItem.sale_price * currentItem.quantity))
                    return init + currentItem.sale_price * currentItem.quantity
                }
            },0)
        }
        handleCalculatorTotalPrice()
    },[dispatch, carts])

    
    return (
        <div className={cs('form-cart')}>
            <div className={cs('cart-header')}>
                {/* <div ref={stepRef} className={cs('cart-checkout')}>
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
                </div> */}
                <div className={cs('cart-checkout')}>
                    <Steps
                        current={currentStep}
                        responsive={true}
                        items={[
                            {
                                title: 'Giỏ hàng',
                                // description: 'Dat hang',
                            },
                            {
                                title: 'Thông tin',
                                // description: 'Dat hang',
                                // subTitle: 'Left 00:00:08',
                            },
                            {
                                title: 'Thanh toán',
                                // description: 'Dat hang',
                            },
                            {
                                title: 'Hoàn tất',
                                // description: 'Dat hang',
                            },
                        ]}
                    />
                </div>
            </div>
            {/* {isLoading 
                ? (<div className={cs('spinner')}>
                        <div className={cs('loader-custom', 'loader')}></div> 
                    </div>) 
                : renderComponentByStep(currentStep)
            } */}
            {renderComponentByStep(currentStep)}
            {carts.length > 0 && 
                <div className={cs('cart-bot')}>
                    <div className={cs('shipping')}>
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                    </div>
                    <div className={cs('total-price')}>
                        <span className={cs('total-text')}>Tổng tiền</span>
                        <span className={cs('total-number')}>
                            <CountUp
                                end={total}
                                duration={2}
                                separator="."
                                suffix=" ₫"
                            />
                        </span>
                    </div>
                    
                    {/* <div onClick={() => stepConfigs[currentStep]?.action()}>
                        <Button className={cs('btn-checkout')}>
                            {stepConfigs[currentStep]?.label}
                        </Button>
                    </div> */}
                    <div onClick={() => {stepConfigs[currentStep]?.action()}}>
                        <Button className={cs('btn-checkout')} type='submit'>
                            {stepConfigs[currentStep]?.label}
                        </Button>
                    </div>
                </div>}
                
        </div>
    )
}

export default Cart
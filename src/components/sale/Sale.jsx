import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Sale.module.scss'
import { Link } from 'react-router'
import { IoGiftSharp } from 'react-icons/io5'

function Sale({ title, headerColor, listSale, isIconGift }) {
    const cs = useStyles(styles)
  return (
    <div className={cs('sale')} style={{borderColor: headerColor ? "#CFCFCF" : ''}}>
        <header className={cs('box-header')} style={{background: headerColor ? headerColor : ''}} >
            {
                isIconGift && <IoGiftSharp fill='#E30019' fontSize={'20px'} className={cs('gift-icon')}/>
            }
            <h2 style={{color: headerColor ? '#111111' : ''}}>{title}</h2>
        </header>
        <div>
            <div className={cs('gift-promo-list')}>
                <ul className={cs('list-highlight')}>
                    {listSale.length && listSale.map(item => (
                        <li className={cs('highlight-item')}>
                            <Link to='#' className={cs('highlight-link')}>
                                Tặng ngay 
                                <span></span>
                                <strong> 1 </strong>
                                x
                                <strong> {item} </strong>
                                trị giá
                                <strong> 230 </strong>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sale
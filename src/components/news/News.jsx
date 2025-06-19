import React from 'react'
import { newsListSale, newsListTech } from './_news';
import styles from './News.module.scss';
import useStyles from '~/hooks/useStyles';
function News() {
    const cs = useStyles(styles)

  return (
    <div className={cs('news')}>
        <div className={cs('news_heading')}>
            <h3>Chuyên trang khuyến mãi</h3>
            <h4>Xem tất cả</h4>
        </div>
        <div className={cs('news_wrap_list')}>
            <ul className={cs('news_list')}>
                {newsListSale.map((newItem, i) => (
                    <li key={i} className={cs('news_item')}>
                        <a href={newItem.href} className={cs('news_link')}>
                            <img src={newItem.src} alt='news' className={cs('news_img')}/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        <div className={cs('news_heading')}>
            <h3>Tin tức công nghệ</h3>
            <h4>Xem tất cả</h4>
        </div>
        <div className={cs('news_wrap_list')}>
            <ul className={cs('news_list')}>
                {newsListTech.map((newItem, i) => (
                    <li key={i} className={cs('news_item')}>
                        <a href={newItem.href} className={cs('news_link')}>
                            <img src={newItem.src} alt='news' className={cs('news_img')}/>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default News
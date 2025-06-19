import React from 'react'
import useStyles from '../../hooks/useStyles'
import styles from './Address.module.scss'

function Address({ place, placeList }) {
  const cs = useStyles(styles)
  return (
    <div className={cs('address')}>
        <h3 className={cs('title')}>Showroom {place}</h3>
        <ul>
            {placeList.length && placeList.map(item => (
                <li className={cs('item')}>
                    <i></i>
                    {item}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Address
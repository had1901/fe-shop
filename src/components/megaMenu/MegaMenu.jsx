import React from 'react'
import styles from './MegaMenu.module.scss';
import useStyles from '../../hooks/useStyles';

function MegaMenu({ products }) {
  const [cs] = useStyles(styles)

  return (
    <div className={cs('megaMenu', 'megaMenu-hover')}>
        <ul className={cs('megaMenuList')}>
            {products.map((product, index) => (
                <li key={index} className={cs('megaMenuItem')}>
                    <a href={product.href} className={cs('megaMenuLinkTitle')}>{product.label}</a>
                    <div className={cs('megaMenuProductList')}>
                      {product.items.map((item, index) => (
                        <a key={index} href={product.href} className={cs('submenuItem')}>{item}</a>
                      ))}
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MegaMenu
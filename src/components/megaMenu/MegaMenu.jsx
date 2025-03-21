import React from 'react'
import clsx from "clsx";
import styles from './MegaMenu.module.scss';

function MegaMenu({ products }) {
  return (
    <div className={clsx(styles.megaMenu, 'megaMenu-hover')}>
        <ul className={clsx(styles.megaMenuList)}>
            {products.map(product => (
                <li className={clsx(styles.megaMenuItem)}>
                    <a href={product.href} className={clsx(styles.megaMenuLinkTitle)}>{product.label}</a>
                    <div className={clsx(styles.megaMenuProductList)}>
                      {product.items.map(item => (
                        <a href={product.href} className={clsx(styles.submenuItem)}>{item}</a>
                      ))}
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MegaMenu
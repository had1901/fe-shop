import React from 'react'

import clsx from "clsx";
import styles from './SidebarMenu.module.scss';
import { renderMenuItems, menuItems } from './_sidebarMenu';



function SidebarMenu() {
  return (
    <div className={clsx(styles.navMenu)}>
        <ul>
            {renderMenuItems(menuItems)}
        </ul>
    </div>
  )
}

export default SidebarMenu
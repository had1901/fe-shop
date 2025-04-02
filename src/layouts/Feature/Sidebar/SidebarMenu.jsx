import React from 'react'

import clsx from "clsx";
import styles from './SidebarMenu.module.scss';
import { renderMenuItems, menuItems } from './_sidebarMenu';



function SidebarMenu() {
  return (
    <div className={clsx(styles.navbar, 'col-xl-2')}>
      <ul className={clsx(styles.navMenu)}>
          {renderMenuItems(menuItems)}
      </ul>
    </div>
  )
}

export default SidebarMenu
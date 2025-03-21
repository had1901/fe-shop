import React from 'react'
import { clsx } from 'clsx';
import styles from './Container.module.scss';


function Container({ children }) {
  return (
    <section className={clsx(styles.container)}>
        {children}
    </section>
  )
}

export default Container
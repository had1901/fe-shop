import React from 'react'
import styles from './SidebarRight.module.scss';
import clsx from "clsx";
import slider1 from "../../../assets/slide/a1.webp";
import banner1 from "../../../assets/banner/b1.webp";
import banner2 from "../../../assets/banner/b2.webp";
import banner3 from "../../../assets/banner/b3.webp";
import banner4 from "../../../assets/banner/b4.webp";
import banner5 from "../../../assets/banner/b5.webp";

function SidebarRight() {
  return (
    <div className={clsx(styles.sidebarRight)}>
        <div className={clsx(styles.sidebarSliderLeft)}>
            <div>
                <img src={slider1} className={clsx(styles.sidebarSliderImg)}/>
            </div>
            <div className={clsx(styles.sidebarBannerList)}>
                <div>
                    <a href=''>
                        <img src={banner4} className={clsx(styles.sidebarBannerImg)} />
                    </a>
                </div>
                <div>
                    <a href=''>
                        <img src={banner5} className={clsx(styles.sidebarBannerImg)} />
                    </a>
                </div>
            </div>
        </div>

        <div className={clsx(styles.sidebarBannerRight)}>
            <ul>
                <li>
                    <a href='#'>
                        <img src={banner1}/>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <img src={banner2}/>
                    </a>
                </li>
                <li>
                    <a href='#'>
                        <img src={banner3}/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SidebarRight
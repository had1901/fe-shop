import React, { useEffect, useState } from 'react'
import Footer from '~/components/footer/Footer';
import { Outlet } from 'react-router';
import Header from '../header/Header.jsx';
import styles from './MainLayout.module.scss'
import { toggle } from '~/store/navbar/navbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '~/hooks/useStyles';
import ToolbarMenu from '../../components/toolbar/ToolbarMenu';

function MainLayout() {
  const [toggleClass, setToggleClass] = useState('')
    const state = useSelector(state => state.navbar.isToggle)
    const dispatch = useDispatch()
    const cs = useStyles(styles)
  
    const handleToggleNavbar = (e) => {
      e.preventDefault()
      dispatch(toggle())
    }
  
    useEffect(() => {
      if(state){
        setToggleClass('overlay')
      } else {
        setToggleClass('')
      }
    },[state])
  return (
    <div className={cs('wrapper')}>
        <a href='#' onClick={handleToggleNavbar} className={cs(toggleClass)}/>
        <Header />
        <Outlet />
        <ToolbarMenu />
        <Footer />
    </div>
  )
}

export default MainLayout
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'

// const components = [
    
// ]
function SellerHome() {
    // const { subpage } = useParams()
    // const [menuList, setMenuList] = useState([])
    // const list = {}
    // console.log(subpage)
    // console.log(menuList)

    // const getPathnamePage = (arr) => {
    //     let menus = []
    //     if(Array.isArray(arr) && arr.length > 0) {
    //         for(const item of arr) {
    //             menus.push(item.href)

    //         }
    //     }
    //     return menus
    // }
    // const renderPage = (menuList, subPagePath) => {
    //     if(menuList.length > 0 && menuList.includes(subPagePath)) {
    //         // let 
    //         return 'ok'
    //     } 
    // }
    
    // useEffect(() => {
    //     const menu = getPathnamePage(menuItems)
    //     setMenuList(menu)
    // }, [])

    
  return (
    <>
        {/* {renderPage(menuList, subpage)} */}
       <Outlet />
    </>
  )
}

export default SellerHome
import React, { Fragment } from 'react'
import { NavLink, Link } from "react-router"


function Home() {
  return (
   <Fragment>
      <Link to="/auth">Auth</Link>
      <Link to="/detail">Detail</Link>
      <Link to="/dashboard">Dashboard</Link>
   </Fragment>
  )
}

export default Home
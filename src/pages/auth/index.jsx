import React from 'react'
import Login from './Login'
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { Outlet } from 'react-router';
import { FaRegUser } from "react-icons/fa6";
function AuthPage() {
  return (
    <>
      <h2 className='p-5'>Auth Page</h2>
      <FaRegUser />
      <Outlet /> 
    </>
  )
}

export default AuthPage
import React from 'react'
import Login from './Login'
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { Outlet } from 'react-router';

function AuthPage() {
  return (
    <>
      <h2>Auth Page</h2>
      <Outlet /> 
    </>
  )
}

export default AuthPage
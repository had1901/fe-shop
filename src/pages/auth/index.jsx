import React from 'react'
import { Outlet } from 'react-router';

function AuthPage() {
  return (
      <div style={{ padding: '60px 0', background: '#ececec'}}>
        <Outlet />
      </div> 
  )
}

export default AuthPage
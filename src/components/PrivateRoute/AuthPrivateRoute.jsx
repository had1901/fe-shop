import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

function AuthPrivateRoute() {
    const user = useSelector(state => state.auth.info)
    const location = useLocation()

    if(!user) {
        if(location.pathname !== '/auth') {
            return <Navigate to="/auth" replace />
        }
    }
    if(user && location.pathname === '/auth') {
        if (user?.Role?.name === 'admin') {
            return <Navigate to="/auth/admin" replace />
        }
        return <Navigate to="/" replace />
    } 

    return (
        <Outlet />
    )
}

export default AuthPrivateRoute
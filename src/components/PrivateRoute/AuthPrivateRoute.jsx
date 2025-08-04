import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

function AuthPrivateRoute() {
    const user = useSelector(state => state.auth.info)
    const location = useLocation()

    if(!user) {
        if(location.pathname.startsWith('/auth/account')) {
            console.log('Không có user')
            return <Navigate to="/" replace />
        }
    }
    if(user && location.pathname === '/auth') {
        console.log('Có user')
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
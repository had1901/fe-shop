import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function AuthPrivateRoute() {
    const user = useSelector(state => state.auth.info)

    if(!user) {
        return <Navigate to="/" replace />
    }
    return (
        <Outlet />
    )
}

export default AuthPrivateRoute
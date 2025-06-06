import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router';

function PrivateRoute({ allowRole }) {
    const user = useSelector(state => state.auth.info)
    const location = useLocation()
    console.log('private', user)


    if(!user) {
        console.log('Không có User');
        <Navigate to='/auth' state={{ from: location}} replace /> 
    }
    if(user && (location.pathname === '/auth' || location.pathname ==='/auth/register')) {
        return <Navigate to='/' state={{ from: location}} replace /> 

    }
    if(user && allowRole.includes(user.Role.name)) {
        console.log('Có user và role hợp lệ', user)
        return <Outlet />
    }
    return <Navigate to="/" replace />
}

export default PrivateRoute
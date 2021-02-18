import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import LoginPage from './Auth/LoginPage'
import { userContext } from './Context'

const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const isAuth = useContext(userContext)
    console.log(isAuth, !!isAuth._id);
    return (
        
            isAuth._id
                ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                : <Redirect to='/login' />

    )
}

export default ProtectedRoute

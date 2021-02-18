import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import LoginPage from './Auth/LoginPage'
import { userContext } from './Context'

const ProtectedAuthRoute = ({component: Component, ...rest}: any) => {
    const isAuth = useContext(userContext)
    console.log(isAuth, !!isAuth._id);
    // console.log(localStorage.getItem('user'));
    return (
        
            !isAuth._id
                ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                : <Redirect to='/' />

    )
}

export default ProtectedAuthRoute

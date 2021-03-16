import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userContext } from './Context'

const ProtectedAuthRoute = ({component: Component, ...rest}: any) => {
    const {isAuth, isLoading} = useContext(userContext)
    return (
        isLoading
            ?
                <div>Loading</div>
            :
            !isAuth
                ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                : <Redirect to='/' />

    )
}

export default ProtectedAuthRoute

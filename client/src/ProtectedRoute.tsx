import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import LoginPage from './Auth/LoginPage'
import { userContext } from './Context'

const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const {user, isLoading} = useContext(userContext)
    console.log(user, !!user._id);
    return (
            // isLoading
            //     ?
            //         <div></div>
            //     :
                    user
                        ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                        : <Redirect to='/login' />

    )
}

export default ProtectedRoute

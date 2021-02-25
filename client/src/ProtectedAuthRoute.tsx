import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userContext } from './Context'

const ProtectedAuthRoute = ({component: Component, ...rest}: any) => {
    const {user, isLoading} = useContext(userContext)
    console.log(user);
    // console.log(localStorage.getItem('user'));
    return (
        // isLoading
        //     ?
        //         <div></div>
        //     :
            !user
                ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                : <Redirect to='/' />

    )
}

export default ProtectedAuthRoute

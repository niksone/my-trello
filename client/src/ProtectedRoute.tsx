import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userContext } from './Context'
import AppLoader from './shared/Loaders/AppLoader'

const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const {isAuth, isLoading} = useContext(userContext)
    

    const getRoute = (isAuthRoute: boolean, isAuth: boolean) => {
        if(isAuthRoute) {
            return (
                !isAuth 
                    ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                    : <Redirect to='/board' />
                
            )
        }

        return (
            isAuth 
                ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                : <Redirect to='/login' />
        )
    }


    return (
        isLoading 
            ? <AppLoader />
            :  
        getRoute(rest.auth, isAuth)  
    )
}

export default ProtectedRoute

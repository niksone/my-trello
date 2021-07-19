import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userContext } from './Context'
import AppLoader from './shared/Loaders/AppLoader'

interface ProtectedRouteProps {
    component: React.ElementType
    auth?: boolean
    [key: string]: string | boolean | React.ElementType | undefined
}
const ProtectedRoute = ({component: Component, auth = false, ...rest}: ProtectedRouteProps) => {
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
        getRoute(auth, isAuth)  
    )
}

export default ProtectedRoute

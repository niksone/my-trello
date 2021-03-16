import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { userContext } from './Context'

const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const {isAuth, isLoading} = useContext(userContext)
    return (
            isLoading
                ?
                    <div>is Loading</div>
                :
                isAuth
                        ? <Route {...rest} render={props =><Component {...rest} {...props} />}/>
                        : <Redirect to='/login' />

    )
}

export default ProtectedRoute

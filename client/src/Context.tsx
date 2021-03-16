import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { authApi } from './api'

interface UserContextI {
    user: string,
    isAuth: boolean,
    isLoading: boolean,
    getAuth(): void
}

export const userContext = createContext<UserContextI>({} as UserContextI)

const UserContext = ({children}: PropsWithChildren<{}>) => {
    const [user, setUser] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
        
    const getAuth = async () => {
        try {
            setIsLoading(true)
            const authData = await authApi.isAuth()
            setIsAuth(authData)
            if(authData){
                const user = await authApi.getUser()
                setUser(user)
                console.log(user, 'user');
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        try {
            if(isAuth){
                const user = await authApi.getUser()
                setUser(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAuth()
    }, []) 

    return (
        <userContext.Provider value={{user, isAuth, getAuth, isLoading}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContext

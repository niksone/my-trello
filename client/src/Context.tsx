import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const userContext = createContext<any>({})

const UserContext = ({children}: PropsWithChildren<{}>) => {
    const [user, setUser] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
        
    const getAuth = async () => {
        try {
            const currentUser = await axios({
                method: 'GET',
                withCredentials: true,
                url: `/isAuth`
            })

            console.log(currentUser);

            const authData = currentUser.data
            setIsAuth(authData)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
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

import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { websiteInfo } from './websiteInfo'

export const userContext = createContext<any>({})

const UserContext = ({children}: PropsWithChildren<{}>) => {
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
    const getUser = async () => {
        try {
            const currentUser = await axios({
                method: 'GET',
                withCredentials: true,
                url: `/user`
            })

            const userData = currentUser.data
            setUser(userData)
            setIsLoading(false)
            console.log(currentUser);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, []) 

    return (
        <userContext.Provider value={{user, getUser, isLoading}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContext

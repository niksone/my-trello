import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authApi } from './api'
import { getBoards } from './redux/Board/reducer'

export const userContext = createContext<any>({})

const UserContext = ({children}: PropsWithChildren<{}>) => {
    const [user, setUser] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
        
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

    // const getUserBoards = async () => {
    //     console.log(isLoading)
    //     try {
    //         setIsLoading(true)
    //         if(isAuth){
    //             const user = await authApi.getUser()
    //             dispatch(getBoards(user))
    //         }
    //         setIsLoading(false)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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

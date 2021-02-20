import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import useToken from './useToken'

export const userContext = createContext<any>({})

const Context = ({children}: PropsWithChildren<{}>) => {
    // console.log(value);
    // console.log(JSON.parse(value));
    // console.log(initialValue)
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const value = localStorage.getItem('user')
        const initialValue = value !== null ? JSON.parse(value) : ''
        if(initialValue){
            setUser(initialValue)
            setIsLoading(false)
        }
        else{
            axios({
                method: 'GET',
                withCredentials: true,
                url: '/user'
            }).then(res => {
                console.log(res)
                    setUser(res.data)
                    localStorage.setItem('user', JSON.stringify(res.data))     
                    setIsLoading(false)
                }
            )
        }
            console.log(user);       
    }, []) 

    return (
        <userContext.Provider value={{user, setUser, isLoading}}>
            {children}
        </userContext.Provider>
    )
}

export default Context

import axios from 'axios'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import useToken from './useToken'

export const userContext = createContext<any>({})

const Context = ({children}: PropsWithChildren<{}>) => {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: '/user'
        }).then(res => setUser(res.data))
        console.log(user);            
    }, []) 

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default Context

import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginPage from '../../Auth/LoginPage'
import { userContext } from '../../Context'
import { HeaderContainer } from './HeaderElements'

const Header = () => {
    const {isAuth, getAuth} = useContext(userContext)

    const logout = async () => {
        axios({
            method: 'POST',
            url: `/logout`
        }).then(res => {
            getAuth()
            console.log(res.data);
        })
    }
    return (
        <HeaderContainer>
            
        </HeaderContainer>
    )
}

export default Header

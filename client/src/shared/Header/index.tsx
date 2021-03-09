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
            {
                isAuth 
                    ? <>
                        <button onClick={logout}>Log Out</button>
                        <Link to='/'>Boards</Link>
                        </>
                    : <>
                        <Link to='/login'>Log In </Link>
                        <Link to='/register'> register</Link>
                    </>
            }
        </HeaderContainer>
    )
}

export default Header

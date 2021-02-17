import React from 'react'
import { Link } from 'react-router-dom'
import LoginPage from '../../Auth/LoginPage'
import { HeaderContainer } from './HeaderElements'

const Header = () => {
    return (
        <HeaderContainer>
            <Link to='/login'>Log In</Link>
            <Link to='/register'>register</Link>
        </HeaderContainer>
    )
}

export default Header

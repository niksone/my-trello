import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import { Link, useHistory } from "react-router-dom";
import useToken from '../useToken';
import { userContext } from '../Context';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const context = useContext(userContext)
    console.log(context);
    const history = useHistory()

    const handleLogin = (e: any) => {
        e.preventDefault()
        axios({
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
            url: '/login'
        })
            .then(res => history.push('/'))
    }

    return (
        <AuthContainer>
            <Link to='/'>Home</Link>
            <AuthForm>
                <AuthFormTitle>Login</AuthFormTitle>
                <AuthFormInput 
                    type='email' 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                <AuthFormInput 
                    type='password' 
                    placeholder='Enter password'
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <AuthFormButton onClick={e => handleLogin(e)}>Login</AuthFormButton>
                <AuthFormLink to='/register'>
                    Don`t have account yet? Register
                </AuthFormLink>
            </AuthForm>
        </AuthContainer>
    )
}

export default LoginPage

import axios from 'axios'
import React, { useState } from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = (e: any) => {
        e.preventDefault()
        axios({
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
            url: 'http://localhost:5050/login'
        })
            .then(res => console.log(res.data))
    }

    return (
        <AuthContainer>
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

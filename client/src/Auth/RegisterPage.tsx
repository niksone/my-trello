import axios from 'axios'
import React, { useContext, useState } from 'react'
import { userContext } from '../Context'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const {getUser} = useContext(userContext)

    const handleRegister = (e: any) => {
        e.preventDefault()
        axios({
            method: 'POST',
            data: {email, password},
            withCredentials: true,
            url: '/register'
        }).then((res) => {getUser()})
    }

    return (
        <AuthContainer>
            <AuthForm>
                <AuthFormTitle>Register</AuthFormTitle>
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
                <AuthFormInput 
                    type='password' 
                    placeholder='Submit password'
                    value={confirmedPassword}
                    onChange={e => setConfirmedPassword(e.target.value)}
                />
                <AuthFormButton onClick={e => handleRegister(e)}>Register</AuthFormButton>
                <AuthFormLink to='/login'>
                    Already have the account? Login
                </AuthFormLink>
            </AuthForm>
        </AuthContainer>
    )
}

export default RegisterPage

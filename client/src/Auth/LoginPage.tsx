import React from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'

const LoginPage = () => {
    return (
        <AuthContainer>
            <AuthForm>
                <AuthFormTitle>Login</AuthFormTitle>
                <AuthFormInput type='email' placeholder='Enter email'/>
                <AuthFormInput type='password' placeholder='Enter password'/>
                <AuthFormButton>Login</AuthFormButton>
                <AuthFormLink to='/register'>
                    Don`t have account yet? Register
                </AuthFormLink>
            </AuthForm>
        </AuthContainer>
    )
}

export default LoginPage

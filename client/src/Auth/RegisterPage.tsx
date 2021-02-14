import React from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'

const RegisterPage = () => {
    return (
        <AuthContainer>
            <AuthForm>
                <AuthFormTitle>Register</AuthFormTitle>
                <AuthFormInput type='email' placeholder='Enter email'/>
                <AuthFormInput type='password' placeholder='Enter password'/>
                <AuthFormInput type='password' placeholder='Submit password'/>
                <AuthFormButton >Register</AuthFormButton>
                <AuthFormLink to='/login'>
                    Already have the account? Login
                </AuthFormLink>
            </AuthForm>
        </AuthContainer>
    )
}

export default RegisterPage

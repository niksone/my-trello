import axios from 'axios'
import { useContext, useState } from 'react'
import { userContext } from '../Context'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import {useRegisterValidation} from './useRegisterValidation'
const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [error, setError] = useState('')
    const {getAuth} = useContext(userContext)
    const {validation, checkValid} = useRegisterValidation()

    const handleValidation = async (e:any, email: string, password: string, confirmedPassword: string) => {
        e.preventDefault()
        const res = await checkValid( email, password, confirmedPassword)
        res.isValid && handleRegister()
    }

    const handleRegister = () => {
        axios({
            method: 'POST',
            data: {email, password},
            withCredentials: true,
            url: '/register'
        }).then((res) => {getAuth()})
    }

    return (
        <AuthContainer>
            <AuthForm>
                <AuthFormTitle>Register</AuthFormTitle>
                <p>{validation.errors}</p>
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
                <AuthFormButton 
                    onClick={e => 
                        handleValidation(e, email, password, confirmedPassword) 
                    }
                >
                    Register
                </AuthFormButton>
                <AuthFormLink to='/login'>
                    Already have the account? Login
                </AuthFormLink>
            </AuthForm>
        </AuthContainer>
    )
}

export default RegisterPage

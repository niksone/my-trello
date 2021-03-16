import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import { userContext } from '../Context';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {user, isLoading} = useContext(userContext)
    const {getAuth} = useContext(userContext)

    const handleLogin = async (e: any) => {
        e.preventDefault()

        axios({
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
            url: `/login`
        })
            .then(res => {
                getAuth()
            })
            .catch(err => {
                setError(err.response.data.message)
            })
    }

    return (
        <AuthContainer>
            <AuthForm>
                <AuthFormTitle>Login</AuthFormTitle>
                <p>{error}</p>
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

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import { Link, useHistory } from "react-router-dom";
import useToken from '../useToken';
import { userContext } from '../Context';
import { loginUser } from '../Context/actions';
import { useAuthDispatch } from '../Context/context';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, isLoading} = useContext(userContext)
    console.log(user, isLoading);
    const history = useHistory()
    const dispatch = useAuthDispatch()
    const {setUser} = useContext(userContext)

    const handleLogin = async (e: any) => {
        e.preventDefault()
        // const payload = {email, password}
        // try {
        //     let response = await loginUser(dispatch, payload)
        // } catch (error) {
            
        // }
        axios({
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
            url: '/login'
        }).then(res => {
            setUser(res.data)
        }
        )
            // .then(res => history.push('/'    \))
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

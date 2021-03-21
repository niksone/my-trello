import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import { userContext } from '../Context';
import { Hero, HeroImgContainer, HeroLeft, HeroLeftContainer, HeroLeftWrapper, HeroRight, HeroSubtitle, HeroTitle } from '../shared/HeroSection';
import { FormContainer, FormInputsContainer } from '../shared/FormControl';
import TextInput from '../shared/TextInput';
import MailIcon from '../shared/icons/Mail/MailIcon';
import LockIcon from '../shared/icons/LockIcon/LockIcon';
import ButtonGroup from '../shared/Buttons/ButtonGroup';
import { Link } from 'react-router-dom';
import Button from '../shared/Buttons';
import {ReactComponent as LoginImg} from '../shared/icons/accessAccount.svg'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {user, isLoading} = useContext(userContext)
    const {getAuth} = useContext(userContext)

    const handleLogin = async (e: React.SyntheticEvent) => {
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

            <Hero>
                <HeroLeft>
                    <HeroLeftContainer>
                        <HeroLeftWrapper>

                            <HeroTitle>
                                    Welcome to React Trello.
                                    <br />
                                    Sign In to see latest updates.
                            </HeroTitle>
                            <HeroSubtitle>
                                Enter your details to proceed further
                            </HeroSubtitle>

                            <FormContainer>
                            <p>{error}</p>
                                <FormInputsContainer>
                                    <TextInput
                                        label='Email' 
                                        placeholder='Enter your email' 
                                        fieldId='email-input'
                                        type='text'
                                        onChange={(e: any) => setEmail(e.target.value)}
                                        Icon={<MailIcon />}
                                    />
                                    <TextInput 
                                        label='Password' 
                                        placeholder='Enter your password' 
                                        fieldId='password-input'
                                        type='password'
                                        onChange={(e: any) => setPassword(e.target.value)}
                                        Icon={<LockIcon />}
                                    />
                                </FormInputsContainer>
                                <ButtonGroup spacing={3}>
                                    <Button onClick={(e: any) => handleLogin(e)} widthFill>Sign In</Button>
                                    <Link  to='/register'><Button widthFill>Sign Up</Button></Link>
                                </ButtonGroup>
                            </FormContainer>
                        </ HeroLeftWrapper>
                    </HeroLeftContainer>
                </HeroLeft>
                <HeroRight>
                    <HeroImgContainer>
                        <LoginImg />
                    </HeroImgContainer>
                </HeroRight>
            </Hero>
            {/* <AuthForm>
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
            </AuthForm> */}
        </AuthContainer>
    )
}

export default LoginPage

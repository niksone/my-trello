import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import { userContext } from '../Context';
import { Hero, HeroImgContainer, HeroLeft, HeroLeftContainer, HeroLeftWrapper, HeroRight, HeroSubtitle, HeroTextWrapper, HeroTitle } from '../shared/HeroSection';
import { FormContainer, FormError, FormInputsContainer } from '../shared/FormControl';
import TextInput from '../shared/TextInput';
import MailIcon from '../shared/icons/Mail/MailIcon';
import LockIcon from '../shared/icons/LockIcon/LockIcon';
import ButtonGroup from '../shared/Buttons/ButtonGroup';
import { Link } from 'react-router-dom';
import Button from '../shared/Buttons';
import {ReactComponent as LoginImg} from '../shared/icons/accessAccount.svg'
import { authApi } from '../api';
import useFullHeight from '../utils/useFullHeight';
import Div100vh from '../shared/Div100vh';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {user, isLoading} = useContext(userContext)
    const {getAuth} = useContext(userContext)

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const login = await authApi.login(email, password)
            getAuth()
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <Div100vh>
        <AuthContainer>

            <Hero>
                <HeroLeft>
                    <HeroLeftContainer>
                        <HeroLeftWrapper>
                        <HeroTextWrapper>
                            <HeroTitle >
                                    Welcome to React Trello.
                                    <br />
                                    Sign In to see latest updates.
                            </HeroTitle>
                            <HeroSubtitle>
                                Enter your details to proceed further
                            </HeroSubtitle>
                        </HeroTextWrapper>  

                            <FormContainer>
                                <FormError isError={error !== ''}>{error}</FormError>
                                <FormInputsContainer>
                                    <TextInput
                                        label='Email' 
                                        placeholder='Enter your email' 
                                        fieldId='email-input'
                                        type='text'
                                        onChange={(e: any) => setEmail(e.target.value)}
                                        Icon={MailIcon}
                                        isError={error !== ''}
                                    />
                                    <TextInput 
                                        label='Password' 
                                        placeholder='Enter your password' 
                                        fieldId='password-input'
                                        type='password'
                                        onChange={(e: any) => setPassword(e.target.value)}
                                        Icon={LockIcon}
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
        </AuthContainer>
        </Div100vh>
    )
}

export default LoginPage

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '../api'
import { userContext } from '../Context'
import Button from '../shared/Buttons'
import ButtonGroup from '../shared/Buttons/ButtonGroup'
import Div100vh from '../shared/Div100vh'
import { FormContainer, FormError, FormInputsContainer } from '../shared/FormControl'
import { Hero, HeroImgContainer, HeroLeft, HeroLeftContainer, HeroLeftWrapper, HeroRight, HeroRightTextWrapper, HeroSubtitle, HeroTextWrapper, HeroTitle } from '../shared/HeroSection'
import LockIcon from '../shared/icons/LockIcon/LockIcon'
import MailIcon from '../shared/icons/Mail/MailIcon'
import TextInput from '../shared/TextInput'
import {useRegisterValidation} from './useRegisterValidation'
import {ReactComponent as RegisterImg} from '../shared/icons/authentication.svg'
import bgPattern from '../shared/icons/bgPattern.svg'
import mobileBgPattern from '../shared/icons/bgPattern2.svg'

export interface RegisterState {
    email: {value: string, fieldName: 'email'},
    password: {value: string, fieldName: 'password'},
    confirmedPassword: {value: string, fieldName: 'confirmedPassword'},
    error: {value: string, fieldName: '' | 'email' | 'password' | 'confirmedPassword'},
}

const RegisterPage = () => {
    const {getAuth} = useContext(userContext)
    const {validation, checkValid} = useRegisterValidation()

    const [registerState, setRegisterState] = useState<RegisterState>({
        email: {value: '', fieldName: 'email'},
        password: {value: '', fieldName: 'password'},
        confirmedPassword: {value: '', fieldName: 'confirmedPassword'},
        error: {value: '', fieldName: ''},
    })


    const handleValidation = async (e: React.SyntheticEvent, registerState: RegisterState) => {
        e.preventDefault()
        const res = await checkValid(registerState)
        res.isValid && handleRegister()
    }

    const handleRegister = async () => {
        try {
            await authApi.register(registerState.email.value, registerState.password.value)
                .then(res => getAuth())
        } catch (error) {  
            // console.log(error);
        }
    }

    return (
        <Div100vh >
        <Hero>
            <HeroLeft>
                <HeroLeftContainer>
                    <HeroLeftWrapper>
                    <HeroTextWrapper>

                        <HeroTitle>
                                Welcome to React Trello.
                                <br />
                                Sign Up to getting started.
                        </HeroTitle>
                        <HeroSubtitle>
                            Enter your details to proceed further
                        </HeroSubtitle>
                    </ HeroTextWrapper>

                        <FormContainer>
                           <FormError isError={validation.error.value !== ''}>
                               {validation.error.value}
                            </FormError>
                            <FormInputsContainer>
                                <TextInput
                                    label='Email' 
                                    placeholder='Enter your email' 
                                    fieldId='email-input'
                                    type='text'
                                    onChange={(e: any) => setRegisterState(prev => (
                                        {...prev, email: {...prev.email, value: e.target.value}}
                                    ))}
                                    isError={validation.error.fieldName === registerState.email.fieldName}
                                    Icon={MailIcon}
                                />
                                <TextInput 
                                    label='Password' 
                                    placeholder='Enter your password' 
                                    fieldId='password-input'
                                    type='password'
                                    onChange={(e: any) => setRegisterState(prev => (
                                        {...prev, password: {...prev.password, value: e.target.value}}
                                    ))}
                                    isError={validation.error.fieldName === registerState.password.fieldName}
                                    Icon={LockIcon}
                                />
                                <TextInput 
                                    label='Confirm password' 
                                    placeholder='Enter your password' 
                                    fieldId='confirmedpassword-input'
                                    type='password'
                                    onChange={(e: any) => setRegisterState(prev => (
                                        {...prev, confirmedPassword: {...prev.confirmedPassword, value: e.target.value}}
                                    ))}  
                                    isError={validation.error.fieldName === registerState.confirmedPassword.fieldName}                                 
                                    Icon={LockIcon}
                                />
                            </FormInputsContainer>
                            <ButtonGroup spacing={3}>
                                <Button 
                                    onClick={e => 
                                        handleValidation(e, registerState) 
                                    }
                                    widthFill
                                >
                                    Sign Up
                                </Button>
                                <Link to='/login'><Button widthFill>Sign In</Button></Link>
                            </ButtonGroup>
                        </FormContainer>
                    </ HeroLeftWrapper>
                </HeroLeftContainer>
            </HeroLeft>
            <HeroRight bgPattern={bgPattern} mobileBgPattern={mobileBgPattern}>
                <HeroRightTextWrapper>
                    <HeroTitle>
                            Welcome to React Trello.
                    </HeroTitle>
                    <HeroSubtitle>
                        Enter your details to proceed further
                    </HeroSubtitle>
                </HeroRightTextWrapper>
                <HeroImgContainer>
                    <RegisterImg />
                </HeroImgContainer>
            </HeroRight>
        </Hero>
    </Div100vh>
    )
}

export default RegisterPage

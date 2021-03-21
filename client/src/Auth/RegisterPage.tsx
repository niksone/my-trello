import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../api'
import { userContext } from '../Context'
import Button from '../shared/Buttons'
import ButtonGroup from '../shared/Buttons/ButtonGroup'
import { FormContainer, FormInputsContainer } from '../shared/FormControl'
import { Hero, HeroImgContainer, HeroLeft, HeroLeftContainer, HeroLeftWrapper, HeroRight, HeroSubtitle, HeroTitle } from '../shared/HeroSection'
import LockIcon from '../shared/icons/LockIcon/LockIcon'
import MailIcon from '../shared/icons/Mail/MailIcon'
import TextInput from '../shared/TextInput'
import { AuthContainer } from './AuthElements'
import {useRegisterValidation} from './useRegisterValidation'

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
        <AuthContainer>

        <Hero>
            <HeroLeft>
                <HeroLeftContainer>
                    <HeroLeftWrapper>

                        <HeroTitle>
                                Welcome to React Trello.
                                <br />
                                Sign Up to getting started.
                        </HeroTitle>
                        <HeroSubtitle>
                            Enter your details to proceed further
                        </HeroSubtitle>

                        <FormContainer>
                           <p>{validation.error.value}</p>
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
            <HeroRight>
                <HeroImgContainer>
                    {/* <LoginIm /> */}
                </HeroImgContainer>
            </HeroRight>
        </Hero>
    </AuthContainer>
    )
}

export default RegisterPage

import axios from 'axios'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../Context'
import Button from '../shared/Buttons'
import ButtonGroup from '../shared/Buttons/ButtonGroup'
import { FormContainer, FormInputsContainer } from '../shared/FormControl'
import { Hero, HeroImgContainer, HeroLeft, HeroLeftContainer, HeroLeftWrapper, HeroRight, HeroSubtitle, HeroTitle } from '../shared/HeroSection'
import LockIcon from '../shared/icons/LockIcon/LockIcon'
import MailIcon from '../shared/icons/Mail/MailIcon'
import TextInput from '../shared/TextInput'
import { AuthContainer, AuthForm, AuthFormButton, AuthFormInput, AuthFormLink, AuthFormTitle } from './AuthElements'
import {useRegisterValidation} from './useRegisterValidation'
const RegisterPage = () => {
    const [email, setEmail] = useState({fieldName: 'email', value: ''})
    const [password, setPassword] = useState({fieldName: 'email', value: ''})
    const [confirmedPassword, setConfirmedPassword] = useState({fieldName: 'email', value: ''})
    const [error, setError] = useState('')
    const {getAuth} = useContext(userContext)
    const {validation, checkValid} = useRegisterValidation()

    const handleValidation = async (e: React.SyntheticEvent, email: string, password: string, confirmedPassword: string) => {
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
                           <p>{validation.errors}</p>
                            <FormInputsContainer>
                                <TextInput
                                    label='Email' 
                                    placeholder='Enter your email' 
                                    fieldId='email-input'
                                    type='text'
                                    onChange={
                                        (e: any) => setEmail(prev => ({...prev, value: e.target.value}))
                                    }
                                    Icon={<MailIcon />}
                                />
                                <TextInput 
                                    label='Password' 
                                    placeholder='Enter your password' 
                                    fieldId='password-input'
                                    type='password'
                                    onChange={(e: any) => setPassword(prev => ({...prev, value: e.target.value}))}
                                    Icon={<LockIcon />}
                                />
                                <TextInput 
                                    label='Confirm password' 
                                    placeholder='Enter your password' 
                                    fieldId='confirmedpassword-input'
                                    type='password'
                                    onChange={(e: any) => setConfirmedPassword(prev => ({...prev, value: e.target.value}))}
                                    Icon={<LockIcon />}
                                />
                            </FormInputsContainer>
                            <ButtonGroup spacing={3}>
                                <Button 
                                    onClick={e => 
                                        handleValidation(e, email, password, confirmedPassword) 
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
        // <AuthContainer>
        //     <AuthForm>
        //         <AuthFormTitle>Register</AuthFormTitle>
        //         <p>{validation.errors}</p>
        //         <AuthFormInput 
        //             type='email' 
        //             placeholder='Enter email'
        //             value={email}
        //             onChange={e => setEmail(e.target.value)}
        //         />
        //         <AuthFormInput 
        //             type='password' 
        //             placeholder='Enter password'
        //             value={password}
        //             onChange={e => setPassword(e.target.value)}
        //         />
        //         <AuthFormInput 
        //             type='password' 
        //             placeholder='Submit password'
        //             value={confirmedPassword}
        //             onChange={e => setConfirmedPassword(e.target.value)}
        //         />
        //         <AuthFormButton 
        //             onClick={e => 
        //                 handleValidation(e, email, password, confirmedPassword) 
        //             }
        //         >
        //             Register
        //         </AuthFormButton>
        //         <AuthFormLink to='/login'>
        //             Already have the account? Login
        //         </AuthFormLink>
        //     </AuthForm>
        // </AuthContainer>
    )
}

export default RegisterPage

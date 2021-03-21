import React from 'react'
import styled from 'styled-components'
import TextInput from '../TextInput'
import {ReactComponent as User} from '../icons/user.svg'
import UserIcon from '../icons/User/UserIcon'
import {ReactComponent as LoginImg} from '../icons/accessAccount.svg'
import MailIcon from '../icons/Mail/MailIcon'
import LockIcon from '../icons/LockIcon/LockIcon'
import Button from '../Buttons'
import ButtonGroup from '../Buttons/ButtonGroup'
import { FormContainer, FormInputsContainer } from '../FormControl'

interface HeroProps {
    reverse?: boolean
}

export const Hero = styled.div<HeroProps>`
    position: relative;
    display: flex;
    flex-direction: ${({reverse}) => reverse ? 'row-reverse' : 'row'};
    background-color: var(--color-primary);
    height: 100%;
    width: 100%;
`

export const HeroSectionWrapper = styled.div`
    display: flex;
    position: absolute;
`


export const HeroLeft = styled.div`
    width: 50%;
    height: 100%;
    /* background-color: #fff; */
`

export const HeroLeftContainer = styled.div`
    position: relative;
    border-radius: 0px 16px 16px 0;
    border: none;
    background-color: white;
    height: 100%;
`


export const HeroLeftWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: fit-content;
`

export const HeroTitle = styled.h1`
    font-size: var(--text-h1);
    white-space: pre-line;
`

export const HeroRight = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const HeroImgContainer = styled.div`
    height: fit-content;
    width: fit-content;
`

export const HeroSubtitle = styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
    padding-top: 11px;
`


const HeroSection = () => {
    return (
    <div style={{height: '100vh'}}>
        <Hero >
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
                            <FormInputsContainer>
                                {/* <TextInput 
                                    label='Email' 
                                    placeholder='Enter your email' 
                                    fieldId='email-input'
                                    Icon={MailIcon}
                                />
                                <TextInput 
                                    label='Password' 
                                    placeholder='Enter your password' 
                                    fieldId='password-input'
                                    Icon={LockIcon}
                                /> */}
                            </FormInputsContainer>
                            <ButtonGroup spacing={4}>
                                <Button widthFill>Sign In</Button>
                                <Button widthFill>Sign Up</Button>
                            </ButtonGroup>
                        </FormContainer>


                    </HeroLeftWrapper>
                </HeroLeftContainer>

            </HeroLeft>

            <HeroRight>
                <HeroImgContainer>
                    <LoginImg />
                </HeroImgContainer>
            </HeroRight>
        </Hero>
    </div>
    )
}

export default HeroSection

import styled from 'styled-components'
import {ReactComponent as LoginImg} from '../icons/accessAccount.svg'
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
    width: 100%;
    height: 100%;

    @media(max-width: 976px){
        flex-direction: column-reverse;
    }
`

export const HeroSectionWrapper = styled.div`
    display: flex;
    position: absolute;
`


export const HeroLeft = styled.div`
    width: 50%;
    height: 100%;

    @media(max-width: 976px){
        width: 100%;
        height: fit-content;    
    }
    /* background-color: #fff; */
`

export const HeroLeftContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 16px 16px 0;
    border: none;
    background-color: white;
    height: 100%;


    @media(max-width: 976px){
        border-radius: 16px 16px 0 0;
    }
`


export const HeroLeftWrapper = styled.div`
    /* position: absolute;
    top: 50%;
    left: 60%; */
    transform: translate(10%, 0%);
    width: fit-content;

    @media(max-width:1280px){
        transform: translate(0);
    }
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

    @media(max-width: 976px){
        width: 100%;
        height: fill-available;  
    }
`

export const HeroRightTextWrapper = styled.div`
    display: none;
    text-align: center;

    @media(max-width: 976px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;   

        & > p   {
            color: white !important;  
            font-weight: bold; 
        }
    }
`

export const HeroImgContainer = styled.div`
    height: fit-content;
    width: fit-content;

    @media(max-width: 976px){
        display: none;
    }
`

export const HeroSubtitle = styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
    padding-top: 11px;
`

export const HeroTextWrapper = styled.div`
    @media(max-width: 976px){
        display: none;
    }
`

const HeroSection = () => {

    const getHeroText = () =>  {
        <HeroTextWrapper>

        </HeroTextWrapper>
    }
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

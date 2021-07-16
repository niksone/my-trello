import styled from 'styled-components'
import {ReactComponent as LoginImg} from '../icons/accessAccount.svg'
import Button from '../Buttons'
import ButtonGroup from '../Buttons/ButtonGroup'
import { FormContainer, FormInputsContainer } from '../FormControl'
import { BREAKPOINTS } from '../constants'

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
    transform: translate(10%, 0%);
    width: fit-content;

    @media(max-width: ${BREAKPOINTS.tablet}){
        width: 90%;
        transform: translate(0);
    }
`

export const HeroTitle = styled.h1`
    font-size: var(--text-h1);
    white-space: pre-line;
`

interface HeroRightProps {
    bgPattern?: any,
    mobileBgPattern?: any
}
export const HeroRight = styled.div<HeroRightProps>`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({bgPattern}) => bgPattern ? `url(${bgPattern})`  : 'none'} 100% 100%;
    background-size: cover;

    @media(max-width: 976px){
        width: 100%;
        height: fill-available;  
        ${({mobileBgPattern}) => mobileBgPattern && `background: url(${mobileBgPattern})`};
        background-size: cover;
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

    return (
    <div style={{height: '100%'}}>
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

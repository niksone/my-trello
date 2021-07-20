import styled from 'styled-components'
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

    @media(max-width: ${BREAKPOINTS.mobileLg}px){
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

    @media(max-width: ${BREAKPOINTS.laptop}px){
        width: 70%;
    }

    @media(max-width: ${BREAKPOINTS.tabletLg}px){
        width: 80%;
    }


    @media(max-width: ${BREAKPOINTS.mobileLg}px){
        width: 100%;
        height: fit-content;    
    }
`

export const HeroLeftContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 16px 16px 0;
    border: none;
    background-color: white;
    height: 100%;


    @media(max-width: ${BREAKPOINTS.mobileLg}px){
        border-radius: 16px 16px 0 0;
        padding-top: 20px;
        padding-bottom: 20px;
    }
`


export const HeroLeftWrapper = styled.div`
    width: fit-content;

    @media(max-width: ${BREAKPOINTS.laptop}px){
        padding-bottom: 0;
        transform: translate(0);
    }
`

export const HeroTitle = styled.h1`
    font-size: var(--text-h1);
    white-space: pre-line;

    @media(max-width: ${BREAKPOINTS.tablet}px){
        font-size: var(--text-h2);
    }

`

interface HeroRightProps {
    bgPattern?: SVGElement | string,
    mobileBgPattern?: SVGElement | string
}

export const HeroRight = styled.div<HeroRightProps>`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({bgPattern}) => bgPattern ? `url(${bgPattern})`  : 'none'} 100% 100%;
    background-size: cover;

    @media(max-width: ${BREAKPOINTS.tabletLg}px){
        width: 20%;
    }

    @media(max-width: ${BREAKPOINTS.mobileLg}px){
        width: 100%;
        height: fill-available;  
        ${({mobileBgPattern}) => mobileBgPattern && `background: url(${mobileBgPattern})`};
        background-size: cover;
    }
`

export const HeroRightTextWrapper = styled.div`
    display: none;
    text-align: center;
    
    @media(max-width: ${BREAKPOINTS.mobileLg}px){
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

    @media(max-width: ${BREAKPOINTS.mobileLg}px){
        width: 90%;
    }
`

export const HeroImgContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${BREAKPOINTS.tabletLg}px){
        display: none;
    }

    @media screen and (max-width: ${BREAKPOINTS.laptop}px){
        width: 90%;
    }

    & > *{
        width: 90%;
    }
`

export const HeroSubtitle = styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
    padding-top: 11px;
`

export const HeroTextWrapper = styled.div`
    padding-bottom: 50px;

    @media(max-width: ${BREAKPOINTS.tablet}px){
        padding-bottom: 30px;
    }

    @media(max-width: ${BREAKPOINTS.mobileLg}px){
        display: none;
    }
`
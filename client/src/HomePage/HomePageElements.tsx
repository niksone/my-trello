import styled from "styled-components"
import { BREAKPOINTS } from "../shared/constants"

export const AppContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
`
export const BoardSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 250px);
    height: 100%;
    background-color: var(--color-background-light);
    padding: 0 28px 28px 28px;

    @media screen and (max-width:  ${BREAKPOINTS.laptop}px){
        width: 100%;
    }

    @media screen and (max-width:  ${BREAKPOINTS.mobileLg}px){
        width: 100%;
        background: none;
        padding: 0;
    }
`

export const NoBoardSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-size: contain; 
    background-color: var(--color-background-light);

    & > svg{
        margin-bottom: 35px;
    }

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        & > svg{
            width: 80%;
            height: 80%; 
        }
    }
`

export const NoBoardTitle =styled.h2`
    font-size: var(--text-h2);
    padding-bottom: 8px;
`

export const NoBoardSubtitle =styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
`
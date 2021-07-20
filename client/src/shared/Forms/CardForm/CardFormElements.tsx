import styled from "styled-components"
import { BREAKPOINTS } from "../../constants"

export const CardFormContainer = styled.div`
    width: 650px;
    height: 85vh;

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        width: 100vw;
        height: 100%;
        flex: 1;
        background-color: var(--color-background-light);
    }

`

export const DeleteIconWrapper = styled.span`
    display: flex;
    color: var(--color-primary-dark);
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover{
        color: var(--color-error);
    }

    & > svg {
        width: 16px;
    }
`

export const CardFormWrapper = styled.div`
    background-color: #fff;
    height: 100%;

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        background-color: var(--color-background-light);
    }
`

export const FormmobileLgTitleContainer = styled.div`
    display: none;

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        display: block;
    }

`

export const FormmobileLgBlock = styled.div`
    background-color: #fff;
    border-radius: 0;
    padding: 26px 12px 30px 12px;
    margin-bottom: 14px;
`

export const mobileLgFormContainer = styled.div`
    display: none;
    width: 100%; 
    height: 100%;

    & > *{
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        display: flex;
    }
`

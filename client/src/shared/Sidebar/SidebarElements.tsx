import { Link } from "react-router-dom"
import styled from "styled-components"
import { BREAKPOINTS } from "../constants"

interface  SidebarSidebarProps {
    show?: boolean
}

export const SidebarContainer = styled.div< SidebarSidebarProps>`
    height: 100%;
    width: 250px;


    @media screen and (max-width: ${BREAKPOINTS.laptop}px){
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        transform: translateX(${({show}) => show ? '0' : '-100%'});
        display: flex;
        z-index: 99;
        transition: 0.2s all ease-in-out;
    }
`

export const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 250px;

    height: 100%; 
    background-color: #fff;

    padding-bottom: 24px;
    z-index: 99;
`

export const SidebarClose = styled.div< SidebarSidebarProps>`
    display: none;
    z-index: 0;
    @media screen and (max-width:  ${BREAKPOINTS.laptop}px){
        position: absolute;
        top: 0;
        left: 0;
        display: ${({show}) => show ? 'block' : 'none'};
        width: 100vw;
        height: 100%;
        background-color: var(--color-primary-grey);
        animation: appear 0.5s ease-in-out;
        opacity: 0.45;

    }

    @keyframes appear {
        from{
            opacity: 0;
        }

        to{
            opacity: 0.45;
        }
    }
`



export const  SidebarLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const  SidebarLinkWrapper = styled.div< SidebarLinkContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;

    &::after{
        content: '';
        display: ${({active}) => active ? 'block' : 'none'};
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2px;
        background-color: var(--color-primary);
        border-radius: 1px;
    }
`


interface  SidebarLinkContainerProps {
    active?: boolean
}

export const  SidebarLinkContainer = styled.div< SidebarLinkContainerProps>`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0;

    & ~ &{
        margin: 8px 0 8px 0;
    }
`

export const  SidebarLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: var(--color-primary-dark);
    font-size: var(--text-regular);
`

export const  SidebarButtonWrapper = styled.div`
    width: 100%;
    & > Button{
        padding: 13px;  
        font-weight: bold;
        text-align:left;
        word-break: break-word;
    }
`

export const  SidebarLinkIconWrapper = styled.span`
    display: flex;
    align-items: center;
    padding-right: 30px;
    color: inherit;
`

export const LogoImgWrapper = styled.div`
    margin-right: 15px;
`

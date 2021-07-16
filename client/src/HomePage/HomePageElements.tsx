import { Link } from "react-router-dom"
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

    @media screen and (max-width:  ${BREAKPOINTS.mobile}px){
        width: 100%;
        background: none;
        padding: 0;
    }
`


export const BoardLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const BoardLinkWrapper = styled.div<BoardLinkContainerProps>`
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


interface BoardLinkContainerProps {
    active?: boolean
}

export const BoardLinkContainer = styled.div<BoardLinkContainerProps>`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0;

    & ~ &{
        margin: 8px 0 8px 0;
    }
`

export const BoardName = styled.h3`
    font-size: var(--text-h3);
`

export const BoardLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: var(--color-primary-dark);
    font-size: var(--text-regular);
`

export const BoardButtonWrapper = styled.div`
    width: 100%;
    & > Button{
        padding: 13px;  
        font-weight: bold;
        text-align:left;
        word-break: break-word;
    }
`

export const BoardLinkIconWrapper = styled.span`
    display: flex;
    align-items: center;
    padding-right: 30px;
    color: inherit;
`
interface LogoI {    
    logoImg: any
}

export const LogoImgWrapper = styled.div`
    margin-right: 15px;
`

interface ShowContainerProps {
    show: boolean
    mobile: boolean
}
export const ShowContainer = styled.div<ShowContainerProps>`
    display: ${({show, mobile}) => show && !mobile ? 'flex' : 'none'};
 
    @media screen and (max-width: ${BREAKPOINTS.mobile}px){
        display: ${({show, mobile}) => show && mobile? 'flex' : 'none'};
    }
`

export const BoardSectionFooterContainer = styled.div`

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

    @media screen and (max-width: ${BREAKPOINTS.mobile}px){
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
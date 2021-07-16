import styled from "styled-components";
import { BREAKPOINTS } from "../shared/constants";

interface BoardSidebarProps {
    show?: boolean
}

export const BoardSidebarContainer = styled.div<BoardSidebarProps>`
    height: 100%;
    width: 250px;


    @media screen and (max-width: ${BREAKPOINTS.mobile}px){
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

export const BoardSidebarWrapper = styled.div`
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

export const BoardSidebarClose = styled.div<BoardSidebarProps>`
    display: none;
    z-index: 0;
    @media screen and (max-width:  ${BREAKPOINTS.mobile}px){
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

export const AppContainer = styled.div`
  height: 100%;
  display: flex;
`

export const BoardSectionWrapper = styled.div`
    height: 100%; 
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    overflow: auto;
    @media screen and (max-width:  ${BREAKPOINTS.mobile}px){
        border-radius: 0;
        background-color: var(--color-background-light);
    }
`
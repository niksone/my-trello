import styled from "styled-components";

interface ModalContainerProps {
    show: boolean
}

export const ModalContainer = styled.div<ModalContainerProps>`
    position: fixed;
    top: 0;
    left: 0;
    display: ${({show}) => show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100vw;
    cursor: default;
    z-index: 9999;
`

export const ModalWrapper = styled.div`
    position: fixed;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--color-primary-grey);
    opacity: 0.45;
    cursor: pointer;
    z-index: 1;


`



export const ModalContent = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;


    @media screen and (max-width: 425px){
        height: 100%;
        width: 100%;
    }
`
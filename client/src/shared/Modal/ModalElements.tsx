import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    mix-blend-mode: normal;
    opacity: 0.35;
    z-index: 1;
`



export const ModalContent = styled.div`
position: fixed;
    z-index: 10;
    min-width: 20%;
`
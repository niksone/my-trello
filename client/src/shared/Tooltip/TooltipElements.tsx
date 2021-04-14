import styled from "styled-components";

export const TooltipContainer = styled.div`
    position: relative;
`

export const TooltipContent = styled.div`
    position: absolute;
    bottom: -7px;
    right: 0;
    transform: translateY(100%);
    width: max-content;
    background: #fff;
    padding: 9px;
    border: 1px var(--color-button-outline-resting) solid;
    border-radius: 8px;
    filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.05));
    z-index: 99;
`

export const TooltipCloseContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`
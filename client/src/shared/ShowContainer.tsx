import styled from "styled-components";

interface ShowContainerProps {
    widthFrom?: number
    widthTo?: number
}
export const ShowContainer = styled.div<ShowContainerProps>`
    display: none;

    @media screen and (min-width: ${({widthFrom}) => widthFrom}px){
        display: flex;
    }

    @media screen and (max-width: ${({widthTo}) => widthTo}px){
        display: flex;
    }
`
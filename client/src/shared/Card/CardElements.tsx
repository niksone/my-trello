import styled from 'styled-components'

interface CardContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}

export const CardContainer = styled.div<CardContainerProps>`
    position: relative;
    background: none;
    border: 1px var(--color-resting-ouline) solid;
    
    /* opacity: ${({isOver}) => isOver ? '0.3' :'1' }; */
    /* transform: rotateZ(${({isDragging}) => isDragging ? '5deg' : '0'}); */
    padding: 20px;
    border-radius: 12px;
    margin-top:10px;
    max-width: 280px;
    word-break: break-word;
    cursor: pointer;
`



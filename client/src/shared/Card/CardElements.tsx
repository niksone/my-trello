import styled from 'styled-components'

interface CardContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}

export const CardContainer = styled.div<CardContainerProps>`
    position: relative;
    background-color: white;
    /* opacity: ${({isOver}) => isOver ? '0.3' :'1' }; */
    /* transform: rotateZ(${({isDragging}) => isDragging ? '5deg' : '0'}); */
    padding: 5px 10px;
    border-radius: 5px;
    margin-top:10px;
    max-width: 280px;
    word-break: break-word;
    cursor: pointer;
`



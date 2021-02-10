import styled from 'styled-components'

interface CardContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}

export const CardContainer = styled.div<CardContainerProps>`
    background-color: white;
    opacity: ${({isOver}) => isOver ? '0.3' :'1' };
    padding: 5px 10px;
    border-radius: 5px;
    margin-top:10px;
    max-width: 280px;

    cursor: pointer;
`
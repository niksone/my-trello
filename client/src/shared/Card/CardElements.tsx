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

export const EditButton = styled.span`
    position: absolute;
    top: 5px;
    right: 5px;
    height: 20px;
    width: 20px;
    border-radius: 3px;
    display: none;
    background-color: grey;
    cursor: pointer;
    
    ${CardContainer}:hover & {
        display: block;
    }
`

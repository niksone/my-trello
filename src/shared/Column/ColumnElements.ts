import styled from 'styled-components'

interface ColumnContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}



export const ColumnContainer = styled.div<ColumnContainerProps>`
    height: 100%;
`

export const ColumnWrapper = styled.div<ColumnContainerProps>`
    width: 300px;
    background-color: ${({isOver}) => isOver ?'grey' : 'lightgrey'};
    opacity: ${({isOver}) => isOver ? '0.3' : '1'};
    transform: rotateZ(${({isDragging}) => isDragging ? '5deg' : '0'});
    height: max-content;
    margin:10px;
    /* padding-bottom: 10px; */
    border-radius: 5px;
    z-index: 0;
`

export const ColumnTitleContainer = styled.div`
    padding: 10px;
    cursor: pointer;
    z-index: 10;
`

export const ColumnTitle = styled.p`
    text-align: left;
    font-weight: bold;
`

export const ColumnCardContainer = styled.div`
    padding: 10px;
    padding-top: 0;
`

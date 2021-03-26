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
    height: 100%;
    background: none;
    opacity: ${({isOver}) => isOver ? '0.3' : '1'};
    border: 2px var(--color-resting-ouline) dashed;
    /* transform: rotateZ(${({isDragging}) => isDragging ? '5deg' : '0'}); */
    /* height: max-content; */
    padding:10px;
    margin: 28px 16px 36px 0;
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
    word-break: break-word;
`

export const ColumnCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    padding-top: 0;
`

export const ColumnCardWrapper = styled.div`
`

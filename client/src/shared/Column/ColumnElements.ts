import styled from 'styled-components'

interface ColumnContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}



export const ColumnContainer = styled.div<ColumnContainerProps>`
    height: 100%;
`

export const ColumnWrapper = styled.div<ColumnContainerProps>`
/* display: flex; */
    /* flex-direction: column; */
    display: flex;
    flex-direction: column;
    width: 400px;
    background: #fff;
    height: 100%;
    opacity: ${({isOver}) => isOver ? '0.3' : '1'};
    border: 2px var(--color-resting-outline) dashed;
    /* transform: rotateZ(${({isDragging}) => isDragging ? '5deg' : '0'}); */
    /* height: max-content; */
    padding:10px;
    /* padding-bottom: 10px; */
    border-radius: 5px;
    z-index: 1;
`

export const ColumnTitleContainer = styled.div`
    padding: 10px;
    cursor: pointer;
    z-index: 5;
`

export const ColumnTitle = styled.p`
    text-align: left;
    font-weight: bold;
    word-break: break-word;
`

export const ColumnCardContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    padding-top: 0;
    overflow: auto;
`

export const ColumnCardWrapper = styled.div`
`

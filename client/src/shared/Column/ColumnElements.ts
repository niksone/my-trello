import styled from 'styled-components'

interface ColumnContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}



export const ColumnContainer = styled.div<ColumnContainerProps>`
    height: 100%;
    width: 100%;
    /* @media screen and(max-width:425px){
        padding: 0;
    } */
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
    padding:20px;
    /* padding-bottom: 10px; */
    border-radius: 5px;
    z-index: 1;

    @media screen and (max-width: 425px){
        width: calc(100vw - 20px * 2);
        background: none;
        border: none;
        padding:20px 0;

    }
`

export const ColumnTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;

    /* padding: 10px; */
    cursor: pointer;
    z-index: 5;

    @media screen  and (max-width: 425px){
        display: none;
    }
`

export const ColumnTitle = styled.p`
    flex-grow:100;
    text-align: left;
    font-weight: bold;
    word-break: break-word;
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
`

export const ColumnCardContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* padding: 10px; */
    padding-top: 0;
    overflow: auto;
`

export const ColumnCardWrapper = styled.div`
`

import styled from 'styled-components'

interface CardContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}

export const CardContainer = styled.div<CardContainerProps>`
    position: relative;
    background: #fff;
    border: 1px var(--color-resting-outline) solid;
    
    /* opacity: ${({isOver}) => isOver ? '0.3' :'1' }; */
    /* transform: rotateZ(${({isDragging}) => isDragging ? '5deg' : '0'}); */
    padding: 20px;
    border-radius: 12px;
    margin-top:10px;
    /* max-width: 280px; */
    word-break: break-word;
    white-space: pre-line;
    cursor: pointer;
    box-shadow: ${({isDragging}) => isDragging ? '0px 12px 20px rgba(0, 0, 0, 0.05)' : 'none'};
`

export const CardContainerBlock = styled.div`
    padding-bottom: 18px;

    &:last-child{
        padding-bottom: 0;
    }
`

export const CardTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

export const CardTitleWrapper = styled.div`

`

export const CardTitle = styled.h5`
    font-size: var(--text-h5);
`

export const CardSubtitle = styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);       
`

export const CardDescription = styled.p`
    font-size: var(--text-regular);
`

export const CardProgressContainer = styled.div``

export const CardProgressInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 11px;
`

export const CardProgressIcon = styled.span`
    display: flex;
    padding-right: 5px;
`

export const CardProgressLabel = styled.span`
    color: var(--color-primary-grey);
    font-size: var(--text-regular);
    display: flex;
    align-items: baseline;
`

export const CardProgressStage = styled.span`
    font-size: var(--text-regular);
`
import styled from 'styled-components'
import { BREAKPOINTS } from '../constants'

interface ColumnContainerProps  {
    isOver?: boolean
    isDragging?: boolean
}



export const ColumnContainer = styled.div<ColumnContainerProps>`
    height: 100%;
    width: 100%;
`

export const ColumnWrapper = styled.div<ColumnContainerProps>`
    display: flex;
    flex-direction: column;
    width: 400px;
    background: #fff;
    opacity: ${({isOver}) => isOver ? '0.3' : '1'};
    border: 2px var(--color-resting-outline) dashed;
    padding:20px;
    border-radius: 5px;
    z-index: 1;

    @media screen and (max-width: ${BREAKPOINTS.mobile}px){
        width: calc(100vw - 20px * 2);
        background: none;
        border: none;
        padding:20px 0;

        & > * {
            margin-bottom: 4px;
        }
    }
`

export const ColumnTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 22px;

    cursor: pointer;
    z-index: 5;

    @media screen  and (max-width: ${BREAKPOINTS.mobile}px){
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
    padding-bottom: 0.1px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}px){
        height: auto;
    }
`

export const ColumnCardWrapper = styled.div`

    & > *:not(:first-child){
        margin-top:10px;
    }

    @media screen and (max-width: ${BREAKPOINTS.mobile}px){
        & > *:not(:first-child){
            margin-top: 4px;
        }
    }
`
export const AddCardContainer = styled.div`
    width: 100%;

    & > *{
        background-color: #fff;
    }
`
import styled from 'styled-components'
import { BREAKPOINTS } from '../constants'


export interface AddItemContainerProps {
    item?: AddItemContainerTypes
}

type stylesOptions = {
    [key: string]: string
}


export const containerType: stylesOptions ={
    'TASK': '5px 0px',
    'ADD': '`0px',
    'FORM': '5px 10px'
}
export type AddItemContainerTypes = 
    | 'CARD' 
    | 'COLUMN'
    | 'BOARD'
    | 'TASK'
    | 'FORM'


export const AddItemContainer = styled.div<AddItemContainerProps>`
    min-width: ${({item}) => item === 'CARD' ? '300px' : '100%'};
    padding: ${({item}) => item === 'CARD' ? '5px 10px' : '0'};

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){

    }
`

export const AddItemButton = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding-top: 10px;
    width: 100%;
    text-align: left;
`

interface AddItemFormContainerProps extends AddItemContainerProps{
    fd?: 'column' | 'row'
    alignItems?: 'start' | 'center' | 'end'
}

export const AddItemFormContainer = styled.div<AddItemFormContainerProps>`
    min-width: ${({item}) => item === 'FORM' ? '300px' : '100%'};
    display: flex;
    flex-direction: ${({fd}) => fd ? fd : 'column'};
    align-items: ${({alignItems}) => alignItems ? alignItems : 'start'};


    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        min-width: 80vw;
    }
`

export const AddItemFormWrapper= styled.div<AddItemContainerProps>`
    width: 100%;
    padding: ${({item}) => item ? containerType[item] : '0'};
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

`


export const AddItemFormButton = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding-top: 5px;
    text-align: left;
`


export const FormIcon = styled.span`
    display: flex;
    padding-right: 13px;
    cursor: pointer;
`




export type AddItemFormButtonContainerTypes = 'ADD' | 'DEFAULT'

interface AddItemFormButtonContainerProps {
    item: AddItemFormButtonContainerTypes
}

const btnWrapperType: stylesOptions = {
    'ADD': '5px',
    'DEFAULT': '0'
}

export const AddItemFormButtonContainer = styled.div<AddItemFormButtonContainerProps>`
    background-color: var(--color-background-light);
    border-radius: 8px;
    margin-top: ${({item}) => btnWrapperType[item]};
`
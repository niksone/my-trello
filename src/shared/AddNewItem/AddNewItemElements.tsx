import styled from 'styled-components'


export interface AddItemContainerProps {
    item: AddItemContainerTypes
}

export type AddItemContainerTypes = 
    | 'ADDITEM' 
    | 'COLUMN'


export const AddItemContainer = styled.div<AddItemContainerProps>`
    min-width: ${({item}) => item === 'ADDITEM' ? '300px' : '100%'};
    padding: ${({item}) => item === 'ADDITEM' ? '5px 10px' : '0'};
`

export const AddItemButton = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding-top: 10px;
`

export const AddItemFormContainer = styled.div`
    padding-top: 10px;
    /* width: 100%; */
`

export const AddItemFormInput= styled.input`
    width: 100%;
    padding: 5px;
    outline: none;
    border: none;
    border-radius: 3px;
`

export const AddItemFormButton = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding-top: 5px;
    text-align: left;
`
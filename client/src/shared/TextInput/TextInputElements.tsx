import styled from "styled-components"

interface TextInput {
    isError?: boolean
}

export const TextInputContainer = styled.div<TextInput>`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* align-items: center; */
    padding-top: 10px;
`

export const TextInputLabel = styled.label`
    color: var(--color-primary-grey);
    font-size: var(--text-regular);
    padding-bottom: 6px;
`

export const StyledTextInput = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    font-size: var(--text-regular);
    color: black;
    font-weight: bold;  
    width: 100%;

    &::placeholder{
        font-weight: bold;
        color: var(--color-primary-grey);
    }

    /* Remove Chrome autocomplete background */
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        transition: background-color 5000s;
        font-weight: bold;

    }
`

export const TextInputWrapper = styled.div<TextInput>`
    display: flex;
    border-bottom: 2px ${({isError}) => isError ? 'var(--color-error)' : 'var(--color-outline)'} solid;
    width: fit-content;
    padding-bottom: 17px;
    width: 100%;
    transition: 0.5s all ease-in-out;
`

export const IconWrapper = styled.span<TextInput>`
    height: fit-content;
    display: flex;
    color: ${({isError}) => isError ? 'var(--color-error)' : 'inherit'};
    /* padding-left: 5px; */
`
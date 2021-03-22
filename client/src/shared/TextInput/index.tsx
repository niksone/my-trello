import React, { ChangeEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import UserIcon from '../icons/User/UserIcon'

interface TextInput {
    isError?: boolean
}

const TextInputContainer = styled.div<TextInput>`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* align-items: center; */
    padding-top: 10px;
`

const TextInputLabel = styled.label`
    color: var(--color-primary-grey);
    font-size: var(--text-regular);
    padding-bottom: 6px;
`

const StyledTextInput = styled.input`
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

const TextInputWrapper = styled.div<TextInput>`
    display: flex;
    border-bottom: 2px ${({isError}) => isError ? 'var(--color-error)' : 'var(--color-outline)'} solid;
    width: fit-content;
    padding-bottom: 17px;
    width: 100%;
    transition: 0.5s all ease-in-out;
`

const IconWrapper = styled.span`
    height: fit-content;
    color: var(--color-error);
    /* padding-left: 5px; */
`


interface TextInputProps {
    type: 'text' | 'password',
    onChange: ChangeEventHandler<HTMLInputElement>
    label: string,
    placeholder: string,
    fieldId: string,
    isError?: boolean,
    Icon?: any
}

const TextInput = ({type, onChange, label, placeholder, fieldId, isError, Icon}: TextInputProps) => {
    console.log(isError);
    // const FinalIcon = Icon
    return (
        <TextInputContainer isError={isError}>
            <TextInputLabel htmlFor={fieldId}>{label}</TextInputLabel>
            <TextInputWrapper isError={isError}>
                <StyledTextInput 
                    type={type}
                    id={fieldId} 
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {

                    Icon && 
                    <IconWrapper>
                        <Icon fill={isError && 'var(--color-error)'}></Icon>
                    </IconWrapper>
                }
                {/* <FinalIcon fill={isError}/> */}
            </TextInputWrapper>
        </TextInputContainer>
    )
}

export default TextInput

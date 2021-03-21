import React, { ChangeEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import UserIcon from '../icons/User/UserIcon'

const TextInputContainer = styled.div`
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
    border: none;
    outline: none;
    font-size: var(--text-regular);
    color: black;
    font-weight: bold;  
    width: 100%;

    &::placeholder{
        font-weight: normal;
        color: var(--color-primary-grey);
    }
`

const TextInputWrapper = styled.div`
    display: flex;
    border-bottom: 2px var(--color-outline) solid;
    width: fit-content;
    padding-bottom: 17px;
    width: 100%;
`

const IconWrapper = styled.span`
    height: fit-content;
    color: red;
    /* padding-left: 5px; */
`


interface TextInputProps {
    type: 'text' | 'password',
    onChange: ChangeEventHandler<HTMLInputElement>
    label: string,
    placeholder: string,
    fieldId: string,
    Icon?: ReactNode
}

const TextInput = ({type, onChange, label, placeholder, fieldId, Icon}: TextInputProps) => {
    return (
        <TextInputContainer>
            <TextInputLabel htmlFor={fieldId}>{label}</TextInputLabel>
            <TextInputWrapper>
                <StyledTextInput 
                    type={type}
                    id={fieldId} 
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {

                    Icon && 
                    <IconWrapper>
                        {Icon}
                    </IconWrapper>
                }
            </TextInputWrapper>
        </TextInputContainer>
    )
}

export default TextInput

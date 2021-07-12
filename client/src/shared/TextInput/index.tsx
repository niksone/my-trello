import React, { ChangeEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import UserIcon from '../icons/User/UserIcon'
import { IconWrapper, StyledTextInput, TextInputContainer, TextInputLabel, TextInputWrapper } from './TextInputElements';




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
                    <IconWrapper isError={isError}>
                        <Icon />
                    </IconWrapper>
                }
            </TextInputWrapper>
        </TextInputContainer>
    )
}

export default TextInput

import { ChangeEventHandler } from 'react'
import { IconWrapper, StyledTextInput, TextInputContainer, TextInputLabel, TextInputWrapper } from './TextInputElements';


export type TextInputSchemes = 'error' | 'warning' | 'success'

export type OptionalTextInputSchemes = TextInputSchemes | null

interface TextInputProps {
    type: 'text' | 'password',
    onChange: ChangeEventHandler<HTMLInputElement>
    label: string,
    placeholder: string,
    fieldId: string,
    scheme?:  OptionalTextInputSchemes
    Icon?: JSX.Element
}



const TextInput = ({type, onChange, label, placeholder, fieldId, scheme, Icon}: TextInputProps) => {

    return (
        <TextInputContainer colorScheme={scheme}>
            <TextInputLabel htmlFor={fieldId}>{label}</TextInputLabel>
            <TextInputWrapper colorScheme={scheme}>
                <StyledTextInput 
                    type={type}
                    id={fieldId} 
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {

                    Icon && 
                    <IconWrapper colorScheme={scheme}>
                        {Icon}
                    </IconWrapper>
                }
            </TextInputWrapper>
        </TextInputContainer>
    )
}

export default TextInput

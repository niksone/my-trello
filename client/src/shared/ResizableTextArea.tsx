import React from 'react'
import styled from 'styled-components'



interface ResizeableTextAreaContainerProps {
    placeholderColor?: string
}
export const ResizeableTextAreaContainer = styled.span<ResizeableTextAreaContainerProps>`
    display: block;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: inherit;
    font-weight: inherit;
    cursor: text;

    &:empty::before {
    content: attr(data-placeholder);
    color: ${({placeholderColor}) => placeholderColor ? placeholderColor : 'gray'};
    
  }
`

interface ResizableTextAreaProps {
    children?: React.ReactChildren,
    placeholder?: string,
    placeholderColor?: string
    onChange?: () => void
}

const ResizableTextArea = React.forwardRef<HTMLSpanElement, ResizableTextAreaProps>(({children, placeholder,placeholderColor, onChange}, ref) => {
    return (
        <ResizeableTextAreaContainer 
            contentEditable 
            role="textbox" 
            ref={ref} 
            onChange={onChange}
            data-placeholder={placeholder || ''}
            placeholderColor={placeholderColor}
        >
            {children}
        </ResizeableTextAreaContainer>
    )
})

export default ResizableTextArea

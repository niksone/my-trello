import React from 'react'
import styled from 'styled-components'


export const ResizeableTextAreaContainer = styled.span`
    display: block;
    width: 100%;
    overflow: hidden;
    /* resize: both;
    min-height: 40px;
    line-height: 20px; */
    outline: none;
    border: none;
    background-color: transparent;
    font-size: inherit;
    font-weight: inherit;

    &:empty::before {
    content: attr(data-placeholder);
    color: gray;
    
  }
`

  
//   .textarea[contenteditable]:empty::before {
//     content: "Placeholder still possible";
//     color: gray;
//   }

interface ResizableTextAreaProps {
    children?: React.ReactChildren,
    placeholder?: string,
    onChange?: () => void
}

const ResizableTextArea = React.forwardRef<HTMLSpanElement, ResizableTextAreaProps>(({children, placeholder, onChange}, ref) => {
    return (
        <ResizeableTextAreaContainer 
            contentEditable 
            role="textbox" 
            ref={ref} 
            onChange={onChange}
            data-placeholder={placeholder || ''}
        >
            {children}
        </ResizeableTextAreaContainer>
    )
})

export default ResizableTextArea

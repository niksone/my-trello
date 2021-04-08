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
    content: "Placeholder still possible";
    color: gray;
    
  }
`

  
//   .textarea[contenteditable]:empty::before {
//     content: "Placeholder still possible";
//     color: gray;
//   }

interface ResizableTextAreaProps {
    children?: React.ReactChildren,
    onChange?: () => void
}

const ResizableTextArea = React.forwardRef<HTMLSpanElement, ResizableTextAreaProps>(({children, onChange}, ref) => {
    return (
        <ResizeableTextAreaContainer contentEditable role="textbox" ref={ref} onChange={onChange}>
            {children}
        </ResizeableTextAreaContainer>
    )
})

export default ResizableTextArea

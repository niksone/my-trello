import React from 'react'
import styled from 'styled-components'


export const ResizeableTextArea = styled.span`
    display: block;
    overflow: hidden;
    resize: both;
    min-height: 40px;
    line-height: 20px;
    outline: none;
    border: none;
`

  
//   .textarea[contenteditable]:empty::before {
//     content: "Placeholder still possible";
//     color: gray;
//   }

interface ResizableTextAreaProps {
    children: React.ReactChildren
}

const ResizableTextArea = React.forwardRef<HTMLSpanElement, ResizableTextAreaProps>(({children}, ref) => {
    return (
        <ResizeableTextArea contentEditable role="textbox" ref={ref}>
            {children}
        </ResizeableTextArea>
    )
})

export default ResizableTextArea

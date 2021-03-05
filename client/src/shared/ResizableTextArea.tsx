import React from 'react'
import styled from 'styled-components'


export const ResizeableTextAreaContainer = styled.span`
    display: block;
    width: 100%;
    overflow: hidden;
    resize: both;
    min-height: 40px;
    line-height: 20px;
    outline: none;
    border: none;
    background-color: #fff;
`

  
//   .textarea[contenteditable]:empty::before {
//     content: "Placeholder still possible";
//     color: gray;
//   }

interface ResizableTextAreaProps {
    children?: React.ReactChildren
}

const ResizableTextArea = React.forwardRef<HTMLSpanElement, ResizableTextAreaProps>(({children}, ref) => {
    return (
        <ResizeableTextAreaContainer contentEditable role="textbox" ref={ref}>
            {children}
        </ResizeableTextAreaContainer>
    )
})

export default ResizableTextArea

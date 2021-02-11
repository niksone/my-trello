import React from 'react'
import { CardContainer } from './CardElements'

export interface CardProps {
    id: string,
    columnId: string
    text: string
    isOver?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({id, text, columnId, isOver}, ref) => {
    // console.log(isOver)
    return (
        <CardContainer ref={ref} isOver={isOver}>
            {text}
        </CardContainer>
    )
})

export default Card

import React from 'react'
import { CardContainer } from './CardElements'

interface CardProps {
    text: string
}

const Card = ({text}: CardProps) => {
    return (
        <CardContainer>
            {text}
        </CardContainer>
    )
}

export default Card

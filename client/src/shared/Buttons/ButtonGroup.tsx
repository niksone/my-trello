import React from 'react'
import styled from 'styled-components'

interface ButtonGroupContainerProps {
    columns: number,
    spacing: number
}

const ButtonGroupContainer = styled.div<ButtonGroupContainerProps>`
    display: grid;
    grid-template-columns: repeat(${({columns}) => columns}, 1fr);
    grid-column-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0};

    > {
        width: 100%;
    }
`

interface ButtonGroupProps{
    children: JSX.Element[],
    spacing: number
}

const ButtonGroup = ({children, spacing}: ButtonGroupProps) => {
    return (
        <ButtonGroupContainer columns={children.length} spacing={spacing}>
            {children}
        </ButtonGroupContainer>
    )
}

export default ButtonGroup
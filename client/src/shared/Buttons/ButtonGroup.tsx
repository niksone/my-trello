import React from 'react'
import styled, { css } from 'styled-components'

interface ButtonGroupContainerProps {
    columns: number,
    spacing: number,
    widthFill: boolean
    direction: 'row' | 'column'
}

const directionColumn = css<ButtonGroupContainerProps>`
    grid-template-rows: repeat(${({columns}) => columns}, 1fr);
    grid-row-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0};
`

const directionRow = css<ButtonGroupContainerProps>`
    grid-template-columns: repeat(${({columns}) => columns}, 1fr);
    grid-column-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0};
`




const directionStyles = {
    'row': directionRow,
    'column': directionColumn
}

const ButtonGroupContainer = styled.div<ButtonGroupContainerProps>`
    display: grid;
    /* ${({direction}) => direction} */
    /* grid-column-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0}; */
    /* grid-template-rows: repeat(${({columns}) => columns}, 1fr); */
    ${({direction}) => directionStyles[direction]} 
    

    /* display: inline-flex;
    flex-direction: ${({direction}) => direction};
    gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0}; 
    width: 100%; */

    & > *{
        width: ${({widthFill}) => widthFill && '100%'};
        flex-basis: ${({columns}) => columns ? `calc(100% / ${columns})` : '100%'};
    }
`

interface ButtonGroupProps{
    children: JSX.Element[],
    spacing: number,
    widthFill?: boolean
    direction?: 'row' | 'column'
}

const ButtonGroup = ({children, spacing, widthFill = false, direction}: ButtonGroupProps) => {

    return (
        <ButtonGroupContainer 
            columns={children.length} 
            spacing={spacing} 
            direction={direction || 'row'}
            widthFill={widthFill}
        >
            {children}
        </ButtonGroupContainer>
    )
}

export default ButtonGroup
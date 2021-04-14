import React from 'react'
import styled from 'styled-components'

interface ButtonGroupContainerProps {
    columns: number,
    spacing: number,
    direction: 'row' | 'column'
}

const directionStyles = {
    'row': 
        'grid-template-columns: repeat(${({columns}) => columns}, 1fr);' +
        'grid-column-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0};',
    'column': 
        'grid-template-columns: repeat(${({columns}) => columns}, 1fr);' +
        'grid-row-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0};',

}

const ButtonGroupContainer = styled.div<ButtonGroupContainerProps>`
    /* display: grid;
    /* ${({direction}) => direction} */
    /* grid-column-gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0}; */
    /* ${({direction}) => directionStyles[direction]}  */

    display: inline-flex;
    flex-direction: ${({direction}) => direction};
    gap: ${({spacing}) => spacing ? `${spacing * 4}px` : 0}; 
    width: 100%;

    & > *{
        width: 100%;
        flex-basis: ${({columns}) => columns ? `calc(100% / ${columns})` : '100%'};
    }
`

interface ButtonGroupProps{
    children: JSX.Element[],
    spacing: number,
    direction?: 'row' | 'column'
}

const ButtonGroup = ({children, spacing, direction}: ButtonGroupProps) => {

    return (
        <ButtonGroupContainer 
            columns={children.length} 
            spacing={spacing} 
            direction={direction || 'row'}
        >
            {children}
        </ButtonGroupContainer>
    )
}

export default ButtonGroup
import React from 'react'
import styled from 'styled-components'
import { IconProps } from '../propInterface'

interface ArrowIconProps extends IconProps{
    direction: 'top' | 'right' | 'bottom' | 'left'
}

const rotations = {
    'top': -90,
    'right': 180,
    'bottom': 90,
    'left': 0,
}
export const ArrowIconContainer = styled.span<ArrowIconProps>`
    transform: rotateZ(${({direction}) => rotations[direction]}deg);
`

const ArrowIcon = ({fill, direction}: ArrowIconProps) => {
    return (
    <ArrowIconContainer direction={direction}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill='currentColor' xmlns="http://www.w3.org/2000/svg">
        <path d="M6.74639 0.140625L1.24639 5.64062L0.902644 6L1.24639 6.35938L6.74639 11.8594L7.46514 11.1406L2.32452 6L7.46514 0.859375L6.74639 0.140625Z" 
            fill={fill}
        />
        </svg>
    </ArrowIconContainer>
    )
}

export default ArrowIcon

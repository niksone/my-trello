import React from 'react'
import { IconProps } from '../propInterface'

const MenuIcon = ({fill}: IconProps) => {
    return (
    <svg width="18" height="13" viewBox="0 0 18 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 0.5625V1.9375H17.25V0.5625H0.75ZM0.75 6.0625V7.4375H17.25V6.0625H0.75ZM0.75 11.5625V12.9375H17.25V11.5625H0.75Z" 
        fill={fill}
        />
    </svg>
    )
}

export default MenuIcon

import React from 'react'
import { IconProps } from '../propInterface'

const PickIcon = ({fill}: IconProps) => {

    return (
    <svg width="19" height="14" viewBox="0 0 19 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.63 0.84C14.27 0.33 13.67 0 13 0L2 0.0100002C0.9 0.0100002 0 0.9 0 2V12C0 13.1 0.9 13.99 2 13.99L13 14C13.67 14 14.27 13.67 14.63 13.16L19 7L14.63 0.84ZM13 12H2V2H13L16.55 7L13 12Z" 
        fill={fill}/>
    </svg>
    )
}

export default PickIcon

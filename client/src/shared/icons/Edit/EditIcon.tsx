import React from 'react'
import { IconProps } from '../propInterface'

const EditIcon = ({fill}: IconProps) => {
    return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.7092 4.52839L17.4717 3.29089C16.7567 2.57589 15.5925 2.57589 14.8775 3.29089L12.2833 5.87589L2.75 15.4184V19.2501H6.58167L16.17 9.66172L18.7092 7.12256C19.4333 6.40756 19.4333 5.24339 18.7092 4.52839ZM5.87583 17.4717L4.58333 17.4167V16.1701L13.585 7.16839L14.8775 8.46089L5.87583 17.4717Z" 
        fill={fill}/>
    </svg>
    )
}

export default EditIcon

import React from 'react'
import { IconProps } from '../propInterface'

const AddIcon = ({fill}: IconProps) => {

    return (

        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path id="Ico" d="M8 0.9375C6.67578 0.9375 5.44531 1.27148 4.30859 1.93945C3.20703 2.58398 2.33398 3.45703 1.68945 4.55859C1.02148 5.69531 0.6875 6.92578 0.6875 8.25C0.6875 9.57422 1.02148 10.8047 1.68945 11.9414C2.33398 13.043 3.20703 13.916 4.30859 14.5605C5.44531 15.2285 6.67578 15.5625 8 15.5625C9.32422 15.5625 10.5547 15.2285 11.6914 14.5605C12.793 13.916 13.666 13.043 14.3105 11.9414C14.9785 10.8047 15.3125 9.57422 15.3125 8.25C15.3125 6.92578 14.9785 5.69531 14.3105 4.55859C13.666 3.45703 12.793 2.58398 11.6914 1.93945C10.5547 1.27148 9.32422 0.9375 8 0.9375ZM8 2.0625C9.125 2.0625 10.168 2.34375 11.1289 2.90625C12.0547 3.45703 12.793 4.19531 13.3438 5.12109C13.9062 6.08203 14.1875 7.125 14.1875 8.25C14.1875 9.375 13.9062 10.418 13.3438 11.3789C12.793 12.3047 12.0547 13.043 11.1289 13.5938C10.168 14.1562 9.125 14.4375 8 14.4375C6.875 14.4375 5.83203 14.1562 4.87109 13.5938C3.94531 13.043 3.20703 12.3047 2.65625 11.3789C2.09375 10.418 1.8125 9.375 1.8125 8.25C1.8125 7.125 2.09375 6.08203 2.65625 5.12109C3.20703 4.19531 3.94531 3.45703 4.87109 2.90625C5.83203 2.34375 6.875 2.0625 8 2.0625ZM7.4375 4.875V7.6875H4.625V8.8125H7.4375V11.625H8.5625V8.8125H11.375V7.6875H8.5625V4.875H7.4375Z" 
            fill={fill}/>
        </svg>
    )
}

export default AddIcon
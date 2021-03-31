import React from 'react'
import { ProgressContainer, ProgressFill, ProgressValue } from './ProgressComponents'


interface ProgressBarProps {
    value: number
}

const ProgressBar = ({value}: ProgressBarProps)  => {
    return (
        <ProgressContainer>
            <ProgressFill></ProgressFill>
            <ProgressValue value={value}></ProgressValue>
        </ProgressContainer>
    )
}

export default ProgressBar

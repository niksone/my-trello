import { ProgressContainer, ProgressFill, ProgressValue } from './ProgressComponents'


interface ProgressBarProps {
    value: number,
    variant: 'default'
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

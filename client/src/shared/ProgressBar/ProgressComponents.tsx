import styled from "styled-components";
import { COLORS } from "../constants";

interface ProgressValueProps {
    value: number
}

type ProgressStylesValues = {
    breakpoint: number
    color: string
}

interface ProgressStylesI {
    [key: string]: ProgressStylesValues
}
const progressStyles: ProgressStylesI =  {
    danger: {
        breakpoint: 0,
        color: COLORS.error
    },
    warning: {
        breakpoint: 30,
        color: COLORS.warning
    },
    success: {
        breakpoint: 70,
        color: COLORS.success
    }
}

const getProgressColor = (value: number, styles: typeof progressStyles) => {
    let progressColor = progressStyles.danger.color
    for(const style of Object.values(styles)){
        // console.log(value, style.breakpoint);
        progressColor = value >= style.breakpoint ? style.color : progressColor
        // console.log(value, style.breakpoint, value >= style.breakpoint, progressColor);
    }

    // progressColor = progressColor === '' ? styles.danger.color : progressColor
    // console.log('res ' + progressColor);
    return progressColor
}

export const ProgressContainer = styled.div`
    position: relative;
    height: 4px;
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
`

export const ProgressFill = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
    border-radius: inherit;
    overflow: hidden;

`

export const ProgressValue = styled.div<ProgressValueProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    /* width: ${({value}) => value && value}%; */
    width: 100%;
    transform: translateX(${({value}) => value ? value - 100 : -100}%);
    background-color: ${({value}) => getProgressColor(value, progressStyles)};
    border-radius: inherit;
    transition: 0.2s transform ease-in-out;
`
import styled, { css } from "styled-components";
import { number } from "yup";

interface ProgressValueProps {
    value: number
}

const progressStyles =  {
    danger: {
        breakpoint: 30,
        color: 'var(--color-error)'
    },
    warning: {
        breakpoint: 31,
        color: 'var(--color-warning)'
    },
    success: {
        breakpoint: 70,
        color: 'var(--color-success)'
    }
}

const getProgressColor = (value: number, styles: typeof progressStyles) => {
    let progressColor = progressStyles.danger.color
    for(const style of Object.values(styles)){
        // console.log(value, style.breakpoint);
        progressColor = value <= style.breakpoint ? progressColor : style.color
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
    background-color: ${({value}) => value && getProgressColor(value, progressStyles)};
    border-radius: inherit;
    transition: 0.2s transform ease-in-out;
`
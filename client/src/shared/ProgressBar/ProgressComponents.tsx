import styled from "styled-components";

interface ProgressValueProps {
    value: number
}

export const ProgressContainer = styled.div`
    position: relative;
    height: 4px;
    width: 100%;
    border-radius: 2px;
`

export const ProgressFill = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
    border-radius: inherit;

`

export const ProgressValue = styled.div<ProgressValueProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({value}) => value && value}%;
    background-color: red;
    border-radius: inherit;

`
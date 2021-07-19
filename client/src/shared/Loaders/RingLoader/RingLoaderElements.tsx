import styled, { css, keyframes } from "styled-components";

const right = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}
`;

const left = keyframes`
  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}
  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}
`;
interface SpinnerWrapperProps {
    size: string
}

export const SpinnerWrapper = styled.span<SpinnerWrapperProps>`
    width: ${({size}) => size};
    height: ${({size}) => size};
    position: relative;
`

interface SpinnerRingProps {
    value: number
    unit: string
    color: string
    speedMultiplier: number
    i: number
}

export const SpinnerRing = styled.span<SpinnerRingProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({value, unit}) => `${value}${unit}`};
    height: ${({value, unit}) => `${value}${unit}`};
    border: ${({value, unit, color}) =>  `${value / 10}${unit}  solid ${color}`};
    opacity: 0.4;
    border-radius: 100%;
    animation-fill-mode: forwards;
    perspective: 800px;
    animation: ${({i, speedMultiplier}) => css`${i === 1 ? right: left} ${2 / speedMultiplier}s 0s infinite linear`};
`
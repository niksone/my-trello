import styled, { css, FlattenInterpolation, ThemedStyledProps } from "styled-components";
import { btnIconSizes, ButtonProps, sizes } from ".";
import { COLORS } from "../constants";

type ColorSchemeValues = {
    resting: string
    hover: string
    active: string
    textColor: string
    textColorHover: string
}
interface ColorSchemesI {
    [key: string]: ColorSchemeValues
}

export const colorSchemes: ColorSchemesI = {
    primary: {
        resting: COLORS.primaryLight,
        hover: COLORS.buttonHover,
        active: COLORS.primary,
        textColor: COLORS.primary,
        textColorHover: '#fff'
    },

    primaryError: {
        resting: COLORS.primaryLight,
        hover: COLORS.error,
        active: COLORS.primary,
        textColor: COLORS.error,
        textColorHover: '#fff'
    },

    errorLight: {
        resting: COLORS.errorLight,
        hover: COLORS.error,
        active: COLORS.error,
        textColor: COLORS.error,
        textColorHover: '#fff'
    },

    error: {
        resting: COLORS.error,
        hover: COLORS.errorHover,
        active: COLORS.errorHover,
        textColor: '#fff',
        textColorHover: '#fff'
    }
}

const shadowStylesActive = css`
    background-color: var(--color-primary-light);
    color: var(--color-primary);
`;

const shadowStyles = css<ButtonProps>`
    background: none;
    border: none;
    color: ${({ color }) => (color ? color : COLORS.primaryGrey)};
    ${({ active }) => active && shadowStylesActive}

    &:hover {
        background-color: var(--color-primary-light);
    }

    &:active {
        ${shadowStylesActive}
    }
`;

const outlineStylesActive = css`
    border: 1px var(--color-primary) solid;
    color: var(--color-primary);
`;

const outlineStyles = css<ButtonProps>`
    background: none;
    border: 1px ${({ color }) => (color ? color : COLORS.buttonOutlineResting)} solid;
    color: ${({ color }) => (color ? color : COLORS.primaryGrey)};
    ${({ active }) => active && outlineStylesActive}

    &:hover {
        border: 1px var(--color-primary) solid;
        color: black;
    }

    &:active {
        ${outlineStylesActive}
    }
`;

const fillStylesActive = css<ButtonProps>`
    background: ${({ colorScheme }) =>
        colorScheme
            ? colorSchemes[colorScheme].active
            : colorSchemes.primary.active};
    color: #fff;
`;

const fillStyles = css<ButtonProps>`
    background: ${({ colorScheme }) =>
        colorScheme
            ? colorSchemes[colorScheme].resting
            : colorSchemes.primary.resting};
    color: ${({ color, colorScheme }) =>
        color
            ? color
            : colorScheme
            ? colorSchemes[colorScheme].textColor
            : colorSchemes.primary.textColor};

    border: none;
    ${({ active }) => active && fillStylesActive}

    &:hover {
        background: ${({ colorScheme }) =>
            colorScheme
                ? colorSchemes[colorScheme].hover
                : colorSchemes.primary.hover};
        color: ${({ color, colorScheme }) =>
            color
                ? color
                : colorScheme
                ? colorSchemes[colorScheme].textColorHover
                : colorSchemes.primary.textColorHover};
    }

    &:active {
        ${fillStylesActive}
    }

    &:disabled {
        background: var(--color-background);
        color: var(--color-primary-grey);
    }
`;

const unstyleStyles = css`
    border: none;
    outline: none;
    background: none;
    padding: 0;
    margin: 0;
`;

const dashedStyles = css`
    border: 1px dashed var(--color-resting-outline);
`;

const invisibleStyles = css`
    opacity: 0;
`;

type stylesOptions = {
    [key: string]: FlattenInterpolation<ThemedStyledProps<ButtonProps, any>>;
};

const styles: stylesOptions = {
    outline: outlineStyles,
    fill: fillStyles,
    shadow: shadowStyles,
    unstyle: unstyleStyles,
    dashed: dashedStyles,
    invisible: invisibleStyles,
};
export const ButtonContainer = styled.button<ButtonProps>`
    display: flex;
    justify-content: ${({ jc }) => (jc ? jc : "center")};
    align-items: center;
    color: var(--color-primary-dark);
    padding: ${({ size }) => (size ? sizes[size] : sizes.lg)};
    font-size: var(--text-button);
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
    width: ${({ widthFill }) => (widthFill ? "100%" : "auto")};
    ${({ variant }) => (variant ? styles[variant] : "fill")};
    font-size: var(--text-regular);
    font-weight: ${({ fw }) => fw};
    background: ${({ bg }) => bg && bg};
`;

export const ButtonIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`;

export const BtnIconContainer = styled.button<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ variant }) => (variant ? styles[variant] : "fill")};
    height: ${({ size }) => (size ? btnIconSizes[size] : btnIconSizes.md)};
    width: ${({ size }) => (size ? btnIconSizes[size] : btnIconSizes.md)};
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
`;

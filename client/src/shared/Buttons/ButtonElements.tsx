import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { btnIconSizes, ButtonProps, ButtonVariants, sizes } from ".";
import { COLORS } from "../constants";

export type ColorScheme = 'primary'  | 'error' | 'errorLight'

export type ColorSchemeValues = {
    primary: ColorSchemesStyles | null
    error: ColorSchemesStyles | null,
    errorLight: ColorSchemesStyles | null,
    advanced?: FlattenSimpleInterpolation 
}

export type ColorSchemesStyles = {
    bg: string
    bgHover: string,
    bgActive: string,
    textColor: string,
    textColorHover: string,
    textColorActive: string,
    border: string,
    borderHover: string
}


type ColorSchemesI = Record<ButtonVariants, ColorSchemeValues>

export const colorSchemes: ColorSchemesI = { 
    fill: {
        primary: {
            bg: COLORS.primaryLight,
            bgHover: COLORS.buttonHover,
            bgActive: COLORS.primary,
            textColor: COLORS.primary,
            textColorHover: '#fff',
            textColorActive: '#fff',
            border: 'none',
            borderHover: 'none'
        },
        error: {
            bg: COLORS.errorLight,
            bgHover: COLORS.errorHover,
            bgActive: COLORS.error,
            textColor: COLORS.error,
            textColorHover: '#fff',
            textColorActive: '#fff',
            border: 'none',
            borderHover: 'none'
        },
        errorLight: {
            bg: COLORS.error,
            bgHover: COLORS.errorHover,
            bgActive: COLORS.errorHover,
            textColor: '#fff',
            textColorHover: '#fff',
            textColorActive: '#fff',
            border: 'none',
            borderHover: 'none'
        }
    },
    outline: {
        primary: {
            bg: 'none',
            bgHover: 'none',
            bgActive: 'none',
            textColor: COLORS.primaryGrey,
            textColorHover: COLORS.primary,
            textColorActive: COLORS.primary,
            border: `1px solid ${COLORS.buttonOutlineResting}`,
            borderHover: `1px solid ${COLORS.primary}`
        },
        error: {
            bg: 'none',
            bgHover: 'none',
            bgActive: COLORS.error,
            textColor: COLORS.primaryGrey,
            textColorHover: COLORS.error,
            textColorActive: COLORS.error,
            border: `1px solid ${COLORS.buttonOutlineResting}`,
            borderHover: `1px solid ${COLORS.error}`
        },
        errorLight: null
    },
    shadow: {
        primary: {
            bg: 'none',
            bgHover: COLORS.primaryLight,
            bgActive: COLORS.primaryLight,
            textColor: COLORS.primaryGrey,
            textColorHover: COLORS.primaryGrey,
            textColorActive: COLORS.primary,
            border: 'none',
            borderHover: 'none'
        },
        error: {
            bg: 'none',
            bgHover: COLORS.errorLight,
            bgActive: COLORS.errorLight,
            textColor: COLORS.primaryGrey,
            textColorHover: COLORS.primaryGrey,
            textColorActive: COLORS.error,
            border: 'none',
            borderHover: 'none'
        },
        errorLight: null
    },

    dashed: {
        primary: {
            bg: 'none',
            bgHover: 'none',
            bgActive: 'none',
            textColor: COLORS.primaryDark,
            textColorHover: COLORS.primary,
            textColorActive: COLORS.primary,
            border: `1px dashed ${COLORS.restingOutline}`,
            borderHover: `1px dashed ${COLORS.primary}`
        },
        error: {
            bg: 'none',
            bgHover: 'none',
            bgActive: 'none', 
            textColor: COLORS.primaryDark,
            textColorHover: COLORS.error,
            textColorActive: COLORS.error,
            border: `1px dashed ${COLORS.restingOutline}`,
            borderHover: `1px dashed ${COLORS.error}`
        },
        errorLight: null,
    },

    unstyle: {
        primary: null,
        error: null,
        errorLight: null,
        advanced: 
            css`
                border: none;
                outline: none;
                background: none;
                padding: 0;
                margin: 0;
            `
    },

    invisible: {
        primary: null,
        error: null,
        errorLight: null,
        advanced: 
            css`
                opacity: 0;
            `
    },
}



const getActiveStyles = (bgActive, textColorActive)=>
 css`
    background: ${bgActive};
    color: ${textColorActive};
`


const getStyle = (variant = 'fill', colorScheme = 'primary', active = false) => {
    const {bg, bgHover, bgActive, textColor, textColorHover, textColorActive, border, borderHover} = colorSchemes[variant][colorScheme] || {}
    
    const {advanced} = colorSchemes[variant]

    return css`
        background: ${bg};
        color: ${textColor};
        border: ${border};
        ${active && getActiveStyles(bgActive, textColorActive)}
        

        &:hover{
            background: ${bgHover};
            color: ${textColorHover};
            border: ${borderHover};
        }

        &:active{
            ${ getActiveStyles(bgActive, textColorActive)}
        }

        ${advanced}
    `
}

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
    font-size: var(--text-regular);
    font-weight: ${({ fw }) => fw};
    ${({bg}) => bg ?`background: ${bg}` : ''}
    
    &:hover{
        ${({bg}) => bg ?`background: ${bg}` : ''}
    }
    ${({ variant, colorScheme, active}) => getStyle(variant, colorScheme, active)}

    /* color: ${({active, variant, colorScheme}) => active && variant && colorScheme ? colorSchemes[variant][colorScheme]?.textColorActive : ''}; */
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
    height: ${({ size }) => (size ? btnIconSizes[size] : btnIconSizes.md)};
    width: ${({ size }) => (size ? btnIconSizes[size] : btnIconSizes.md)};
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
    ${({ variant, colorScheme}) =>getStyle(variant, colorScheme)}
    background: ${({bg}) => bg ?`${bg}` : ''};

    &:hover{
        ${({bg}) => bg ? `background: ${bg} ` : ''}
    }
`;

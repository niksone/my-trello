import React from 'react'
import styled, {css, FlattenInterpolation, ThemedStyledProps} from 'styled-components'


const colorSchemes = {
    primary: {
        resting: 'var(--color-primary-light)',
        hover: 'var(--color-button-hover)',
        active: 'var(--color-primary)',
        textColor: 'var(--color-primary)',
        textColorHover: '#fff'
    },

    primaryError: {
        resting: 'var(--color-primary-light)',
        hover: 'var(--color-error)',
        active: 'var(--color-primary)',
        textColor: 'var(--color-error)',
        textColorHover: '#fff'
    },

    errorLight: {
        resting: 'var(--color-error-light)',
        hover: 'var(--color-error)',
        active: 'var(--color-error)',
        textColor: 'var(--color-error)',
        textColorHover: '#fff'
    },

    error: {
        resting: 'var(--color-error)',
        hover: 'var(--color-error-hover)',
        active: 'var(--color-error-hover)',
        textColor: '#fff',
        textColorHover: '#fff'
    }
}


const shadowStylesActive = css`
    background-color: var(--color-primary-light);
    color: var(--color-primary);
`

const shadowStyles = css<ButtonProps>`
    background: none;
    border:  none;
    color: var(${({color}) => color ? color : '--color-primary-grey'});
    ${({active}) => active && shadowStylesActive}

    &:hover{ 
        background-color: var(--color-primary-light);
    }

    &:active{
        ${shadowStylesActive}
    }
`

const outlineStylesActive = css`
    border: 1px var(--color-primary) solid;
    color: var(--color-primary);
`

const outlineStyles = css<ButtonProps>`
    background: none;
    border:  1px var(${({color}) => color ? color : '--color-button-outline-resting'}) solid;
    color: var(${({color}) => color ? color : '--color-primary-grey'});
    ${({active}) => active && outlineStylesActive}

    &:hover{ 
        border:  1px var(--color-primary) solid;
        color: black;
    }

    &:active{
        ${outlineStylesActive}
    }
`

const fillStylesActive = css<ButtonProps>`
    background: ${({colorScheme}) => colorScheme ? colorSchemes[colorScheme].active : colorSchemes.primary.active};
    color: #fff;
`


const fillStyles = css<ButtonProps>`
    background: ${({colorScheme}) => colorScheme 
        ? colorSchemes[colorScheme].resting 
        : colorSchemes.primary.resting};
        color: ${({color, colorScheme}) => 
            color 
                ? color 
                : colorScheme 
                    ? colorSchemes[colorScheme].textColor
                    : colorSchemes.primary.textColor};

        border: none;
    ${({active}) => active && fillStylesActive}


    &:hover {
        background: ${({colorScheme}) => colorScheme 
            ? colorSchemes[colorScheme].hover 
            : colorSchemes.primary.hover};
        color: ${({color, colorScheme}) => 
            color 
                ? color 
                : colorScheme 
                    ? colorSchemes[colorScheme].textColorHover
                    : colorSchemes.primary.textColorHover};
    }

    &:active{
        ${fillStylesActive}
    }

    &:disabled{
        background: var(--color-background);
        color: var(--color-primary-grey);
    }
`

const unstyleStyles = css`
    border: none;
    outline: none;
    background: none;
    padding: 0;
    margin: 0;
`

const dashedStyles = css`
    border: 1px dashed var(--color-resting-outline);
`

const invisibleStyles = css`
    opacity: 0;
`


type stylesOptions = {
    [key: string]: FlattenInterpolation<ThemedStyledProps<ButtonProps, any>>
}

const styles: stylesOptions = {
    outline: outlineStyles,
    fill: fillStyles,
    shadow: shadowStyles,
    unstyle: unstyleStyles,
    dashed: dashedStyles,
    invisible: invisibleStyles
}

const sizes = {
    sm: '4px 9px',
    md: '8px 19px',
    lg: '14px 29px'
}

const ButtonContainer = styled.button<ButtonProps>`
    display: flex;
    justify-content: ${({jc}) => jc ? jc : 'center'};
    align-items: center;
    color: var(--color-primary-dark);
    padding: ${({size}) => size ? sizes[size] : sizes.lg};
    font-size: var(--text-button);
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
    width: ${({widthFill}) => widthFill ? '100%' : 'auto'};
    ${({variant}) => variant ? styles[variant] : 'fill'};
    font-size: var(--text-regular);
    font-weight: ${({fw}) => fw};
    background: ${({bg}) => bg && bg};
`

const ButtonIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`

const btnIconSizes = {
    sm: '16px',
    md: '25px',
    lg: '36px'
}

const BtnIconContainer = styled.button<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    ${({variant}) => variant ? styles[variant] : 'fill'};
    height: ${({size}) => size ? btnIconSizes[size] : btnIconSizes.md};
    width: ${({size}) => size ? btnIconSizes[size] : btnIconSizes.md};
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
`

interface ButtonProps {
    onClick?:  React.MouseEventHandler<HTMLButtonElement>;
    // background?: string,
    color?: string,
    widthFill?: boolean,
    active?: boolean,
    variant?: 'outline' | 'fill' | 'shadow' | 'unstyle' | 'dashed' | 'invisible',
    Icon?: any,
    size?: 'lg' | 'md' | 'sm',
    colorScheme?: keyof typeof colorSchemes,
    jc?: 'start' | 'center' | 'end',
    fw?: '400' | '700'
    shape?: BtnShape,
    bg?: string
}

type BtnShape = 'default' | 'icon'

const Button = ({children, onClick, ...rest}: React.PropsWithChildren<ButtonProps>) => {
    rest.variant = rest.variant ? rest.variant : 'fill'
    rest.shape = rest.shape ? rest.shape : 'default'
    rest.fw = rest.fw ? rest.fw : '400'

    const ButtonIcon = rest.Icon
    // console.log(rest.variant)


    const getButtonStyles = (shape: BtnShape) => {
        switch(shape){
            case 'default':{
                return (
                    <ButtonContainer onClick={onClick} {...rest}>
                        {ButtonIcon && (
                            <ButtonIconContainer>
                                {/* {rest.Icon} */}
                                <ButtonIcon />
                            </ButtonIconContainer>
                        )}
                        {children}
                    </ButtonContainer>
                )
            }

            case 'icon':{
                return (
                    <BtnIconContainer onClick={onClick} {...rest}>
                        {children}
                    </BtnIconContainer>
                )
            }

        }
    }
    return (
        getButtonStyles(rest.shape)
    )
}

export default Button

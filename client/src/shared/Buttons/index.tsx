import React from 'react'
import styled, {css, FlattenInterpolation, ThemedStyledProps} from 'styled-components'


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

const oulineStylesActive = css`
    border: 1px var(--color-primary) solid;
    color: var(--color-primary);
`

const outlineStyles = css<ButtonProps>`
    background: none;
    border:  1px var(${({color}) => color ? color : '--color-button-outline-resting'}) solid;
    color: var(${({color}) => color ? color : '--color-primary-grey'});
    ${({active}) => active && oulineStylesActive}

    &:hover{ 
        border:  1px var(--color-primary) solid;
        color: black;
    }

    &:active{
        ${oulineStylesActive}
    }
`

const fillStylesActive = css`
    background: '--color-primary';
    color: #fff;
`


const fillStyles = css<ButtonProps>`
    background: var(${({background}) => background ? background : '--color-primary-light'});
    color: var(${({color}) => color ? color : '--color-primary'});
    border: none;
    ${({active}) => active && fillStylesActive}


    &:hover {
        background: var(${({background}) => background ? background : '--color-button-hover'});
        color: #fff;
    }

    &:active{
        ${fillStylesActive}
    }

    &:disabled{
        background: var(${({background}) => background ? background : '--color-background'});
        color: var(--color-primary-grey);
    }
`

type stylesOptions = {
    [key: string]: FlattenInterpolation<ThemedStyledProps<ButtonProps, any>>
}

const styles: stylesOptions = {
    outline: outlineStyles,
    fill: fillStyles,
    shadow: shadowStyles
}


const ButtonContainer = styled.button<ButtonProps>`
    display: flex;
    justify-content: ${({jc}) => jc ? jc : 'center'};
    align-items: center;
    padding: 14px 29px;
    font-size: var(--text-button);
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
    width: ${({widthFill}) => widthFill ? '100%' : 'auto'};
    ${({variant}) => variant ? styles[variant] : 'fill'};
    font-size: var(--text-regular);
`

interface ButtonProps {
    onClick?:  React.MouseEventHandler<HTMLButtonElement>;
    background?: string,
    color?: string,
    widthFill?: boolean,
    active?: boolean,
    variant?: 'outline' | 'fill' | 'shadow',
    jc?: 'start' | 'center' | 'end'
}

const Button = ({children, onClick, ...rest}: React.PropsWithChildren<ButtonProps>) => {
    rest.variant = rest.variant ? rest.variant : 'fill'
    console.log(rest.variant)
    return (
        <ButtonContainer onClick={onClick} {...rest}>
            {children}
        </ButtonContainer>
    )
}

export default Button

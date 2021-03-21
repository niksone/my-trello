import React from 'react'
import styled, {css} from 'styled-components'


const outlineStyles = css<ButtonProps>`
    background: none;
    border:  1px var(${({color}) => color ? color : '--color-button-outline-resting'}) solid;
    color: var(${({color}) => color ? color : '--color-primary-grey'});

    &:hover{ 
        border:  1px var(--color-primary) solid;
        color: black;
    }

    &:active{
        border: 1px var(--color-primary) solid;
        color: var(--color-primary);
    }
`

const fillStyles = css<ButtonProps>`
    background: var(${({background}) => background ? background : '--color-primary-light'});
    color: var(${({color}) => color ? color : '--color-primary'});
    border: none;

    &:hover {
        background: var(${({background}) => background ? background : '--color-button-hover'});
        color: #fff;
    }

    &:active{
        background: var(${({background}) => background ? background : '--color-primary'});
        color: #fff;
    }

    &:disabled{
        background: var(${({background}) => background ? background : '--color-background'});
        color: var(--color-primary-grey);
    }
`

const ButtonContainer = styled.button<ButtonProps>`
    padding: 14px 29px;
    font-size: var(--text-button);
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: 0.2s all ease-in-out;
    width: ${({widthFill}) => widthFill ? '100%' : 'auto'};
    ${({outline}) => outline ? outlineStyles : fillStyles};
    font-size: var(--text-regular);
`

interface ButtonProps {
    onClick?:  React.MouseEventHandler<HTMLButtonElement>;
    background?: string,
    color?: string,
    widthFill?: boolean,
    outline?: boolean,
}

const Button = ({children, onClick, ...rest}: React.PropsWithChildren<ButtonProps>) => {
    return (
        <ButtonContainer onClick={onClick} {...rest}>
            {children}
        </ButtonContainer>
    )
}

export default Button

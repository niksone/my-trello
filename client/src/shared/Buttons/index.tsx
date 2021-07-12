import React from 'react'
import styled, {css, FlattenInterpolation, ThemedStyledProps} from 'styled-components'
import { BtnIconContainer, ButtonContainer, ButtonIconContainer, colorSchemes } from './ButtonElements'



export const btnIconSizes = {
    sm: '16px',
    md: '25px',
    lg: '36px'
}

export const sizes = {
    sm: '4px 9px',
    md: '8px 19px',
    lg: '14px 29px'
}

export interface ButtonProps {
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

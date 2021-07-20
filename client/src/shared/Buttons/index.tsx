import React from 'react'
import { BtnIconContainer, ButtonContainer, ButtonIconContainer, ColorScheme, colorSchemes, ColorSchemesStyles, ColorSchemeValues } from './ButtonElements'


interface ButtonSizes {
    sm: string
    md: string
    lg: string
}

export const btnIconSizes: ButtonSizes = {
    sm: '16px',
    md: '25px',
    lg: '36px'
}

export const sizes: ButtonSizes = {
    sm: '4px 9px',
    md: '8px 19px',
    lg: '14px 29px'
}

export type ButtonVariants = 'outline' | 'fill' | 'shadow' | 'unstyle' | 'dashed' | 'invisible'

export interface ButtonProps {
    onClick?:  React.MouseEventHandler<HTMLButtonElement>;
    color?: string,
    widthFill?: boolean,
    active?: boolean,
    variant?: ButtonVariants,
    Icon?: JSX.Element,
    size?: 'lg' | 'md' | 'sm',
    colorScheme?: ColorScheme,
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
    rest.colorScheme = rest.colorScheme ? rest.colorScheme : 'primary'
    console.log(rest.active);
    const ButtonIcon = rest.Icon

    const getButtonStyles = (shape: BtnShape) => {
        switch(shape){
            case 'default':{
                return (
                    <ButtonContainer onClick={onClick} {...rest}>
                        {ButtonIcon && (
                            <ButtonIconContainer>
                                {/* {rest.Icon} */}
                                {ButtonIcon}
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

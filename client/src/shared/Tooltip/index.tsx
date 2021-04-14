import React, { useState } from 'react'
import { TooltipCloseContainer, TooltipContainer, TooltipContent } from './TooltipElements'

interface TooltipProps{ 
    content: any
    direction: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = ({content, children, direction}: React.PropsWithChildren<TooltipProps>) => {
    const [show, setShow] = useState(false)

    const handleClick = (e: any) => {
        e.stopPropagation()
        setShow(prev => !prev)
    }

    return (
        <TooltipContainer 
            onClick={handleClick}
        >
            {children}
            {
                show && (
                    <>
                    <TooltipCloseContainer onClick={handleClick}>

                    </TooltipCloseContainer>
                    <TooltipContent>
                        {content}
                    </TooltipContent>
                </>
                )
            }   
        </TooltipContainer>
    )
}

export default Tooltip

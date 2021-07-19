import React, { useRef, useState } from 'react'
import { TooltipCloseContainer, TooltipContainer, TooltipContent } from './TooltipElements'

interface TooltipProps{ 
    content: JSX.Element | JSX.Element[] | string
    direction: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = ({content, children, direction}: React.PropsWithChildren<TooltipProps>) => {
    const [show, setShow] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)

    const [{offsetX, offsetY}, setOffset] = useState({offsetX: 0, offsetY: 0})

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        const elemRect = tooltipRef.current?.getBoundingClientRect(),
              offsetY = (elemRect && (elemRect.bottom + 7)) || 0,
              offsetX = (elemRect && (window.innerWidth - elemRect.right)) || 0
        
        setOffset(prev => ({offsetX, offsetY}) || prev) 
        setShow(prev => !prev)
    }

    return (
        <TooltipContainer 
            onClick={handleClick}
            ref={tooltipRef}
        >
            {children}
                <TooltipCloseContainer onClick={handleClick} show={show}>
                    <TooltipContent onClick={handleClick} offsetX={offsetX} offsetY={offsetY}>
                        {content}
                    </TooltipContent>
                </TooltipCloseContainer>

        </TooltipContainer>
    )
}

export default Tooltip

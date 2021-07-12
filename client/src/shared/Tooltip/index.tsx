import React, { useRef, useState } from 'react'
import { TooltipCloseContainer, TooltipContainer, TooltipContent } from './TooltipElements'

interface TooltipProps{ 
    content: any
    direction: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = ({content, children, direction}: React.PropsWithChildren<TooltipProps>) => {
    const [show, setShow] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const tooltipContentRef = useRef<HTMLDivElement>(null)

    const [{offsetX, offsetY}, setOffset] = useState({offsetX: 0, offsetY: 0})

    const handleClick = (e: any) => {
        e.stopPropagation()
        const bodyRect = document.body.getBoundingClientRect(),
              elemRect = tooltipRef.current?.getBoundingClientRect(),
              offsetY = (elemRect && (elemRect.bottom + 7)) || 0,
              offsetX = (elemRect && (window.innerWidth - elemRect.right)) || 0
        
        setOffset(prev => ({offsetX, offsetY}) || prev) 
        // setTimeout(() => setShow(prev => !prev), 1000)
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

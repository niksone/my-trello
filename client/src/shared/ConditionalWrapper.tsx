import React from 'react'

interface ConditionalWrapperProps {
    Wrapper: React.ElementType,
    condition: boolean
}

const ConditionalWrapper = ({Wrapper, children, condition}: React.PropsWithChildren<ConditionalWrapperProps>) => {

        return    (
            condition 
                ? (<Wrapper>{children}</Wrapper>)
                : <>{children}</>
            
        )
    
}

export default ConditionalWrapper

import React from 'react'
import useFullHeight from '../utils/useFullHeight'

const Div100vh = ({children}: React.PropsWithChildren<{}>) => {
    const {height} = useFullHeight()
    return (
        <div style={{height: `${height}px`}}>
            {children}
        </div>
    )
}

export default Div100vh

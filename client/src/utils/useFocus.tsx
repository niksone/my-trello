import { RefObject, useEffect } from 'react'



const useFocus = (ref: RefObject<HTMLElement>) => {

    useEffect(() => {
        ref?.current?.focus()
    }, [])

    // return ()
}

export default useFocus

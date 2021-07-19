import { useEffect, useState } from 'react'

const useFullHeight = () => {
    const [height, setHeight] = useState<number | null>()

    useEffect(() => {
        const measureHeight = () => {
            const measuredHeight = getHeight()
            setHeight(measuredHeight)
        }
        measureHeight()
        window.addEventListener('resize', measureHeight)
        return () => window.removeEventListener('resize', measureHeight)
    }, [])

    function isClient() {
        return typeof window !== 'undefined' && typeof document !== 'undefined'
    }

    const getHeight = () => {
        if(!isClient()) return null
        return document.documentElement?.clientHeight || window.innerHeight
    }

    return {height, setHeight}
}

export default useFullHeight

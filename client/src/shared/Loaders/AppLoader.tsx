import styled from 'styled-components'
import RingLoader from './RingLoader'

export const AppLoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AppLoader = () => {
    const size = window.innerWidth > window.innerHeight ? '50vh' : '50vw'

    return (
        <AppLoaderContainer>
            <RingLoader size={size}/>
        </AppLoaderContainer>
    )
}

export default AppLoader

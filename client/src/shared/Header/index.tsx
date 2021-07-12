import { useContext } from 'react'
import { userContext } from '../../Context'
import { HeaderContainer } from './HeaderElements'

const Header = () => {
    const {isAuth, getAuth} = useContext(userContext)

    return (
        <HeaderContainer>
            
        </HeaderContainer>
    )
}

export default Header

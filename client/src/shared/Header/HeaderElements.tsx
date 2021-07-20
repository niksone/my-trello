import styled from 'styled-components'
import { BREAKPOINTS } from '../constants'

export const HeaderContainer = styled.div`
    height: 85px;
    width: 100%;

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        padding: 0 20px;
        background-color: #fff;
    }
`

export const HeaderWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: space-between;
`

export const LogoWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-h3);
    font-weight: bold;
    color: var(--color-primary);
`

export const HeaderTitle = styled.h3`
    font-size: var(--text-h3);
`
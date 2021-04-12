import styled from 'styled-components'

export const HeaderContainer = styled.div`
    height: 85px;
    width: 100%;

    @media screen and (max-width: 425px){
        padding: 0 20px;
    }
    /* grid-area: 'header' */
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
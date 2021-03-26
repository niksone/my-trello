import styled from 'styled-components'

export const HeaderContainer = styled.div`
    height: 85px;
    width: 100%;
    /* grid-area: 'header' */
`

export const HeaderWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: space-between;
`

export const LogoContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

`

export const LogoWrapper = styled.div`
    height: 100%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--text-h3);
    font-weight: bold;
    color: var(--color-primary);
`
import styled from "styled-components";
import { BREAKPOINTS } from "../shared/constants";

export const AppContainer = styled.div`
  height: 100%;
  display: flex;
`

export const BoardSectionWrapper = styled.div`
    height: 100%; 
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    overflow: auto;
    @media screen and (max-width:  ${BREAKPOINTS.mobileLg}px){
        border-radius: 0;
        background-color: var(--color-background-light);
    }
`
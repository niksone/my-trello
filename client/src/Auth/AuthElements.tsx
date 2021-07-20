import styled from "styled-components";
import { BREAKPOINTS } from "../shared/constants";

export const AuthFormContainer = styled.div`
    max-width: 365px;

    @media(max-width: ${BREAKPOINTS.mobileLg}px){
        width: 100%;
    }
`
import styled from "styled-components";
import { BREAKPOINTS } from "../../constants";

export const EditBoardFormContainer = styled.div`
    width: 350px;
    height: 500px;
    background-color: #fff;

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        height: 100%;
        width: 100vw;
    }
`
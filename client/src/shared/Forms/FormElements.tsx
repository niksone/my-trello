import styled from "styled-components"
import { BREAKPOINTS } from "../constants"


export const FormContainer = styled.div`
    width: 100%;
    padding: 0 28px;
    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        padding: 0px 12px;
    }

`

export const FormWrapper= styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
border-radius: 4px;
background-color: var(--color-background-light);

`

export const FormHeaderContainer = styled.div`
    display: flex;
    height: 100px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px var(--color-outline) solid;

    @media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
        height: 85px;
    }
`


export const FormHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const FormContent = styled.div`
/* padding-top: 22px; */
height: 100%;
overflow: auto;
margin: 14px 0;

@media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
    height: 100%;
}
`

export const FormBlockTitle = styled.h4`
font-size: var(--text-h4);
color: var(--color-primary-dark);
line-height: 27px;

@media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
    font-size: var(--text-h5);
    color: var(--color-primary-grey);
    padding-bottom: 12px;

}
`

export const FormTitleContainer = styled.div`
    background-color: #fff;
        padding: 22px 0px 26px 0px;

`

export const FormSubtitleWrapper = styled.p`
font-size: var(--text-regular);
color: var(--color-primary-grey);
`

export const FormTitleWrapper = styled.h3`
font-size: var(--text-h3);
color: var(--color-primary-dark);
line-height: 3.2rem;
@media screen and (max-width: ${BREAKPOINTS.mobileLg}px){

}
`


export const FormDescriptionContainer = styled.div``

export const FormDescription = styled.p`
    font-size: var(--text-regular);
`

export const FormText = styled.p`
    font-size: var(--text-regular);
`

export const FormBlock = styled.div`
    background-color: #fff;
    border-radius: 6px;
    border-bottom: none;
    padding: 16px;
    margin-bottom: 4px;

&:last-child{
    border-bottom: none;
}

@media screen and (max-width: ${BREAKPOINTS.mobileLg}px){
    background-color: #fff;
    border-radius: 6px;
    border-bottom: none;
    padding: 12px 16px;
    margin-bottom: 4px;

    &:first-child {
        padding-top: 12px;
    }
}
`

export const FormButtonsContainer = styled.div`
padding: 18px 28px;
background-color: var(--color-primary-light);
`

export const FormChecklistContainer = styled.div`

`

export const FormChecklistTitle = styled.div`
display: flex;
justify-content: space-between;
padding-bottom: 16px;
`

export const FormChecklistDone = styled.p``

export const FormListItems = styled.div`
/* padding-top: 35px; */

& > * {
    padding: 7px 0;
}
`

export const FormChecklistItemsWrapper = styled.div`
padding-top: 35px;
`

export const FormListItem = styled.div`
display: flex;
align-items: flex-start;
justify-content: space-between;
width: 100%;
color: var(--color-primary-grey);
`

export const FormBoardItem = styled.div`
    display: flex;
    width: 100%;
    color: var(--color-primary-dark);
    font-weight: 700;

    & > *{
        margin-right: 13px;
    }
`

export const FormBoardItemName = styled.div`
    flex-basis: 100%;
`

export const EditIconWrapper = styled.span`
    display: flex;
`

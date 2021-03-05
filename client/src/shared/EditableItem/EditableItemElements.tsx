import styled from "styled-components"

export const EditableItemContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`
export const EditableItemWrapper = styled.div`
    display: flex;
    position: relative;
`

export const EditButton = styled.span`
    position: absolute;
    top: 5px;
    right: 5px;
    height: 20px;
    width: 20px;
    border-radius: 3px;
    display: none;
    background-color: rgb(128, 128, 128);
    cursor: pointer;

    ${EditableItemContainer}:hover & {
        display: block;
    }
`
export const SubmitEditButton = styled.button`
    /* position: absolute;
    bottom: 0;
    left: 0; */
    background-color: green;
`
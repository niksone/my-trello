import styled from "styled-components"

export const CheckboxInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`

export const Checkmark = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    background-color: var(--color-outline);
    border-radius: 4px;
    transition: 0.2s all ease-in-out;


    & > *{
        display: none;
    }
`

export const CheckboxText= styled.p`
    padding-left: 15px;
    font-size: var(--text-regular);
    line-height: 20px;
    font-weight: bold;
    color: var(--color-primary-grey);
    transition: 0.2s all ease-in-out;
    width: fit-content;

`


export const CheckboxContainer = styled.label`
    display: flex;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    user-select: none;

    ${CheckboxInput}:checked ~ ${Checkmark} {
        background-color: var(--color-primary);
    }

    ${CheckboxInput}:checked ~ ${Checkmark} > * {
        display: block;
    }

    ${CheckboxInput}:checked ~ ${CheckboxText} {
        color: var(--color-primary-dark);
    }
`

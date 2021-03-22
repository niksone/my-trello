import styled from "styled-components";


export const FormContainer = styled.form`
    max-width: 365px;
    padding-top: 70px;
    padding-bottom: 115px;
    height: fit-content;

    @media(max-width: 976px){
        width: 325px;
        padding-top: 20px;
        padding-bottom: 40px;
    }
`

export const FormInputsContainer = styled.div`
    padding-bottom: 35px;

    > :not(:last-child){
        padding-bottom: 25px;
    }
`


interface FormErrorProps {
    isError: boolean
}
export const FormError = styled.div<FormErrorProps>`
    display: ${({isError}) => isError ? 'block' : 'none'};
    background-color: var(--color-error);
    color: #fff;
    padding: 15px;
    border-radius: 8px; 
    font-size: var(--text-regular);
    font-weight: bold;
    margin-bottom: 20px;
    animation: appear-fade 0.5s ease-in-out;

    @keyframes appear-fade{
        0%{
            transform: translateY(100%);
            opacity: 0;
        }

        100%{
            transform: translateY(0);
            opacity: 1;
        }
    }
`
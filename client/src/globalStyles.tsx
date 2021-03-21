import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
        font-size: 62.5%;
    }

    #root{
        --color-primary: #5E81F4;
        --color-primary-dark: #1C1D21;
        --color-primary-grey: #8181A5;
        --color-primary-light: rgba(94, 129, 244, 0.1);
        --color-outline: #F0F0F3;

        --color-button-hover: #475EAB;
        --color-button-outline-resting: #ECECF2;

        --color-background: #F6F6F6;
        

        --text-h1: 3.2rem;
        --text-h2: 2.6rem;
        --text-h3: 2rem;
        --text-h4: 1.8rem;
        --text-h5: 1.6rem;

        --text-caption: 1.4rem;
        --text-regular: 1.4rem;


    }
`
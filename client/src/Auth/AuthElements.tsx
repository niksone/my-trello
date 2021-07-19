import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const AuthContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    overflow: hidden;
`

export const AuthForm = styled.form`
    width: 400px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 3px;
`

export const AuthFormTitle = styled.legend`
    text-align: center;
    font-size: 3rem;
    margin-bottom: 10px;
`

export const AuthFormInput = styled.input`
    padding: 5px 10px;
    margin-bottom: 10px;
`

export const AuthFormButton = styled.button`
    border: none;
    outline: none;
    background-color: #02b602;
    padding: 5px 10px;
    color: #fff;
`

export const AuthFormLink = styled(Link)`
    
`
import { useState } from 'react';
import * as Yup from 'yup'
import { authApi } from '../api';
import { RegisterState } from './RegisterPage';

type SchemaMessagesFields = {
    empty: string
    wrongValues: string
    values: string[]
    fieldName: string
}
interface SchemaMessagesI {
    [key: string]: SchemaMessagesFields
}

const schemaMessages: SchemaMessagesI = {
    email: {
        empty: 'Please Enter your email',
        wrongValues: 'Field should be valid email',
        values: ['Please Enter your email', 'Field should be valid email'],
        fieldName: ''
    },
    password: {
        empty: 'Please Enter your password',
        wrongValues: `Password Must Contain 8 Characters, One Uppercase, 
            One Lowercase, One Number and one special case Character`,
        values: [
            'Please Enter your password',
            `Password Must Contain 8 Characters, One Uppercase, 
            One Lowercase, One Number and one special case Character`
        ],
        fieldName: ''
    },
    confirmedPassword: {
        empty: 'Passwords does not match',
        wrongValues: 'Passwords does not match',
        values: ['Passwords does not match'],
        fieldName: ''
    }
}


const schema = Yup.object().shape({
    confirmedPassword: Yup.string().required(schemaMessages.confirmedPassword.empty).oneOf([Yup.ref('password')], schemaMessages.confirmedPassword.wrongValues),
    password: Yup
        .string()
        .required(schemaMessages.password.empty)
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        schemaMessages.password.wrongValues
    ),
    email: Yup.string().required(schemaMessages.email.empty).email(schemaMessages.email.wrongValues),

})

const checkUserExist = async (email: string, password: string) => {
    try {
        const checkUserExist = await authApi.checkUserExist(email, password)
        console.log(checkUserExist.data, 'user exist');
        return checkUserExist.data 
                ? {userExist: true, error: 'User Already Exist'}
                : {userExist: false, error: ''}
    } catch (error) {
        return {userExist: false, error: error}
    }
}

export const useRegisterValidation = () => {
    const [validation, setValidation] = useState({
        isValid: false,
        error: {
            value: '',
            fieldName: ''
        }
    })


    // let validation = {
    //     isValid: false,
    //     error: {
    //         value: '',
    //         fieldName: ''
    //     }
    // }
    
    const checkValid = async ({email, password, confirmedPassword, error}: RegisterState) => {
        schemaMessages.email.fieldName = email.fieldName
        schemaMessages.password.fieldName = password.fieldName
        schemaMessages.confirmedPassword.fieldName = confirmedPassword.fieldName

        try {
            const res = schema
                .validateSync({
                    email: email.value, 
                    password: password.value, 
                    confirmedPassword: confirmedPassword.value})
            const {userExist, error} = await checkUserExist(email.value, password.value)
            console.log(userExist, 'user Exist final');
        
        const result = !userExist 
            ? {...validation, isValid: true} 
            : {isValid: false, error: {value: 'User Already Exist', fieldName: email.fieldName}}
            
        setValidation( prev => result)
        console.log(validation, 'validation')
        return result
        // return validation
        } catch (error) {
            const res = error.errors
            console.log(res)

            const result = {
                isValid: false, 
                error: {
                    value: res,
                    fieldName: findFieldByError(res[0])
                }
            }

            setValidation(prev => result)
            return result
        }
    }

    return {validation, checkValid}
}

const findFieldByError = (error: string) => {
    console.log(error);
    for(const [field, value] of Object.entries(schemaMessages)){
        if(value.values.includes(error)){
            console.log(value.fieldName);
            return value.fieldName
        } 
    }
    return ''
}
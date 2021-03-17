import axios from 'axios';
import { useState } from 'react';
import * as Yup from 'yup'

const schema = Yup.object().shape({
    password: Yup
        .string()
        .required('Please Enter your password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmedPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords does not match'),
    email: Yup.string().email(),

})

const checkUserExist = async (email: string, password: string) => {
    return axios({
        method: 'GET',
        data: {email, password},
        withCredentials: true,
        url: '/checkUserExist'
    })
        .then((res) => {
            return res.data 
                ? {userExist: true, error: 'User Already Exist'}
                : {userExist: false, error: ''}
            })
        .catch(err => {
            return {userExist: false, error: err}
        })
}

export const useRegisterValidation = () => {
    const [validation, setValidation] = useState({
        isValid: false,
        errors: ''
    })

    const checkValid = async (email: string, password: string, confirmedPassword: string) => {
        try {
            const res = schema
                .validateSync({email, password, confirmedPassword})
            const {userExist, error} = await checkUserExist(email, password)
            setValidation({isValid: !userExist, errors: error})    
        return validation
        } catch (error) {
            const res = error.errors
            console.log(res)
            setValidation({isValid: false, errors: res})
            return validation
        }
    }

    return {validation, checkValid}
}
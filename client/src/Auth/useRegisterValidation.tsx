import axios from 'axios';
import { useState } from 'react';
import * as Yup from 'yup'

const schema = Yup.object().shape({
    password: Yup
        .string()
        .required('Please Enter your password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmedPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords does not match')
   , email: Yup.string().email(),

})

const register = async (email: string, password: string) => {
    return axios({
        method: 'POST',
        data: {email, password},
        withCredentials: true,
        url: '/register'
    })
        .then((res) => {
            return {success: true, error: ''}
            })
        .catch(err => {
            console.log(err.response.data.message);
            return {success: false, error: err.response.data.message}
        })
}

export const useRegisterValidation = () => {
    const [validation, setValidation] = useState({
        isValid: false,
        errors: []
    })

    const checkValid = async (email: string, password: string, confirmedPassword: string) => {
        try {
            const res = schema
            .validateSync({email, password, confirmedPassword})
            const {success, error} = await register(email, password)
            setValidation({isValid: success, errors: error})
                // : setValidation({isValid: success, errors: })
    
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
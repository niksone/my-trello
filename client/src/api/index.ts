import axios from "axios";

export const instance = axios.create({
    withCredentials: true
})

export * from './auth'
export * from './board'
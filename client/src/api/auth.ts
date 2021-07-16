import { instance } from ".";

export const authApi = {
    async login (email: string, password: string) {
        const login = await instance.post('/login', {email, password})
        return login
    },

    async register(email: string, password: string) {
        const register = await instance.post('/register', {email, password})
        return register
    },

    async logout() {
        await instance.post('/logout')
    },
    
    async checkUserExist(email: string, password: string) {
        const checkUserExist = instance.post('/checkUserExist', {email, password})
        return checkUserExist;
    },

    async isAuth() {
        const req = await instance.get('/isAuth')
        const isAuth: boolean = req.data
        return isAuth
    },

    async getUser() {
        const session = await instance.get('/user')
        const user = session.data.passport.user
        return user
    }

}
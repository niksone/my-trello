import mongoose from 'mongoose'

export interface User {
    username: string,
    password: string
}

const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String
})

export default mongoose.model('User', user)
import { UserI } from 'Interfaces/UserInterface'
import mongoose from 'mongoose'


const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    boardIds: [String]
})

export default mongoose.model<UserI>('User', user)
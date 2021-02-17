import mongoose from 'mongoose'


const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String
})

export default mongoose.model('User', user)
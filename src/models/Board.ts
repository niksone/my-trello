import mongoose from "mongoose";


const task = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    text: {type: String},
})

const list = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    title: {type: String},
    tasks: [task]
})

const board = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: {type: String},
    lists: [list]
})

export default mongoose.model('Board', board)
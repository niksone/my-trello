import {BoardI} from '../Interfaces/BoardInteface';
import mongoose from "mongoose";

const task = new mongoose.Schema({
    text: {type: String},
    completed: {type: Boolean}
})

const card = new mongoose.Schema({
    title: {type: String},
    subtitle: {type: String},
    description: {type: String},
    tasks: [task]
})

const list = new mongoose.Schema({
    title: {type: String},
    cards: [card]
})

const board = new mongoose.Schema({
    name: {type: String},
    lists: [list]
})

export default mongoose.model<BoardI>('Board', board)
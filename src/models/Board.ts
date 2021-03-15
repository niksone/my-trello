import {BoardI} from '../Interfaces/BoardInteface';
import mongoose from "mongoose";

const task = new mongoose.Schema({
    text: {type: String},
})

const list = new mongoose.Schema({
    title: {type: String},
    tasks: [task]
})

const board = new mongoose.Schema({
    name: {type: String},
    lists: [list]
})

export default mongoose.model<BoardI>('Board', board)
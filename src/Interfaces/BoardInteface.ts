import mongoose, { ObjectId } from "mongoose";

interface Task {
    _id?: ObjectId,
    text: string
}

interface List{
    _id?: ObjectId,
    title: string,
    tasks: Task[]
}

export interface BoardI extends mongoose.Document {
    name: string,
    lists: List[]
}
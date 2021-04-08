import mongoose, { ObjectId } from "mongoose";

interface Task {
    _id?: ObjectId,
    text: string,
    completed: boolean
}

interface Card {
    _id?: ObjectId,
    title: string, 
    subtitle: string,
    description: string,
    tasks: Task[]
}

interface List{
    _id?: ObjectId,
    title: string,
    cards: Card[]
}

export interface BoardI extends mongoose.Document {
    name: string,
    lists: List[]
}
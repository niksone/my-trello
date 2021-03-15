import mongoose from 'mongoose'

export interface UserI extends mongoose.Document{
    username: string
    password: string
    boardIds: string[]
}
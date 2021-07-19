import { UserI } from "../Interfaces/UserInterface"
import User from "../models/User"

export const findUserById = async (userId: string) => {
    const user = await User.findById(userId, (err: Error, user: UserI) => {
        if(err) throw err
        if(!user) throw new Error('User Not Found')
        else user
    })

    return user
}
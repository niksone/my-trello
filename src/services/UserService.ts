import { NextFunction } from "express";
import { UserI } from "../Interfaces/UserInterface";
import User from "../models/User";
import passport from "passport";
const bcrypt = require('bcryptjs')

class UserService {

    async login(next: NextFunction) {
        return passport.authenticate('local', (err: Error, user: UserI) => {
            if(err) next(err)  
            !user
                ? false
                : user
        })
    }

    async checkUserExist (email: string) {
        const user = User.findOne({email}, async (err: Error, user:  UserI) => {
            if(err) throw err
            if(!user) false
            if(user) user
        })
        return user
    }

    async registerUser (email, password) {
        const user = await this.checkUserExist(email)
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                email,
                password: hashedPassword,
                boardIds: []
            })
            await newUser.save()
            return newUser
        }else{
            throw new Error('User Already Exist')
        }
    }
}

export default new UserService()

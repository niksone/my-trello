const passport = require('passport')
const passportConfig = require('../passportConfig')
import { NextFunction, Request, Response } from "express"
import User from "../models/User";
const bcrypt = require('bcryptjs')
import { UserI } from '../Interfaces/UserInterface';

declare module 'express-session' {
    export interface SessionData {
      data: {passport: {user: string}};
    }
  }

class UserController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            passport.authenticate('local', (err: Error, user: UserI, info: any) => {
                if( err) next(err)  
                !user
                    ? res.status(500).json({message: 'No user'})
                    : req.logIn(user, (err: Error) => {
                        if(err) next(err)
                        req.session.save(err => {
                            // console.log(req.session)
                            res.send(user)
                        })
                    })
            })(req, res, next)
        } catch (error) {
            console.log(error)
        }
    }

    async register (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req?.body;
    
            if(!email || !password || typeof email !== 'string' || typeof password !== 'string'){
                res.status(500).send('Wrong values')
                return
            }
        
            User.findOne({email}, async (err: Error, user:  UserI) => {
                if(err) throw err
                if(user) res.status(500).send({message: 'User already exist'})
                if(!user){
                    const hashedPassword = await bcrypt.hash(password, 10)
                    const newUser = new User({
                        email,
                        password: hashedPassword,
                        boardIds: []
                    })
        
                    await newUser.save()
                    req.logIn(newUser, (err: Error) => {
                        if(err) next(err)
                        req.session.save(err => {
                            console.log(req.session)
                            res.redirect('/user')
                        })
                    })
                }          
            })
        } catch (error) {
            console.log(error)
        }
    }

    async checkUserExist(req: Request, res: Response) {
        try {
            const {email, password} = req?.body;

            User.findOne({email}, async (err: Error, user:  UserI) => {
                if(err) throw err
                if(user) res.send(true)
                if(!user){
                    res.send(false)
                }      
            })
        } catch (error) {
            console.log(error)
        }
    }

    async logout (req: Request, res: Response) {
        try {
            req.logout()
            res.send({message: 'log out'})
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            res.send(req.session)
        } catch (error) {
            console.log(error)
        }
    }

    async isAuth(req: Request, res: Response) {
        try {
            res.send(req.isAuthenticated())
        } catch (error) {
            console.log(error)
        }
        // console.log(req.isAuthenticated(), 'auth')
    }
}

export default new UserController()
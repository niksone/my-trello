const passport = require('passport')
const passportConfig = require('../passportConfig')
import { NextFunction, Request, Response } from "express"
import User from "../models/User";
const bcrypt = require('bcryptjs')
import { UserI } from '../Interfaces/UserInterface';


class UserController {
    async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', (err: Error, user: UserI, info: any) => {
            if( err) next(err)  
            !user
                ? res.status(500).json({message: 'No user'})
                : req.logIn(user, (err: Error) => {
                    if(err) next(err)
                    req.session.save(err => {
                        console.log(req.session)
                        res.send(user)
                    })
                })
        })(req, res, next)
    }

    async register (req: Request, res: Response, next: NextFunction) {
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
                    password: hashedPassword
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
    }

    async checkUserExist(req: Request, res: Response) {
        const {email, password} = req?.body;

        User.findOne({email}, async (err: Error, user:  UserI) => {
            if(err) throw err
            if(user) res.send(true)
            if(!user){
                res.send(false)
            }      
        })
    }

    async logout (req: Request, res: Response) {
        req.logout()
        res.send('log out')
    }

    async getUser(req: Request, res: Response) {
        res.send(req.session)
    }

    async isAuth(req: Request, res: Response) {
        console.log(req.isAuthenticated(), 'auth')
        res.send(req.isAuthenticated())
    }
}

export default new UserController()
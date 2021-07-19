const passport = require('passport')
import { NextFunction, Request, Response } from "express"
import { UserI } from '../Interfaces/UserInterface';
import UserService from "../services/UserService";

declare module 'express-session' {
    export interface SessionData {
      data: {passport: {user: string}};
    }
  }

class UserController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            passport.authenticate('local', (err: Error, user: UserI) => {
                if( err) next(err)  
                !user
                    ? res.status(500).json({message: 'No user'})
                    : req.logIn(user, (err: Error) => {
                        if(err) next(err)
                        req.session.save(err => {
                            res.send(user)
                        })
                    })
            })(req, res, next)
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})   
        }
    }

    async register (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req?.body;
    
            if(!email || !password || typeof email !== 'string' || typeof password !== 'string'){
                return res.status(500).send({message: 'Wrong values'})
            }
            else{
                const user = await UserService.registerUser(email, password)
                if(user){
                    return req.logIn(user, (err: Error) => {
                        if(err) next(err)
                        return req.session.save(err => {
                            res.redirect('/user')
                        })
                    })
                }
                return user
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async checkUserExist(req: Request, res: Response) {
        try {
            const {email} = req?.body;
                
            if(!email || typeof email !== 'string'){
                return res.status(500).send({message: 'Wrong values'})
            }
            else{
                const user = await UserService.checkUserExist(email)
                return res.send(!!user)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({message: error.message})
        }
    }

    async logout (req: Request, res: Response) {
        try {
            req.logout()
            res.send({message: 'log out'})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            res.send(req.session)
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async isAuth(req: Request, res: Response) {
        try {
            res.send(req.isAuthenticated())
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }
}

export default new UserController()
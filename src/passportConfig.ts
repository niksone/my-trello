import { PassportStatic } from "passport"
import { VerifyFunction } from "passport-local"
import { UserI } from "./Interfaces/UserInterface"
import User from "./models/User"
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = (passport: PassportStatic) => {
    const authenticateUser: VerifyFunction = (email, password, done) => {
        User.findOne({email: email}, (err: Error, user: UserI) => {
            console.log('user-------------------');
            console.log(user);
            if(err) done(err)
            if(!user) return done(null, false, {message: 'wrong values'})
            bcrypt.compare(password, user.password, (err: Error, result: Boolean) => {
                if(err) done(err);
                console.log(result)
                if(result) {
                    return done(null, user)
                } else{
                    done(null, false)
                }
            })
        })
        
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user: UserI, cb: any) => {
        cb(null, user.id)
    })
    

    passport.deserializeUser((id: string, cb: any) => {
        User.findById(id, (err: Error, user: UserI) => {
            cb(err, user)
        })
    })
}


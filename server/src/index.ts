const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

import { Request, Response } from "express"

import User from "./User"

const LocalStrategy = passportLocal.Strategy

const app = express()

const link = 'mongodb+srv://niksone-ts:test1234@cluster0.cr0ko.mongodb.net/my-trello?retryWrites=true&w=majority'
mongoose.connect(link, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true   
}, (error: Error) => {
    if(error){
        console.log(error)
        throw error
    } 
    console.log('connect to mongodb')
})
// app.use('/login', (req, res) => {
//     res.send({
//         token: 'test'
//     })
// })

app.use(cors({origin: 'http://localhost:3000', credential: true}))
app.use(express.json())
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// Passport


// Routes

app.post('/register', async (req: Request, res: Response) => {
    const {username, password} = req?.body;

    if(!username || !password || typeof username !== 'string' || typeof username !== 'string'){
        res.send('Wrong values')
        return
    }

    User.findOne({username}, async (err: Error, user: typeof User) => {
        if(err) throw err
        if(user) res.send('User already exist')
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                password: hashedPassword
            })
        
            await newUser.save()
            res.send(newUser)        
        }
    })

})
app.listen(5050, () => console.log('app is running'))
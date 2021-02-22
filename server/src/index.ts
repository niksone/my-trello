import { UserI } from './Interfaces/UserInterface';
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocal = require('passport-local')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cookieSession = require('cookie-session')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const passportConfig = require('./passportConfig')
const MongoStore = require('connect-mongo').default
import { NextFunction, Request, Response } from "express"
import User from "./User"

const PORT = process.env.PORT || 5000

const app = express()

app.set('trust proxy', 1)

const whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://wizardly-roentgen-09e599.netlify.app', 
    'https://nikita-trello.herokuapp.com'
]

const link = 'mongodb+srv://niksone-ts:test1234@cluster0.cr0ko.mongodb.net/my-trello?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI || link, {
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

app.use(cors({origin: whitelist, credentials: true}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'secretcode',
    name: 'user',
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 24 * 60 * 60,
    store: MongoStore.create({mongoUrl: link})
}))
// app.use(cookieParser('secretcode'))

app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)
// require('./passportConfig.ts')(passport)
// Passport


// Routes

app.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: UserI, info: any) => {
        if( err) next(err)  
        !user
            ? res.send('No user')
            : req.logIn(user, (err: Error) => {
                if(err) next(err)
                res.send(user)
            })
    })(req, res, next)
})

app.post('/register', async (req: Request, res: Response) => {
    const {email, password} = req?.body;

    if(!email || !password || typeof email !== 'string' || typeof password !== 'string'){
        res.send('Wrong values')
        return
    }

    User.findOne({email}, async (err: Error, user:  UserI) => {
        if(err) throw err
        if(user) res.send('User already exist')
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                email,
                password: hashedPassword
            })
        
            await newUser.save()
            res.send(newUser)        
        }
    })

})

app.get('/user', (req: Request, res: Response) => {
    console.log(req.user, '=/user')
    res.send(req.session)
})



// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log('------------', req.user)
//     next()
// })

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('../../client/build/'))
// }

// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('../../client/build')  
// })

app.listen(PORT, () => console.log(`app is running on ${PORT}`))
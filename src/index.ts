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
const path = require("path")
const MongoStore = require('connect-mongo').default
import { NextFunction, Request, Response } from "express"
import User from "./models/User"
import userRouter from './routes/userRoute';

const PORT = process.env.PORT || 5000

const app = express()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client")))
}else{
    app.use(cors({url: 'http://localhost:3000', credentials: true}))
}
app.set('trust proxy', 1)

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

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'secretcode',
    name: 'user',
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 24 * 60 * 60,
    store: MongoStore.create({mongoUrl: link}),
    cookie: {
        // secure: true
    }
}))
// app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use('', userRouter)
// require('./passportConfig.ts')(passport)
// Passport

// app.use()


// Routes

if(process.env.NODE_ENV === 'production')
    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "client", "index.html"));
    });


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
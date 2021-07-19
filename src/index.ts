const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportConfig = require('./passportConfig')
const path = require("path")

import MongoStore from 'connect-mongo'
import { Request, Response } from "express"
import userRouter from './routes/userRoute';
import boardRouter from './routes/boardRoute';

const dotenv = require('dotenv').config()

const PORT = process.env.PORT

const app = express()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "client")))
}else{
    app.use(cors({url: 'http://localhost:3000', credentials: true}))
}
app.set('trust proxy', 1)

const link = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cr0ko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(link, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true   
}, (error: Error) => {
    try { 
        if(error){
            throw error
        }
        console.log('connect to mongodb')
    } catch (error) {
        console.log(error)
    }
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

app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)

app.use('', userRouter)
app.use('', boardRouter)

if(process.env.NODE_ENV === 'production')
    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "client", "index.html"));
    });

app.listen(PORT, () => console.log(`app is running on ${PORT}`))
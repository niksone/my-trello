import UserController from "../controllers/UserController"

const Router = require('express').Router

const userRouter = new Router()

userRouter.get('/isAuth', UserController.isAuth)

userRouter.get('/user', UserController.getUser)

userRouter.post('/logout',UserController.logout)

userRouter.post('/login', UserController.login)

userRouter.post('/register', UserController.register)   

export default userRouter
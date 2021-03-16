import BoardController from "../controllers/BoardController"

const Router = require('express').Router

const boardRouter = new Router()

boardRouter.post('/getBoards', BoardController.getUserBoards)

boardRouter.post('/boards', BoardController.addBoard)

boardRouter.post('/boards/addList', BoardController.addList)

boardRouter.patch('/boards/updateListTitle', BoardController.updateListTitle)

boardRouter.patch('/boards/moveList', BoardController.moveList)

boardRouter.delete('/boards/removeList', BoardController.removeList)

boardRouter.post('/boards/addTask', BoardController.addTask)

boardRouter.delete('/boards/removeTask', BoardController.removeTask)

boardRouter.patch('/boards/updateTaskTitle', BoardController.updateTaskText)

boardRouter.patch('/boards/moveTask', BoardController.moveTask)



export default boardRouter
import BoardController from "../controllers/BoardController"

const Router = require('express').Router

const boardRouter = new Router()

boardRouter.post('/getBoards', BoardController.getUserBoards)

boardRouter.post('/boards', BoardController.addBoard)

boardRouter.post('/boards/addList', BoardController.addList)

boardRouter.patch('/boards/updateListTitle', BoardController.updateListTitle)

boardRouter.patch('/boards/moveList', BoardController.moveList)

boardRouter.delete('/boards/removeList', BoardController.removeList)

boardRouter.post('/boards/addCard', BoardController.addCard)

boardRouter.delete('/boards/removeCard', BoardController.removeCard)

boardRouter.patch('/boards/updateCard', BoardController.updateCard)

boardRouter.patch('/boards/moveCard', BoardController.moveCard)



export default boardRouter
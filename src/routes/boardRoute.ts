import BoardController from "../controllers/BoardController"

const Router = require('express').Router

const boardRouter = new Router()

boardRouter.get('/boards', BoardController.getUserBoards)

boardRouter.post('/boards', BoardController.addBoard)

boardRouter.delete('/boards', BoardController.deleteBoard)

boardRouter.patch('/boards', BoardController.editBoardName)

boardRouter.post('/boards/lists', BoardController.addList)

boardRouter.delete('/boards/list', BoardController.removeList)

boardRouter.patch('/boards/list/title', BoardController.updateListTitle)

boardRouter.patch('/boards/moveList', BoardController.moveList)

boardRouter.post('/boards/card', BoardController.addCard)

boardRouter.delete('/boards/card', BoardController.removeCard)

boardRouter.patch('/boards/card', BoardController.updateCard)

boardRouter.patch('/boards/moveCard', BoardController.moveCard)



export default boardRouter
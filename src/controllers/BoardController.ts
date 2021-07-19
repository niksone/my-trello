import  { Request, Response } from "express";
import BoardServices from '../services/BoardServices';

class BoardController {
    async getUserBoards(req: Request, res: Response) {
        try {
            const {userId} = req?.query
            if(!userId) {
                res.status(500).send({message: 'Wrong values'})
                return 
            }
            else{
                const boards = await BoardServices.getUserBoards(userId as string)
                res.send(boards)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async addBoard(req: Request, res: Response){
        try {
            const {userId, boardName} = req.body
            if(!userId || !boardName) res.send({message: 'Wrong values'})
            else{
                const board = await BoardServices.addBoard(userId, boardName)
                res.send(board)
            }
        } catch (error) {  
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async addList(req: Request, res: Response){
        try {
            const {boardId, list} = req.body
            if(!boardId || !list) res.status(500).send({message: 'Wrong values'})
            else{
                const addedList = await BoardServices.addList(boardId, list)
                res.send(addedList)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }     
    }

    async removeList(req: Request, res: Response){
        try {
            const {boardId, listId} = req.body
            if(!boardId || !listId) res.send({message: 'Wrong values'})
            else{
                const board = await BoardServices.removeList(boardId, listId)
                res.send(board)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async updateListTitle(req: Request, res: Response) {
        try {
            const {boardId, listId, title} = req.body
            if(!boardId || !listId || !title) res.status(500).send({message: 'Wrong values'})
            else{
                const list = await BoardServices.updateListTitle(boardId, listId, title)
                res.send(list)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})

        }
    }

    async moveList(req: Request, res: Response){
        try {
            const {boardId, sourceIndex, destinationIndex} = req.body
            if(!boardId || sourceIndex === null || !destinationIndex === null)  res.status(500).send({message: 'Wrong values'})
            else{
                const board = await BoardServices.moveList(boardId, sourceIndex, destinationIndex)
                res.send(board)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})

        }
    }

    async addCard(req: Request, res: Response){
        try {
            const {boardId, listId, card} = req.body
            if(!boardId || !listId || !card) res.status(500).send({message: 'Wrong values'})
            else{
                const addedCard = await BoardServices.addCard(boardId, listId, card)
                res.send(addedCard)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }   
    }

    async removeCard(req: Request, res: Response) {
        try {
            const {boardId, listId, cardId} = req.body
            if(!boardId || !listId || !cardId) res.status(500).send({message: 'Wrong values'})
            else{
                const list = await BoardServices.removeCard(boardId, listId, cardId)
                res.send(list)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async deleteBoard(req: Request, res: Response) {
        try {
            const {userId, boardId} = req.body
            if(!userId || !boardId) res.status(500).send({message: 'Wrong values'})
            else{
                const board = await BoardServices.deleteBoard(userId, boardId)
                res.send(board)

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})

        }
    }

    async editBoardName(req: Request, res: Response) {
        try {
            const {boardId, boardName} = req.body
            if(!boardId || !boardName) res.status(500).send({message: 'Wrong values'})
            else{
                const board = await BoardServices.editBoardName(boardId, boardName)
                res.send(board)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async updateCard(req: Request, res: Response) {
        try {
            const {boardId, listId, cardId, card} = req.body
            if(!boardId || !listId || !cardId || !card) res.status(500).send({message: 'Wrong values'})
            else{
                const updatedCard = await BoardServices.updateCard(boardId, listId, cardId, card)
                res.send(updatedCard)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }

    async moveCard(req: Request, res: Response){
        try {
            const {boardId, sourceListIndex, destListIndex, sourceCardIndex, destCardIndex} = req.body
            if(!boardId || sourceListIndex === null || !destListIndex === null
                || sourceCardIndex === null || destCardIndex === null
            )  res.status(500).send({message: 'Wrong values'})
            else{
                const board = await BoardServices.moveCard(boardId, sourceListIndex, destListIndex, sourceCardIndex, destCardIndex)
                res.send(board)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    }



}

export default new BoardController()
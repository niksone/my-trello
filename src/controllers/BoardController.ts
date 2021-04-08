import { BoardI } from './../Interfaces/BoardInteface';
import e, { Request, Response } from "express";
import { UserI } from "Interfaces/UserInterface";
import User from "../models/User";
import { Error } from "mongoose";
import Board from '../models/Board';

class BoardController {
    async getUserBoards(req: Request, res: Response) {
        try {
            const {userId} = req?.body
            // console.log(req.body, 'body')
            if(!userId) {
                res.send({message: 'Wrong values'})
                return 
            }
            // console.log(userId, 'userId')
            await User.findById(userId, async (err: Error, user: UserI) => {
                if(err) res.send(err)
                if(!user) res.send({message: 'no user found'})
                else{
                    // console.log(user, user.boardIds, 'boards')
                    const boards = await Board.find({'_id': { $in: 
                        user.boardIds    
                    }})
                    // console.log(boards)
                    res.send(boards)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async addBoard(req: Request, res: Response){
        try {
            const {userId, boardName} = req.body
            if(!userId || !boardName) res.send({message: 'Wrong values'})
            console.log(req.body)
            await User.findById(userId, (err: Error, user: UserI) => {
                if(err) throw err
                if(!user) res.status(500).send({message: 'No user found'})
                const newBoard = new Board({
                    name: boardName,
                    lists: []
                })      
                newBoard.save()

                user.boardIds.push(newBoard._id)
                user.save()

                res.send(newBoard)
            })
        } catch (error) {  
            console.log(error)
        }
    }

    async addList(req: Request, res: Response){
        try {
            const {boardId, list} = req.body
            if(!boardId || !list) res.status(500).send({message: 'Wrong values'})
    
            await Board.findById(boardId, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) res.status(500).send({message: 'Board not found'})
                board.lists.push(list)
                board.save()
                console.log(board.lists, 'list initial ----------')
                // const list = board.lists[board.lists.length - 1]
                console.log(list, board.lists, '-----------list-------')
                res.send(list)
            })   
        } catch (error) {
            console.log(error)
        }     
    }

    async removeList(req: Request, res: Response){
        try {
            const {boardId, listId} = req.body
            if(!boardId || !listId) res.send({message: 'Wrong values'})
    
            await Board.findById(boardId, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) res.status(500).send({message: 'Board not found'})
    
                const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                console.log(listIndex)
                if(listIndex < 0){
                    res.status(500).send({message: 'List didn`t found'})
                }else{
                    board.lists.splice(listIndex, 1)
                    board.save()
                    res.send(board)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async updateListTitle(req: Request, res: Response) {
        try {
            const {boardId, listId, title} = req.body
            console.log(req.body)
            if(!boardId || !listId || !title) res.status(500).send({message: 'Wrong values'})
            
            console.log(boardId, listId, title)
            await Board.findById(boardId, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) {res.status(500).send({message: 'Board with that id not found'})}
                else{
                    const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                    if(listIndex < 0) {res.status(500).send({message: 'Wrong list Id'})}
                    else{
                        board.lists[listIndex].title = title
                        board.save()
                        res.send(board.lists[listIndex])
                    }   
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async moveList(req: Request, res: Response){
        try {
            const {boardId, sourceIndex, destinationIndex} = req.body
            console.log(req.body)
            if(!boardId || sourceIndex === null || !destinationIndex === null)  res.status(500).send({message: 'Wrong values'})
            else{
                await Board.findById(boardId, (err: Error, board: BoardI) => {
                    if(err) throw err
                    if(!board) {res.status(500).send({message: 'Board with that id not found'})}
                    else{
                        console.log(board.lists, '----------initial lists---------')
                        const list = board.lists.splice(sourceIndex, 1)[0]
                        board.lists.splice(destinationIndex, 0, list)
                        console.log(board.lists, '----------final lists---------')
                        board.save()
                        res.send(board)
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateList(){

    }

    async addCard(req: Request, res: Response){
        try {
            const {boardId, listId, card} = req.body
            if(!boardId || !listId || !card) res.status(500).send({message: 'Wrong values'})
    
            await Board.findById(boardId, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) res.status(500).send({message: 'Board not found'})
                const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                if(listIndex < 0){
                    res.status(500).send({message: 'List didn`t found'})
                }else{
                    board.lists[listIndex].cards.push(card)
                    board.save()
                    res.send(card)
                }
            })  
        } catch (error) {
            console.log(error)
        }   
    }

    async removeCard(req: Request, res: Response) {
        try {
            const {boardId, listId, cardId} = req.body
            if(!boardId || !listId || !cardId) res.status(500).send({message: 'Wrong values'})
    
            await Board.findById(boardId, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) res.status(500).send({message: 'Board not found'})
    
                const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                const cardIndex = board.lists[listIndex].cards.findIndex(card => String(card._id) === cardId)
    
                console.log(listIndex, cardIndex)
                if(listIndex < 0 || cardIndex < 0){
                    res.status(500).send({message: 'List or card didn`t found'})
                }else{
                    board.lists[listIndex].cards.splice(cardIndex, 1)
                    board.save()
                    res.send(board.lists[listIndex])
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // async updateTaskText(req: Request, res: Response) {
    //     try {
    //         const {boardId, listId, taskId, text} = req.body
    //         if(!boardId || !listId || ! taskId || !text) res.status(500).send({message: 'Wrong values'})
            
    //         console.log(boardId, listId, taskId, text)
    //         await Board.findById(boardId, (err: Error, board: BoardI) => {
    //             if(err) throw err
    //             if(!board) {res.status(500).send({message: 'Board with that id not found'})}
    //             else{
    //                 const listIndex = board.lists.findIndex(list => String(list._id) === listId)
    //                 if(listIndex < 0) {res.status(500).send({message: 'Wrong list Id'})}
    //                 else{
    //                     const taskIndex = board.lists[listIndex].tasks.findIndex(task => String(task._id) === taskId)
    //                     board.lists[listIndex].tasks[taskIndex].text = text
    //                     board.save()
    //                     res.send(board.lists[listIndex].tasks[taskIndex])
    //                 }   
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    async updateCard(req: Request, res: Response) {
        try {
            const {boardId, listId, cardId, card} = req.body
            if(!boardId || !listId || !cardId || !card) res.status(500).send({message: 'Wrong values'})
            
            console.log(boardId, listId, cardId, card)
            await Board.findById(boardId, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) {res.status(500).send({message: 'Board with that id not found'})}
                else{
                    const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                    if(listIndex < 0) {res.status(500).send({message: 'Wrong list Id'})}
                    else{
                        const cardIndex = board.lists[listIndex].cards.findIndex(card => String(card._id) === cardId)
                        board.lists[listIndex].cards[cardIndex] = card
                        board.save()
                        res.send(board.lists[listIndex].cards[cardIndex])
                    }   
                }
            })
        
        } catch (error) {
            console.log(error)
        }
    }

    async moveCard(req: Request, res: Response){
        try {
            const {boardId, sourceListIndex, destListIndex, sourceCardIndex, destCardIndex} = req.body
            console.log(req.body)
            if(!boardId || sourceListIndex === null || !destListIndex === null
                || sourceCardIndex === null || destCardIndex === null
            )  res.status(500).send({message: 'Wrong values'})
            else{
                await Board.findById(boardId, (err: Error, board: BoardI) => {
                    if(err) throw err
                    if(!board) {res.status(500).send({message: 'Board with that id not found'})}
                    else{
                        console.log(board.lists, '----------final lists---------')
                        const card = board.lists[sourceListIndex].cards.splice(sourceCardIndex, 1)[0]
                        board.lists[destListIndex].cards.splice(destCardIndex, 0, card)
                        console.log(board.lists, '----------final lists---------')
                        board.save()
                        res.send(board)
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }



}

export default new BoardController()
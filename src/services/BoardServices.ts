import Board from '../models/Board';
import { BoardI, List, Card} from '../Interfaces/BoardInteface';
import { findUserById } from '../utils/findUserById';

class BoardService{
    async getUserBoards(userId: string) {
        const user = await findUserById(userId)

        if(user){
            const boards = await Board.find({'_id': { $in: 
                user.boardIds    
            }})

            return boards
        }

        return null
    }

    async addBoard(userId: string, boardName: string){
        const user = await findUserById(userId)

        if(user){
            const board = new Board({
                name: boardName,
                lists: []
            })   
            board.save()
            user.boardIds.push(board._id)
            user.save()

            return board
        }

        return null
    }

    async addList(boardId: string, list: List){
        const addedList = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board not found')
            board.lists.push(list)
            board.save()
        })   

        return addedList
            
    }

    async removeList(boardId:string, listId: string){
        const board = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board not found')

            const listIndex = board.lists.findIndex(list => String(list._id) === listId)
            if(listIndex < 0){
                throw new Error('List didn`t found')
            }else{
                board.lists.splice(listIndex, 1)
                board.save()
                return board
            }
        })

        return board
    }

    async updateListTitle(boardId: string, listId: string, title: string) {
        const list = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board with that id not found')
            else{
                const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                if(listIndex < 0) throw new Error('Wrong list Id')
                else{
                    board.lists[listIndex].title = title
                    board.save()
                }   
            }
        })

        return list
    }

    async moveList(boardId: string, sourceIndex: number, destinationIndex: number){
        const board = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board with that id not found')
            else{
                const list = board.lists.splice(sourceIndex, 1)[0]
                board.lists.splice(destinationIndex, 0, list)
                board.save()
            }
        })

        return board
    }

    async addCard(boardId: string, listId: string, card: Card){
        const addedCard = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board not found')
            const listIndex = board.lists.findIndex(list => String(list._id) === listId)
            if(listIndex < 0){
                throw new Error('List didn`t found')
            }else{
                board.lists[listIndex].cards.push(card)
                board.save()
            }
        })  

        return addedCard
    }

    async removeCard(boardId: string, listId: string, cardId: string) {
        const list = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board not found')

            const listIndex = board.lists.findIndex(list => String(list._id) === listId)
            const cardIndex = board.lists[listIndex].cards.findIndex(card => String(card._id) === cardId)

            if(listIndex < 0 || cardIndex < 0){
                throw new Error('List or card didn`t found')
            }else{
                board.lists[listIndex].cards.splice(cardIndex, 1)
                board.save()
            }
        })

        return list
    }

    async deleteBoard(userId: string, boardId: string) {
        const user = await findUserById(userId)

        if(user){
            
            return Board.findByIdAndDelete(boardId,{useFindAndModify: false}, (err: Error, board: BoardI) => {
                if(err) throw err
                if(!board) throw new Error('Board Not Found')
                else{
                    user.boardIds = user.boardIds.filter(board => board !== boardId)
                    user.save() 
                    return board
                }
            })
        }

        return null
    }

    async editBoardName(boardId: string, boardName: string) {
        const board = await Board.findByIdAndUpdate(boardId, {name: boardName}, {useFindAndModify: false}, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('User Not Found')
            else{
                return board
            }
        })

        return board
            
    }

    async updateCard(boardId: string, listId: string, cardId: string, card: Card) {
        const updatedCard = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board with that id not found')
            else{
                const listIndex = board.lists.findIndex(list => String(list._id) === listId)
                if(listIndex < 0) throw new Error('Wrong list Id')
                else{
                    const cardIndex = board.lists[listIndex].cards.findIndex(card => String(card._id) === cardId)
                    board.lists[listIndex].cards[cardIndex] = card
                    board.save()
                }   
            }
        })

        return updatedCard
    }

    async moveCard(boardId:string, sourceListIndex: number, destListIndex: number, sourceCardIndex:number, destCardIndex: number){
        const board = await Board.findById(boardId, (err: Error, board: BoardI) => {
            if(err) throw err
            if(!board) throw new Error('Board with that id not found')
            else{
                const card = board.lists[sourceListIndex].cards.splice(sourceCardIndex, 1)[0]
                board.lists[destListIndex].cards.splice(destCardIndex, 0, card)
                board.save()
            }
        })

        return board
    }

}

export default new BoardService()
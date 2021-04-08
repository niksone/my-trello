import axios from "axios";
import { Card, List } from "../redux/AddItem/interfaces";
import { Board } from "../redux/Board/interfaces";

const instance = axios.create({
    withCredentials: true
})

export const authApi = {
    async login (email: string, password: string) {
        const login = await instance.post('/login', {email, password})
        return login
    },

    async register(email: string, password: string) {
        const register = await instance.post('/register', {email, password})
        return register
    },

    async logout() {
        const logout = await instance.post('/logout')
    },
    
    async checkUserExist(email: string, password: string) {
        const checkUserExist = instance.post('/checkUserExist', {email, password})
        return checkUserExist;
    },

    async isAuth() {
        const req = await instance.get('/isAuth')
        const isAuth: boolean = req.data
        return isAuth
    },

    async getUser() {
        const session = await instance.get('/user')
        const user = session.data.passport.user
        console.log(user, 'apiiiii')
        return user
    }

}

export const boardApi = {
    async getBoards(userId: string) {
        const boards = await instance.post<Board[]>('/getBoards', {userId})
        return boards
    },

    async addBoard(userId: string, boardName: string) {
        const board = await instance.post<Board>('/boards', {userId, boardName})
        return board
    },

    async addList(boardId: string, list: List){
        const listItem = await instance.post<List>('/boards/addList', {boardId, list})
        return listItem
    },

    async deleteList(boardId: string, listId: string) {
        const list = await instance.delete<List>('/boards/removeList', {data: {boardId, listId}})
    },

    async editListTitle(boardId: string, listId: string, title: string) {
        const updateList = await instance.patch<List>('/boards/updateListTitle', {boardId,listId,title})
        return updateList
    },

    async moveList(boardId: string, sourceIndex: number, destinationIndex: number) {
        const updateBoard = await instance.patch<Board>('/boards/moveList', {boardId,sourceIndex,destinationIndex})
        return updateBoard
    },

    async addCard(boardId: string, listId: string, card: Card){
        const listItem = await instance.post<Card>('/boards/addCard', {boardId, listId, card})
        return listItem
    },

    async deleteCard(boardId: string, listId: string, cardId: string) {
            const list = await instance.delete<Card>('/boards/removeCard', {data: {boardId, listId, cardId}})
            return list
    },

    async updateCard(boardId: string, listId: string, cardId: string, card: Card){
        try {
            const updatedCard = await instance.patch<Card>(
                '/boards/updateCard', 
                {boardId, listId, cardId, card}
            )
            return updatedCard
        } catch (error) {
            console.log(error)
        }
    },

    // async editCardText(boardId: string, listId: string, cardId: string, text: string) {
    //     const updateCard = await instance.patch<Card>('/boards/updateCardTitle', {boardId,listId, cardId, text})
    //     return updateCard
    // },

    async moveCard(
        boardId: string, sourceListIndex: number, destListIndex: number, 
        sourceCardIndex: number, destCardIndex: number
    ) {
        const updateBoard = await instance.patch<Board>(
            '/boards/moveCard', 
            {boardId, sourceListIndex, destListIndex, sourceCardIndex, destCardIndex}
        )
        return updateBoard
    }
}
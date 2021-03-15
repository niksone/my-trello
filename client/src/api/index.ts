import { Task } from './../redux/AddItem/reducer';
import axios from "axios";
import { addList, List } from "../redux/AddItem/reducer";
import { addBoard, Board } from "../redux/Board/reducer";

const instance = axios.create({
    withCredentials: true
})

export const authApi = {
    login () {

    },

    register() {

    },

    logout() {

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

    async addTask(boardId: string, listId: string, task: Task){
        const listItem = await instance.post<Task>('/boards/addTask', {boardId, listId, task})
        return listItem
    },

    async deleteTask(boardId: string, listId: string, taskId: string) {
        try {
            const list = await instance.delete<Task>('/boards/removeTask', {data: {boardId, listId, taskId}})
            return list
        } catch (error) {
            console.log(error)
        }
    },

    async editTaskText(boardId: string, listId: string, taskId: string, text: string) {
        const updateTask = await instance.patch<Task>('/boards/updateTaskTitle', {boardId,listId, taskId, text})
        return updateTask
    },

    async moveTask(
        boardId: string, sourceListIndex: number, destListIndex: number, 
        sourceTaskIndex: number, destTaskIndex: number
    ) {
        const updateBoard = await instance.patch<Board>(
            '/boards/moveTask', 
            {boardId, sourceListIndex, destListIndex, sourceTaskIndex, destTaskIndex}
        )
        return updateBoard
    }
}
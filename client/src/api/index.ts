import axios from "axios";
import { List, Task } from "../redux/AddItem/interfaces";
import { Board } from "../redux/Board/interfaces";

const instance = axios.create({
    withCredentials: true
})

export const authApi = {
    async login (email: string, password: string) {
        const login = await instance.post('/login', {email, password})
        return login
        // axios({
        //     method: 'POST',
        //     data: {
        //         email: email,
        //         password: password
        //     },
        //     withCredentials: true,
        //     url: `/login`
        // })
    },

    async register(email: string, password: string) {
        const register = await instance.post('/register', {email, password})
        return register
        // axios({
        //     method: 'POST',
        //     data: {email, password},
        //     withCredentials: true,
        //     url: '/register'
        // }).then((res) => {getAuth()})
    },

    logout() {

    },
    
    async checkUserExist(email: string, password: string) {
        const checkUserExist = instance.post('/checkUserExist', {email, password})
        return checkUserExist;
        // return axios({
        //     method: 'GET',
        //     data: {email, password},
        //     withCredentials: true,
        //     url: '/checkUserExist'
        // })
        //     .then((res) => {
        //         return res.data 
        //             ? {userExist: true, error: 'User Already Exist'}
        //             : {userExist: false, error: ''}
        //         })
        //     .catch(err => {
        //         return {userExist: false, error: err}
        //     })
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
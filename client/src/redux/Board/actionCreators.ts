import { BoardAction } from './actions';
import { Dispatch } from "react"
import { boardApi } from "../../api"

export const getBoards = (user: string) => async (dispatch: Dispatch<BoardAction>) =>{
    try {
        const boards = (await boardApi.getBoards(user)).data
        dispatch({type: 'SET_BOARDS', payload: boards})
    } catch (error) {
        console.log(error)
    }
}

export const addBoard = (userId: string, boardName: string) => async (dispatch: Dispatch<BoardAction>) => {
    try {
        const board = (await boardApi.addBoard(userId, boardName)).data
        dispatch({type: 'ADD_BOARD', payload: {id: board._id, name: boardName}})
    } catch (error) {
        console.log(error)
    }
}
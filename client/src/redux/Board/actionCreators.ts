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
        // const board = (await boardApi.addBoard(userId, boardName)).data
        // dispatch({type: 'ADD_BOARD', payload: {id: board._id, name: boardName}})
        dispatch({type: 'ADD_BOARD', payload: {id: new Date().toISOString(), name: boardName}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteBoard = (id: string) => async (dispatch: Dispatch<BoardAction>) => {
    try {
        console.log(`delete board id ${id}`)
        dispatch({type: 'DELETE_BOARD', payload: {id}})
    } catch (error) {
        console.log(error)
    }
}

export const editBoardName= (id: string, name: string) => async (dispatch: Dispatch<BoardAction>) => {
    try {
        dispatch({type: 'EDIT_BOARD_NAME', payload: {id, name}})
    } catch (error) {
        console.log(error)
    }
}
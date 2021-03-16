import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import {v4 as uuid} from 'uuid'
import { boardApi } from '../../api';
import { List } from '../AddItem/interfaces';
import { BoardAction } from "./actions"

export interface Board {
    _id: string,
    name: string,
    lists: List[],
    // tasks: Task[],
    taskIds: string[],
    draggedListId: string,
    draggedCardId: string
}

export interface BoardReducerProps {
    boards: Board[],
    isLoading: boolean
}

export const getBoards = (user: string) => async (dispatch: Dispatch<BoardAction>) =>{
    try {
        // dispatch({type: 'SET_LOADING', payload: true})
        const boards = (await boardApi.getBoards(user)).data
        // const boards = await axios.get('/boards',{data: user})
        console.log(boards, '==boards')
        dispatch({type: 'SET_BOARDS', payload: boards})
        // done()
    } catch (error) {
        
    }
}

export const addBoard = (userId: string, boardName: string) => async (dispatch: Dispatch<BoardAction>) => {
    try {
        // await boardApi.
        const board = (await boardApi.addBoard(userId, boardName)).data
        dispatch({type: 'ADD_BOARD', payload: {id: board._id, name: boardName}})
    } catch (error) {
        
    }
}
const initialState: BoardReducerProps = {
    boards: [] as Board[],
    isLoading: true
}

export const boardReducer = (state: BoardReducerProps = initialState, action: BoardAction): BoardReducerProps => {
    switch(action.type) {
        case 'SET_LOADING': {
            return {...state, isLoading: action.payload}
        }

        case 'SET_BOARDS': {
            return {...state, boards: action.payload, isLoading: false}
        }

        case 'ADD_BOARD': {
            const { id, name} = action.payload
            const newBoard = {
                _id: id,
                name,
                lists: [],
                taskIds: [],
                draggedListId: '',
                draggedCardId: ''
            }
            state.boards.push(newBoard)
            console.log(state)
            return {...state, isLoading: false}
        }




        default: return state
    }
}

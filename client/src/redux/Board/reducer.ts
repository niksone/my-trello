import {v4 as uuid} from 'uuid'
import { boards as boardsData } from '../../data';
import { List, Task } from '../AddItem/reducer';
import { BoardAction } from "./actions"

export interface Board {
    id: string,
    name: string,
    lists: List[],
    // tasks: Task[],
    taskIds: string[],
    draggedListId: string,
    draggedCardId: string
}

export interface BoardReducerProps {
    boards: Board[],
}



export const boardReducer = (state: BoardReducerProps = {boards: boardsData}, action: BoardAction): BoardReducerProps => {
    switch(action.type) {
        // case 'SET_BOARD': {
        //     console.log('reducer', action.payload)
        //     return {...state, currentBoard: action.payload}
        // }

        case 'ADD_BOARD': {
            const {name} = action.payload
            const newBoard = {
                id: uuid(),
                name,
                lists: [],
                taskIds: [],
                draggedListId: '',
                draggedCardId: ''
            }
            state.boards.push(newBoard)
            console.log(state)
            return {...state}
        }



        default: return state
    }
}
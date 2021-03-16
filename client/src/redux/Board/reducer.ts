import { BoardAction } from "./actions"
import { Board, BoardReducerProps } from './interfaces';

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

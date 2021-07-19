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
                cardIds: [],
                draggedListId: '',
                draggedCardId: ''
            }
            state.boards.push(newBoard)
            return {...state, isLoading: false}
        }

        case 'DELETE_BOARD': {
            const {id} = action.payload
            state.boards = state.boards.filter(board => board._id !== id)
            return {...state}
        }

        case 'EDIT_BOARD_NAME': {
            const {id, name} = action.payload

            state.boards = state.boards.map(board => (
                board._id === id ? {...board, name} : board
            ))

            return {...state}
        }


        default: return state
    }
}

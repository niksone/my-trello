import { Board } from './../Board/reducer';
import { moveItem } from '../../utils/moveItem'
import { moveItemBetweenLists } from '../../utils/moveItemBetweenLists'
import { AddItemAction } from './actions'
import { Dispatch } from 'redux';
import { AddItemState, List, Task } from './interfaces';

const findIndex = <T extends List | Task>(id: string, array: T[]  ) => {
    return array.findIndex((item: T)=> item._id === id)
}

const getTasks = (lists: List[]) => {
    return lists?.map(list => list.tasks).flat().map(task => task._id) || []
}

export const setBoard = (board: Board) => (dispatch: Dispatch) => {
    dispatch({type: 'SET_BOARD', payload: board})
}

const initialState = {
    _id: '',
    name: '',
    lists: [],
    taskIds: [],
    draggedListId: '',
    draggedCardId: '',
    isLoading: true
}

export const addItemReducer = (state: AddItemState = initialState, action: AddItemAction): AddItemState => {
    switch(action.type) {
        case 'SET_BOARD': {
            console.log('reducer', action.payload)
            const lists = action.payload.lists
            const taskIds = getTasks(lists)
            return {...state,...action.payload, isLoading: false, taskIds   }
        }

        case 'ADD_LIST':{
            return{   
                    ...state,
                    lists: [
                        ...state.lists,
                        action.payload
                    ]
                }
        }

        case 'ADD_CARD':{
            const {listId, task} = action.payload
            const line = findIndex(action.payload.listId, state.lists)
            console.log(action.payload.listId, state.lists)
            state.lists[line].tasks.push(task)
            state.taskIds = getTasks(state.lists)
            return{   
                    ...state,
                }
        }

        case 'EDIT_CARD': {
            const columnIndex = findIndex(action.payload.listId, state.lists)
            const taskIndex = findIndex(action.payload.taskId, state.lists[columnIndex].tasks)
            state.lists[columnIndex].tasks[taskIndex].text = action.payload.text

            return {...state}
        }

        case 'DELETE_CARD':{
            const columnIndex = findIndex(action.payload.listId, state.lists)
            const taskIndex = findIndex(action.payload.taskId, state.lists[columnIndex].tasks)
            state.lists[columnIndex].tasks.splice(taskIndex, 1)
            return {...state}
        }

        case 'EDIT_LIST': {
            const columnIndex = findIndex(action.payload.listId, state.lists)
            state.lists[columnIndex].title = action.payload.title

            return {...state}
        }

        case 'DELETE_LIST':{
            const columnIndex = findIndex(action.payload.listId, state.lists)
            state.lists.splice(columnIndex, 1)
            return {...state}
        }
    


        case 'MOVE_LIST': {
            const {sourceIndex, destIndex} = action.payload

            
            moveItem(state.lists, sourceIndex, destIndex)
            return {...state}
        }

        case 'MOVE_CARD_IN_LIST': {
            const {arrIndex, sourceTaskIndex, destTaskIndex} = action.payload
            moveItem(state.lists[arrIndex].tasks, sourceTaskIndex, destTaskIndex)
            state.taskIds = getTasks(state.lists)
            return {...state}

        }

        case 'MOVE_CARD_BETWEEN_LISTS': {
            const {sourceArrIndex, destArrIndex, sourceTaskIndex, destTaskIndex} = action.payload
    
            moveItemBetweenLists(state.lists[sourceArrIndex].tasks, state.lists[destArrIndex].tasks, sourceTaskIndex, destTaskIndex)
            state.taskIds = getTasks(state.lists)
            return {...state}
        }

        case 'SET_DRAGGED_LIST':{
            console.log(`dragged Lsit ${action.payload}`)
            return {
                ...state,
                draggedListId: action.payload
            }
        }

        case 'SET_DRAGGED_CARD': {
            return {
                ...state,
                draggedCardId: action.payload
            }
        }

        default:
            return state
    }

}


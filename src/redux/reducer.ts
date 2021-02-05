import {v4 as uuid} from 'uuid'
import { data } from '../data'
import { Action } from './actions'

export interface Task {
    text: string,
    id: string
}

export interface List {
    id: string,
    title: string,
    tasks: Task[]
}

export interface AddItemState {
    lists: List[],
    draggedListId: string
}

export type ColumnDragItem = 
    {
        id: string,
        title: string,
        type: 'COLUMN'
    }

export type DragItem = ColumnDragItem

const findId = <T extends List>(id: string, array: T[]  ) => {
    return array.findIndex((item: T )=> item.id === id)
}

export const moveItem = <T>(array: T[], from: number, to: number) => {
    const startIndex = to < 0 ? array.length + to : to;
    const item = array.splice(from, 1)[0]
    array.splice(startIndex, 0, item)
    
    return array
}

export const addItemReducer = (state: AddItemState = data, action: Action): AddItemState => {
    switch(action.type) {
        case 'ADD_LIST':{
            return{   
                    ...state,
                    lists: [
                        ...state.lists,
                        {id: uuid(), title: action.payload, tasks: []}
                    ]
                }
        }

        case 'ADD_TASK':{
            const line = findId(action.payload.listId, state.lists)
            console.log(action.payload.listId, state.lists)
            state.lists[line].tasks.push({text: action.payload.text, id: uuid()})
            console.log('state add task')
            return{   
                    ...state,
                }
        }

        case 'MOVE_LIST': {
            const {dragId, hoverId} = action.payload
            const dragIndex = findId(dragId, state.lists)
            const hoverIndex = findId(hoverId, state.lists)
            console.log(dragIndex, hoverIndex)
            
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return {...state}
        }

        case 'SET_DRAGGED_LIST':
            console.log(`dragged Lsit ${action.payload}`)
            return {
                ...state,
                draggedListId: action.payload
            }

        default:
            return state
    }

}


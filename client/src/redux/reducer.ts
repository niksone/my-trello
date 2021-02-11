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
    draggedListId: string,
    draggedCardId: string
}

export type ColumnDragItem = 
    {
        id: string,
        title: string,
        type: 'COLUMN'
    }

export type CardDragItem = 
    {
        id: string,
        columnId: string,
        text: string,
        type: 'CARD',
    }

export type DragItem = ColumnDragItem | CardDragItem

const findIndex = <T extends List | Task>(id: string, array: T[]  ) => {
    return array.findIndex((item: T )=> item.id === id)
}

// const find

export const moveItem = <T>(array: T[], from: number, to: number) => {
    const startIndex = to < 0 ? array.length + to : to;
    const item = array.splice(from, 1)[0]
    array.splice(startIndex, 0, item)
    
    return array
}

const moveItemToList = <T>(arrFrom: T[], arrTo: T[], from: number, to: number) => {
    const startIndex = from < 0 ? arrFrom.length + from : from;
    
    console.log(arrFrom, arrTo, startIndex, to)
    const item = arrFrom.splice(startIndex, 1)[0]
    arrTo.splice(to, 0, item)
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
            const line = findIndex(action.payload.listId, state.lists)
            console.log(action.payload.listId, state.lists)
            state.lists[line].tasks.push({text: action.payload.text, id: uuid()})
            console.log('state add task')
            return{   
                    ...state,
                }
        }

        case 'MOVE_LIST': {
            const {dragId, hoverId} = action.payload
            const dragIndex = findIndex(dragId, state.lists)
            const hoverIndex = findIndex(hoverId, state.lists)
            // console.log(dragIndex, hoverIndex)
            
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return {...state}
        }

        case 'MOVE_CARD': {
            const {dragId, hoverId, hoverColumnId, dragColumnId} = action.payload
            console.log(dragId, hoverId, hoverColumnId, dragColumnId)
            const hoverColumnIndex = findIndex(hoverColumnId, state.lists)
            const dragColumnIndex = findIndex(dragColumnId, state.lists)

            const dragIndex = findIndex(dragId, state.lists[dragColumnIndex].tasks)
            const hoverIndex = findIndex(hoverId, state.lists[hoverColumnIndex].tasks)
            // const hoverIndex
            // const dragIndex = findId(dragId, state.lists)
            console.log('id', dragId, hoverId, hoverColumnId, dragColumnId   )
            if(hoverColumnIndex === dragColumnIndex) {
                moveItem(state.lists[hoverColumnIndex].tasks, dragIndex, hoverIndex)
            } else{
                // const item = state.lists[dragColumnIndex].tasks.splice(dragIndex ,1)[0]
                // state.lists[hoverColumnIndex].tasks.splice(hoverIndex, 0, item)
                moveItemToList(state.lists[dragColumnIndex].tasks, state.lists[hoverColumnIndex].tasks, dragIndex, hoverIndex)
            }
            // console.log(state.lists[dragColumnIndex])
            // console.log(state.lists[hoverColumnIndex])
            // state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            // console.log(state)
            return {...state}
        }

        case 'SET_DRAGGED_LIST':{
            console.log(`dragged Lsit ${action.payload}`)
            return {
                ...state,
                draggedListId: action.payload
            }
        }

        case 'SET_DRAGGED_CARD': 
            return {
                ...state,
                draggedCardId: action.payload
            }

        default:
            return state
    }

}


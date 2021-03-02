import {v4 as uuid} from 'uuid'
import { data } from '../data'
import { moveItem } from '../utils/moveItem'
import { moveItemBetweenLists } from '../utils/moveItemBetweenLists'
import { Action } from './actions'

export interface Task {
    text: string,
    id: string
}

export interface List {
    id: string,
    title: string,
    tasks: Task[],
}

export interface AddItemState {
    lists: List[],
    taskIds: string[],
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

const getTasks = (lists: List[]) => {
    return lists.map(list => list.tasks).flat().map(task => task.id)
}

// const find

// export const moveItem = <T>(array: T[], from: number, to: number) => {
//     const startIndex = to < 0 ? array.length + to : to;
//     const item = array.splice(from, 1)[0]
//     array.splice(startIndex, 0, item)
    
//     return array
// }

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
            state.taskIds = getTasks(state.lists)
            return{   
                    ...state,
                }
        }

        case 'MOVE_LIST': {
            const {sourceIndex, destIndex} = action.payload

            
            moveItem(state.lists, sourceIndex, destIndex)
            return {...state}
        }

        case 'MOVE_CARD': {
            const {sourceDroppableId, destDroppableId, sourceIndex, destIndex} = action.payload

            if(destDroppableId === sourceDroppableId){
                const arrIndex = state.lists.findIndex(list => list.id === sourceDroppableId)
                const sourceTaskIndex = state.lists[arrIndex].tasks.findIndex(task => task.id === state.taskIds[sourceIndex])
                const destTaskIndex = state.lists[arrIndex].tasks.findIndex(task => task.id === state.taskIds[destIndex])
                
                moveItem(state.lists[arrIndex].tasks, sourceTaskIndex, destTaskIndex)
                state.taskIds = getTasks(state.lists)
                console.log(state.taskIds)
                console.log(state, action.payload, sourceTaskIndex, destTaskIndex)
                return {...state}
            }
            const destArrIndex = state.lists.findIndex(list => list.id === destDroppableId)
            const sourceArrIndex = state.lists.findIndex(list => list.id === sourceDroppableId)
            
            const sourceTaskIndex = state.lists[sourceArrIndex].tasks.findIndex(
                task => task.id === state.taskIds[sourceIndex]
            )
            const destTaskIndex = state.lists[destArrIndex].tasks.findIndex(
                task => task.id === (state.taskIds[destIndex] && state.taskIds[destIndex])
            )
    
            const checkedDestTaskIndex = destTaskIndex < 0 ? state.lists[destArrIndex].tasks.length : destTaskIndex
    
            moveItemBetweenLists(state.lists[sourceArrIndex].tasks, state.lists[destArrIndex].tasks, sourceTaskIndex, checkedDestTaskIndex)
            state.taskIds = getTasks(state.lists)
            console.log(state, action.payload, sourceTaskIndex, checkedDestTaskIndex)
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


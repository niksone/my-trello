import {v4 as uuid} from 'uuid'
import { boards } from '../../data'
import { moveItem } from '../../utils/moveItem'
import { moveItemBetweenLists } from '../../utils/moveItemBetweenLists'
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
    id: string,
    name: string,
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

export const addItemReducer = (state: AddItemState = {} as AddItemState, action: Action): AddItemState => {
    switch(action.type) {
        case 'SET_BOARD': {
            console.log('reducer', action.payload)
            return {...state,...action.payload}
        }

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
            state.lists[columnIndex].title = action.payload.text

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

        case 'MOVE_CARD': {
            const {sourceDroppableId, destDroppableId, sourceIndex, destIndex} = action.payload

            if(destDroppableId === sourceDroppableId){
                const arrIndex = state.lists.findIndex(list => list.id === sourceDroppableId)
                const sourceTaskIndex = state.lists[arrIndex].tasks.findIndex(task => task.id === state.taskIds[sourceIndex])
                const destTaskIndex = state.lists[arrIndex].tasks.findIndex(task => task.id === state.taskIds[destIndex])
                
                moveItem(state.lists[arrIndex].tasks, sourceTaskIndex, destTaskIndex)
                state.taskIds = getTasks(state.lists)
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

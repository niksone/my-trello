import { boardApi } from './../../api/index';
import { Board } from './../Board/reducer';
import { moveItem } from '../../utils/moveItem'
import { moveItemBetweenLists } from '../../utils/moveItemBetweenLists'
import { AddItemAction } from './actions'
import { Dispatch } from 'redux';
import ObjectID from 'bson-objectid';

export interface Task {
    text: string,
    _id: string
}

export interface List {
    _id: string,
    title: string,
    tasks: Task[],
}

export interface AddItemState {
    _id: string,
    name: string,
    lists: List[],
    taskIds: string[],
    draggedListId: string,
    draggedCardId: string,
    isLoading: boolean
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
    return array.findIndex((item: T )=> item._id === id)
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


export const addList = (boardId: string, title: string) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        const list: List = {
            _id: String(new ObjectID()),
            title,
            tasks: []
        }
        dispatch({type: 'ADD_LIST', payload: list})
        await boardApi.addList( boardId, list)
    } catch (error) {
        console.log(error)
    }
}

export const deleteList = (boardId: string, listId: string) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        dispatch({type: 'DELETE_LIST', payload: {listId}})
        const list = (await boardApi.deleteList( boardId, listId))
        console.log(list , 'list')
    } catch (error) {
        console.log(error)
    }
}



export const addTask = (boardId: string, listId: string, text: string) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        const task: Task = {
            _id: String(new ObjectID()),
            text
        }
        dispatch({type: 'ADD_CARD', payload: {listId, task}})
        await boardApi.addTask( boardId, listId, task)
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = (boardId: string, listId: string, taskId: string) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        dispatch({type: 'DELETE_CARD', payload: {listId, taskId}})
        const list = (await boardApi.deleteTask( boardId, listId, taskId))
        console.log(list , 'list')
    } catch (error) {
        console.log(error)
    }
}

export const updateListTitle = (boardId: string, listId: string, title: string) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        dispatch({type: 'EDIT_LIST', payload: {listId, title}})
        await boardApi.editListTitle(boardId, listId, title)
    } catch (error) {
        console.log(error)
    }
}

export const updateTaskText = (boardId: string, listId: string, taskId: string, text: string) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        dispatch({type: 'EDIT_CARD', payload: {listId, taskId, text}})
        await boardApi.editTaskText(boardId, listId, taskId, text)
    } catch (error) {
        console.log(error)
    }
}

export const moveList = (boardId: string, sourceIndex: number, destinationIndex: number) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        dispatch({type: 'MOVE_LIST', payload: {sourceIndex, destIndex: destinationIndex}})
        await boardApi.moveList(boardId, sourceIndex, destinationIndex)
    } catch (error) {
        console.log(error)
    }
}

export const moveTask = (boardId: string, state: any, sourceDroppableId: string, sourceIndex: number, destDroppableId: string, destIndex: number) => async (dispatch: Dispatch<AddItemAction>) => {
    try {
        const {sourceArrIndex, destArrIndex, sourceTaskIndex, destTaskIndex} 
            = getMoveIndexes(state.lists, destDroppableId, sourceDroppableId, sourceIndex, destIndex, state.taskIds)

        if(sourceDroppableId === destDroppableId){
            dispatch({type: 'MOVE_CARD_IN_LIST', payload: {arrIndex: sourceArrIndex, sourceTaskIndex, destTaskIndex}})
            await boardApi.moveTask(boardId, sourceArrIndex, destArrIndex, sourceTaskIndex, destTaskIndex)

        }else{
            const checkedDestTaskIndex = destTaskIndex < 0 ? state.lists[destArrIndex].tasks.length : destTaskIndex
            dispatch({type: 'MOVE_CARD_BETWEEN_LISTS', payload: {sourceArrIndex, destArrIndex, sourceTaskIndex, destTaskIndex: checkedDestTaskIndex}})
            await boardApi.moveTask(boardId, sourceArrIndex, destArrIndex, sourceTaskIndex, checkedDestTaskIndex)
        }
    } catch (error) {
        console.log(error)
    }
}

const getMoveIndexes = <T extends List>(
        lists: T[], destDroppableId: string, sourceDroppableId: string, 
        sourceIndex: number, destIndex: number, taskIds: string[]
    ) => {
        const destArrIndex = lists.findIndex((list: List) => list._id === destDroppableId)
        const sourceArrIndex = lists.findIndex((list: List) => list._id === sourceDroppableId)
        
        const sourceTaskIndex = lists[sourceArrIndex].tasks.findIndex(
            (task: Task) => task._id === taskIds[sourceIndex]
        )

        const destTaskIndex = lists[destArrIndex].tasks.findIndex(
            (task: Task) => task._id === (taskIds[destIndex] && taskIds[destIndex])
        )

        return {destArrIndex, sourceArrIndex, sourceTaskIndex, destTaskIndex}
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


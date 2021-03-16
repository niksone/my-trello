import { boardApi } from './../../api/index';
import ObjectID from "bson-objectid"
import { Dispatch } from "react"
import { AddItemAction } from "./actions"
import { List, Task } from "./interfaces"
import { getMoveIndexes } from '../../utils/getTaskIndexes';

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
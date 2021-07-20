import { boardApi } from '../../api/index';
import ObjectID from "bson-objectid"
import { Dispatch } from "react"
import { HandleItemsAction } from "./actions"
import { handleItemsState, CardI, List, Task } from "./interfaces"
import { getMoveIndexes } from '../../utils/getCardIndexes';

export const addList = (boardId: string, title: string) => async (dispatch: Dispatch<HandleItemsAction>) => {
    try {
        const list: List = {
            _id: String(new ObjectID()),
            title,
            cards: []
        }
        dispatch({type: 'ADD_LIST', payload: list})
        await boardApi.addList( boardId, list)
    } catch (error) {
        console.log(error)
    }
}

export const deleteList = (boardId: string, listId: string) => async (dispatch: Dispatch<HandleItemsAction>) => {
    try {
        dispatch({type: 'DELETE_LIST', payload: {listId}})
        await boardApi.deleteList( boardId, listId)
    } catch (error) {
        console.log(error)
    }
}



export const addCard = (boardId: string, listId: string, title: string, subtitle: string = '', description: string = '', tasks: Task[] = []) => 
    async (dispatch: Dispatch<HandleItemsAction>) => {
        try {
            const card: CardI = {
                _id: String(new ObjectID()),
                title,
                subtitle,
                description,
                tasks
            }
            if(listId === null || card === null){
                throw new Error('wrong values')
            }
            dispatch({type: 'ADD_CARD', payload: {listId, card}})
            await boardApi.addCard( boardId, listId, card)
        } catch (error) {
            console.log(error)
        }
    }

export const deleteCard = (boardId: string, listId: string, cardId: string) => async (dispatch: Dispatch<HandleItemsAction>) => {
    try {
        dispatch({type: 'DELETE_CARD', payload: {listId, cardId}})
        await boardApi.deleteCard( boardId, listId, cardId)
    } catch (error) {
        console.log(error)
    }
}

export const updateCard = (boardId: string, listId: string, cardId: string, card: CardI) => 
    async (dispatch: Dispatch<HandleItemsAction>) => {
        try {
            dispatch({type: 'UPDATE_CARD', payload: {listId, cardId, card}})
            await boardApi.updateCard(boardId, listId, cardId, card)
        } catch (error) {
            console.log(error)
        }
    }

export const updateListTitle = (boardId: string, listId: string, title: string) => async (dispatch: Dispatch<HandleItemsAction>) => {
    try {
        dispatch({type: 'EDIT_LIST', payload: {listId, title}})
        await boardApi.editListTitle(boardId, listId, title)
    } catch (error) {
        console.log(error)
    }
}

export const moveList = (boardId: string, sourceIndex: number, destinationIndex: number) => async (dispatch: Dispatch<HandleItemsAction>) => {
    try {
        dispatch({type: 'MOVE_LIST', payload: {sourceIndex, destIndex: destinationIndex}})
        await boardApi.moveList(boardId, sourceIndex, destinationIndex)
    } catch (error) {
        console.log(error)
    }
}

export const moveCard = (boardId: string, state: handleItemsState, sourceDroppableId: string, sourceIndex: number, destDroppableId: string, destIndex: number) => async (dispatch: Dispatch<HandleItemsAction>) => {
    try {
        const {sourceArrIndex, destArrIndex, sourceCardIndex, destCardIndex} 
            = getMoveIndexes(state.lists, destDroppableId, sourceDroppableId, sourceIndex, destIndex, state.cardIds)

        if(sourceDroppableId === destDroppableId){
            dispatch({type: 'MOVE_CARD_IN_LIST', payload: {arrIndex: sourceArrIndex, sourceCardIndex, destCardIndex}})
            await boardApi.moveCard(boardId, sourceArrIndex, destArrIndex, sourceCardIndex, destCardIndex)

        }else{
            const checkedDestCardIndex = destCardIndex < 0 ? state.lists[destArrIndex].cards.length : destCardIndex
            dispatch({type: 'MOVE_CARD_BETWEEN_LISTS', payload: {sourceArrIndex, destArrIndex, sourceCardIndex, destCardIndex: checkedDestCardIndex}})
            await boardApi.moveCard(boardId, sourceArrIndex, destArrIndex, sourceCardIndex, checkedDestCardIndex)
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = (columnId:string, cardId: string, taskId:string, text: string, completed: boolean) => (dispatch: Dispatch<HandleItemsAction>) => {
    dispatch({type: 'UPDATE_TASK', payload: {columnId, cardId,taskId, text, completed}})
}
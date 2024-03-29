import { BoardI } from '../Board/interfaces';
import { moveItem } from '../../utils/moveItem'
import { moveItemBetweenLists } from '../../utils/moveItemBetweenLists'
import { HandleItemsAction } from './actions'
import { Dispatch } from 'redux';
import { handleItemsState, CardI, List } from './interfaces';

const findIndex = <T extends List | CardI>(id: string, array: T[]  ) => {
    return array.findIndex((item: T)=> item._id === id)
}

const getCards = (lists: List[]) => {
    return lists?.map(list => list.cards).flat().map(card => card._id)
}

export const setBoard = (board: BoardI) => (dispatch: Dispatch) => {
    dispatch({type: 'SET_BOARD', payload: board})
}

const initialState = {
    _id: '',
    name: '',
    lists: [],
    cardIds: [],
    isLoading: true
}

export const handleItemsReducer = (state: handleItemsState = initialState, action: HandleItemsAction): handleItemsState => {
    switch(action.type) {
        case 'SET_BOARD': {
            const lists = action.payload.lists
            const cardIds = getCards(lists)
            return {...state,...action.payload, isLoading: false, cardIds}
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
            const {card} = action.payload
            const line = findIndex(action.payload.listId, state.lists)
            state.lists[line].cards.push(card)
            state.cardIds = getCards(state.lists)
            return{   
                    ...state,
                }
        }


        case 'UPDATE_CARD': {
            const {listId, cardId, card} = action.payload
            const columnIndex = findIndex(listId, state.lists)
            const cardIndex = findIndex(cardId, state.lists[columnIndex].cards)

            state.lists[columnIndex].cards = state.lists[columnIndex].cards.map((stateCard, index) => {
                return index === cardIndex ? card : stateCard
            })

            return {...state}
        }

        case 'DELETE_CARD':{
            const columnIndex = findIndex(action.payload.listId, state.lists)
            const cardIndex = findIndex(action.payload.cardId, state.lists[columnIndex].cards)
            state.lists[columnIndex].cards.splice(cardIndex, 1)
            return {...state}
        }

        case 'EDIT_LIST': {
            const {listId, title} = action.payload
            const columnIndex = findIndex(listId, state.lists)
            state.lists[columnIndex].title = title

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
            const {arrIndex, sourceCardIndex, destCardIndex} = action.payload
            moveItem(state.lists[arrIndex].cards, sourceCardIndex, destCardIndex)
            state.cardIds = getCards(state.lists)
            return {...state}

        }

        case 'MOVE_CARD_BETWEEN_LISTS': {
            const {sourceArrIndex, destArrIndex, sourceCardIndex, destCardIndex} = action.payload
    
            moveItemBetweenLists(state.lists[sourceArrIndex].cards, state.lists[destArrIndex].cards, sourceCardIndex, destCardIndex)
            state.cardIds = getCards(state.lists)
            return {...state}
        }

        case 'UPDATE_TASK':{
            const {columnId, cardId, taskId, text, completed} = action.payload

            const columnIndex = state.lists.findIndex(column => column._id === columnId)
            const cardIndex = state.lists[columnIndex].cards.findIndex(card => card._id === cardId)


            state.lists[columnIndex].cards[cardIndex].tasks = state.lists[columnIndex].cards[cardIndex].tasks.map((task, index) => {

                if(task._id === taskId){
                    return {...task, text, completed}
                }else{
                    return task
                }
            })
            return {...state, }
        }


        default:
            return state
    }


}


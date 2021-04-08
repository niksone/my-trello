import { Board } from '../Board/interfaces';
import { Card, List } from './interfaces';
export type AddItemAction = MoveList | MoveCardInList | MoveCardBetweenList | SetDraggedCard |
 SetDraggedList| AddBoard | SetBoard | AddList  | UpdateCard
| DeleteCard | EditList | DeleteList | AddCard | UpdateTask
// | AddTask
interface AddList {type: 'ADD_LIST', payload: List}

interface SetBoard {type: 'SET_BOARD', payload: Board}

interface AddBoard {type: 'ADD_BOARD', payload: Board}

// interface AddTask {type: 'ADD_TASK', payload: {task: Task, listId: string, cardId: string}}

interface AddCard {type: 'ADD_CARD', payload: {listId: string, card: Card}}

interface UpdateCard {type: 'UPDATE_CARD', payload: {listId: string, cardId: string, card: Card}}

interface DeleteCard {type: 'DELETE_CARD', payload: {listId: string, cardId: string}}


interface EditList {type: 'EDIT_LIST', payload: {listId: string, title: string}}

interface DeleteList {type: 'DELETE_LIST', payload: {listId: string}}

interface MoveList {type: 'MOVE_LIST', payload: {sourceIndex: number, destIndex: number}}

interface MoveCardBetweenList {type: 'MOVE_CARD_BETWEEN_LISTS', 
    payload: {
        sourceArrIndex: number, 
        destArrIndex: number, 
        sourceCardIndex: number, 
        destCardIndex: number
    }}


interface MoveCardInList {type: 'MOVE_CARD_IN_LIST', 
payload: {
    arrIndex: number
    sourceCardIndex: number, 
    destCardIndex: number
}}

interface SetDraggedList {type: 'SET_DRAGGED_LIST', payload: string}

interface SetDraggedCard {type: 'SET_DRAGGED_CARD', payload: string}

interface UpdateTask {
    type: 'UPDATE_TASK', 
    payload: {columnId: string, cardId: string, taskId: string,text: string, completed: boolean}
}
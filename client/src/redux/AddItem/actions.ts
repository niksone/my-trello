import { Board } from '../Board/interfaces';
import { List, Task } from './interfaces';
export type AddItemAction = MoveList | MoveCardInList | MoveCardBetweenList | SetDraggedCard |
 SetDraggedList| AddBoard | SetBoard | AddList | AddTask | EditCard
| DeleteCard | EditList | DeleteList

interface AddList {type: 'ADD_LIST', payload: List}

interface SetBoard {type: 'SET_BOARD', payload: Board}

interface AddBoard {type: 'ADD_BOARD', payload: Board}

interface AddTask {type: 'ADD_CARD', payload: {task: Task, listId: string}}

interface EditCard {type: 'EDIT_CARD', payload: {listId: string, taskId: string, text: string}}

interface DeleteCard {type: 'DELETE_CARD', payload: {listId: string, taskId: string}}

interface EditList {type: 'EDIT_LIST', payload: {listId: string, title: string}}

interface DeleteList {type: 'DELETE_LIST', payload: {listId: string}}

interface MoveList {type: 'MOVE_LIST', payload: {sourceIndex: number, destIndex: number}}

interface MoveCardBetweenList {type: 'MOVE_CARD_BETWEEN_LISTS', 
    payload: {
        sourceArrIndex: number, 
        destArrIndex: number, 
        sourceTaskIndex: number, 
        destTaskIndex: number
    }}


interface MoveCardInList {type: 'MOVE_CARD_IN_LIST', 
payload: {
    arrIndex: number
    sourceTaskIndex: number, 
    destTaskIndex: number
}}

interface SetDraggedList {type: 'SET_DRAGGED_LIST', payload: string}

interface SetDraggedCard {type: 'SET_DRAGGED_CARD', payload: string}
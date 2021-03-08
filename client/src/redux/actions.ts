import { List } from './reducer';
export type Action = SetBoard | AddList | AddTask | MoveList 
| MoveCard | SetDraggedList | SetDraggedCard | EditCard
| DeleteCard | EditList | DeleteList
interface AddList {type: 'ADD_LIST', payload: string}

interface SetBoard {type: 'SET_BOARD', payload: any}

interface AddTask {type: 'ADD_TASK', payload: {text: string, listId: string}}

interface MoveList {type: 'MOVE_LIST', payload: {sourceIndex: number, destIndex: number}}

interface MoveCard {type: 'MOVE_CARD', 
    payload: {
        sourceDroppableId: string, 
        destDroppableId: string, 
        sourceIndex: number, 
        destIndex: number
    }}

interface SetDraggedList {type: 'SET_DRAGGED_LIST', payload: string}

interface SetDraggedCard {type: 'SET_DRAGGED_CARD', payload: string}

interface EditCard {type: 'EDIT_CARD', payload: {listId: string, taskId: string, text: string}}

interface DeleteCard {type: 'DELETE_CARD', payload: {listId: string, taskId: string}}

interface EditList {type: 'EDIT_LIST', payload: {listId: string, text: string}}

interface DeleteList {type: 'DELETE_LIST', payload: {listId: string}}
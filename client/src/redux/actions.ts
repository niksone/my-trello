import { List } from './reducer';
export type Action = AddList | AddTask | MoveList | MoveCard | SetDraggedList | SetDraggedCard

interface AddList {type: 'ADD_LIST', payload: string}

interface AddTask {type: 'ADD_TASK', payload: {text: string, listId: string}}

interface MoveList {type: 'MOVE_LIST', payload: {hoverId: string, dragId: string}}

interface MoveCard {type: 'MOVE_CARD', payload: {hoverId: string, dragId: string, hoverColumnId: string, dragColumnId: string}}

interface SetDraggedList {type: 'SET_DRAGGED_LIST', payload: string}

interface SetDraggedCard {type: 'SET_DRAGGED_CARD', payload: string}
import { Board } from './reducer';
export type BoardAction = SetBoards | AddBoard | SetLoading

interface SetBoards {type: 'SET_BOARDS', payload: Board[]}

interface AddBoard {type: 'ADD_BOARD', payload: {id: string, name: string}}

interface SetLoading {type: 'SET_LOADING', payload: boolean}
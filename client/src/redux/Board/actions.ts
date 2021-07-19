import { Board } from "./interfaces";

export type BoardAction = SetBoards | AddBoard | SetLoading
    | DeleteBoard | EditBoardName

interface SetBoards {type: 'SET_BOARDS', payload: Board[]}

interface AddBoard {type: 'ADD_BOARD', payload: {id: string, name: string}}

interface SetLoading {type: 'SET_LOADING', payload: boolean}

interface DeleteBoard {type: 'DELETE_BOARD', payload: {id: string}}

interface EditBoardName {type: 'EDIT_BOARD_NAME', payload: {id: string, name: string}}
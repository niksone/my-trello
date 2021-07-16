import { List } from "../HandleItems/interfaces";

export interface Board {
    _id: string,
    name: string,
    lists: List[],
    cardIds: string[],
    draggedListId: string,
    draggedCardId: string
}

export interface BoardReducerProps {
    boards: Board[],
    isLoading: boolean
}

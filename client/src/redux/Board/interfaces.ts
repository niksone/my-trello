import { List } from "../HandleItems/interfaces";

export interface BoardI {
    _id: string,
    name: string,
    lists: List[],
    cardIds: string[],
    draggedListId: string,
    draggedCardId: string
}

export interface BoardReducerProps {
    boards: BoardI[],
    isLoading: boolean
}

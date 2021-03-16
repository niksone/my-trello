
export interface Task {
    text: string,
    _id: string
}

export interface List {
    _id: string,
    title: string,
    tasks: Task[],
}

export interface AddItemState {
    _id: string,
    name: string,
    lists: List[],
    taskIds: string[],
    draggedListId: string,
    draggedCardId: string,
    isLoading: boolean
}

export type ColumnDragItem = 
    {
        id: string,
        title: string,
        type: 'COLUMN'
    }

export type CardDragItem = 
    {
        id: string,
        columnId: string,
        text: string,
        type: 'CARD',
    }

export type DragItem = ColumnDragItem | CardDragItem
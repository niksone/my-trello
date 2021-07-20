
export interface Task {
    text: string,
    completed: boolean,
    _id: string
}

export interface SimpleCardI {
    title: string,
    subtitle: string,
    description: string,
    tasks: Task[]
}

export interface CardI extends SimpleCardI{
    _id: string,
}

export interface List {
    _id: string,
    title: string,
    cards: CardI[],
}

export interface handleItemsState {
    _id: string,
    name: string,
    lists: List[],
    cardIds: string[],
    isLoading?: boolean
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
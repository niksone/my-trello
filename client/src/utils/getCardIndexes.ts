import { Card, List } from "../redux/AddItem/interfaces"

export const getMoveIndexes = <T extends List>(
    lists: T[], destDroppableId: string, sourceDroppableId: string, 
    sourceIndex: number, destIndex: number, cardIds: string[]
) => {
    const destArrIndex = lists.findIndex((list: List) => list._id === destDroppableId)
    const sourceArrIndex = lists.findIndex((list: List) => list._id === sourceDroppableId)
    
    const sourceCardIndex = lists[sourceArrIndex].cards.findIndex(
        (card: Card) => card._id === cardIds[sourceIndex]
    )

    const destCardIndex = lists[destArrIndex].cards.findIndex(
        (card: Card) => card._id === (cardIds[destIndex] && cardIds[destIndex])
    )

    return {destArrIndex, sourceArrIndex, sourceCardIndex, destCardIndex}
}
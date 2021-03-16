import { List, Task } from "../redux/AddItem/interfaces"

export const getMoveIndexes = <T extends List>(
    lists: T[], destDroppableId: string, sourceDroppableId: string, 
    sourceIndex: number, destIndex: number, taskIds: string[]
) => {
    const destArrIndex = lists.findIndex((list: List) => list._id === destDroppableId)
    const sourceArrIndex = lists.findIndex((list: List) => list._id === sourceDroppableId)
    
    const sourceTaskIndex = lists[sourceArrIndex].tasks.findIndex(
        (task: Task) => task._id === taskIds[sourceIndex]
    )

    const destTaskIndex = lists[destArrIndex].tasks.findIndex(
        (task: Task) => task._id === (taskIds[destIndex] && taskIds[destIndex])
    )

    return {destArrIndex, sourceArrIndex, sourceTaskIndex, destTaskIndex}
}

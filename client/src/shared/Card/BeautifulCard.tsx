import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { Task } from '../../redux/reducer'
import { RootReducerType } from '../../redux/store'
import { CardContainer } from './CardElements'


interface CardPropsI {
    taskId: string,
    task: Task,
    // taskIds: string[],
}

const BeautifulCard = ({taskId, task}: CardPropsI) => {
  const {taskIds} = useSelector((state: RootReducerType) => state.addItem)
  const index = taskIds.findIndex(task => task === taskId)

    return (
        <Draggable draggableId={taskId} index={index} key={taskId}>
        {(provided, snapshot) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {task.text}
          </CardContainer>
        )}
      </Draggable>
    )
}

export default BeautifulCard

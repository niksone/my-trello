import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { Task } from '../../redux/reducer'
import { RootReducerType } from '../../redux/store'
import ResizableTextArea from '../ResizableTextArea'
import { CardContainer, EditButton } from './CardElements'


interface CardPropsI {
    taskId: string,
    task: Task,
    // taskIds: string[],
}

const BeautifulCard = ({taskId, task}: CardPropsI) => {
  const {taskIds} = useSelector((state: RootReducerType) => state.addItem)
  const index = taskIds.findIndex(task => task === taskId)
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

    return (
        <Draggable draggableId={taskId} index={index} key={taskId}>
        {(provided, snapshot) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {!isEdit 
              ? task.text
              : <ResizableTextArea />
            }
            <EditButton onClick={handleEdit}/>
          </CardContainer>
        )}
      </Draggable>
    )
}

export default BeautifulCard

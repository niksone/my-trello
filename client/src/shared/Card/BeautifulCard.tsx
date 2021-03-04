import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import { Task } from '../../redux/reducer'
import { RootReducerType } from '../../redux/store'
import ResizableTextArea from '../ResizableTextArea'
import { CardContainer, EditButton } from './CardElements'
import EditCard from './EditCard'


interface CardPropsI {
    taskId: string,
    task: Task,
    listId: string
    // taskIds: string[],
}

const BeautifulCard = ({taskId, task, listId}: CardPropsI) => {
  const {taskIds} = useSelector((state: RootReducerType) => state.addItem)
  const index = taskIds.findIndex(task => task === taskId)
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

    return (
        <Draggable draggableId={taskId} index={index} key={taskId}>
        {(provided, snapshot) => (
          !isEdit 
          ? <CardContainer
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          > 
            {task.text}
            <EditButton onClick={handleEdit}/>
          </CardContainer>
          :  <EditCard taskId={taskId} listId={listId} text={task.text}/>

        )}
      </Draggable>
    )
}

export default BeautifulCard

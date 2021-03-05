import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Task } from '../../redux/reducer'
import { RootReducerType } from '../../redux/store'
import EditableItem from '../EditableItem'
import ResizableTextArea from '../ResizableTextArea'
import { CardContainer } from './CardElements'
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
  const dispatch = useDispatch()

  const editCard = (text: string) => {
    dispatch({type: 'EDIT_CARD', payload: {listId, taskId, text}})
  }

  const deleteCard = () => {
      dispatch({type: 'DELETE_CARD', payload: {listId, taskId}})
  }

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

    return (
        <Draggable draggableId={taskId} index={index} key={taskId}>
        {(provided, snapshot) => (
          <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        > 
            <EditableItem
              deleteItem={deleteCard}
              editItem={editCard}
              initialText={task.text}
              Wrapper={CardContainer}
            >
                {task.text}
            </EditableItem>
          </div>

          // !isEdit 
          // ? <CardContainer
          //   ref={provided.innerRef}
          //   {...provided.dragHandleProps}
          //   {...provided.draggableProps}
          // > 
          //   {task.text}
          //   <EditButton onClick={handleEdit}/>
          // </CardContainer>
          // :  <EditCard taskId={taskId} listId={listId} text={task.text}/>

        )}
      </Draggable>
    )
}

export default BeautifulCard

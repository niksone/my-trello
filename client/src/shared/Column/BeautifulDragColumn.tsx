import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import Column, { ColumnProps } from '.'
import { List, Task } from '../../redux/AddItem/reducer'
import AddNewItem from '../AddNewItem'
import BeautifulCard from '../Card/BeautifulCard'
import { CardContainer } from '../Card/CardElements'
import EditableItem from '../EditableItem'
import { ColumnCardContainer, ColumnCardWrapper, ColumnContainer, ColumnTitle, ColumnTitleContainer, ColumnWrapper } from './ColumnElements'

interface ColumnPropsI {
    title?: string,
    id: string,
    list: List,
    index: number,
    taskIds: string[],
    tasks: Task[],
    onAdd(text: string): any,
}

const BeautifulDragColumn = ({title, id, list, index, taskIds, tasks, onAdd}: ColumnPropsI) => {
    const [dragBlocking, setDragBlocking] = useState(false);
    console.log(index);
    const dispatch = useDispatch()

    const deleteList = () => {
      dispatch({type: 'DELETE_LIST', payload: {listId: list.id}})
    }

    const editList = (text: string) => {
      dispatch({type: 'EDIT_LIST', payload: {listId: list.id, text}})

    }
    
    return (
        <Draggable draggableId={list.id} index={index} key={list.id}>
                {(provided, snapshot) => (
                  <ColumnContainer
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <Droppable droppableId={list.id}>
                      {(provided, snapshot) => (
                        <ColumnWrapper
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                
                          <EditableItem
                              deleteItem={deleteList}
                              editItem={editList}
                              initialText={list.title}
                              Wrapper={ColumnTitleContainer}
                          >
                            <ColumnTitle>{list.title}</ColumnTitle>
                          </EditableItem>                        
                          <ColumnCardContainer >
                            <ColumnCardWrapper>
                            {tasks.map((task: any, index: number) => (
                                <BeautifulCard 
                                  taskId={task.id}
                                  task={task}
                                  key={task.id}
                                  listId={id}
                                />
                            ))}
                            {provided.placeholder}
                            </ColumnCardWrapper>
                            <AddNewItem 
                              text='Add New Task' 
                              formText='Add Task' 
                              onAdd={text => onAdd(text)}
                              item='COLUMN'
                            />
                          </ColumnCardContainer>
                        </ColumnWrapper>
                      )}
                    </Droppable>
                  </ColumnContainer>
                )}
            </Draggable>
    )
}

export default BeautifulDragColumn

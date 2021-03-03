import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Task } from '../../redux/reducer'
import { moveItem } from '../../utils/moveItem'
// import { moveItem, Task } from '../../redux/reducer'
import { moveItemBetweenLists } from '../../utils/moveItemBetweenLists'
import AddNewItem from '../AddNewItem'
import BeautifulDragColumn from '../Column/BeautifulDragColumn'
import { BoardContainer } from './BoardContainer'
import {BoardProps} from './index'

export const BoardColumnContainer = styled.div`
  display: flex;
  height: 100%;
`

const BeautifulBoard = ({data}: BoardProps) => {
    const dispatch = useDispatch()
    const {lists, taskIds} = data

  
    const handleDrop = (res: any) => {
      const {destination, source, draggableId, type} = res
      if(!destination || !source) return
      if(destination.index === source.index && destination.droppableId === source.droppableId){
        return
      } 
      if(type === 'COLUMN'){
        const sourceIndex = source.index
        const destIndex = destination.index
        dispatch({type: 'MOVE_LIST', payload: {sourceIndex, destIndex}})
        return 
      }else{
        const sourceDroppableId = source.droppableId
        const destDroppableId = destination.droppableId
        const sourceIndex = source.index
        const destIndex = destination.index
        dispatch({type: 'MOVE_CARD', payload: {sourceDroppableId, destDroppableId, sourceIndex, destIndex}})
      }
    }

    return (
      <BoardContainer>
        <DragDropContext onDragEnd={res => handleDrop(res)}>
          <Droppable droppableId='droppable' type='COLUMN' direction='horizontal' >
            {(provided, snapshot) => (
              <BoardColumnContainer 
                // style={{display:'flex'}}               
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {lists.map((list, index) => (
                  <BeautifulDragColumn 
                    list={list}
                    index={index}
                    key={list.id}
                    tasks={list.tasks}
                    taskIds={taskIds}
                    onAdd={(text: string)=>dispatch({type: 'ADD_TASK', payload: {text, listId: list.id}})}
                  />
                ))}
                {provided.placeholder}
              </BoardColumnContainer>
              )}
          </Droppable>
      </DragDropContext>
        <AddNewItem
          onAdd={text => dispatch({type: "ADD_LIST", payload: text})} 
          text='Add New List +'
          formText='Add List'
          item='ADDITEM'
        />
      </BoardContainer>
    )
}

export default BeautifulBoard

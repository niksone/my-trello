import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addList, addTask, moveList, moveTask } from '../../redux/AddItem/actionCreators'
import { AddItemState, List } from '../../redux/AddItem/interfaces'
import AddNewItem from '../AddNewItem'
import BeautifulDragColumn from '../Column/BeautifulDragColumn'
import { BoardContainer } from './BoardContainer'

export const BoardColumnContainer = styled.div`
  display: flex;
  height: 100%;
`
export interface BoardProps {
  data: AddItemState
}

const BeautifulBoard = ({data}: BoardProps) => {
    const dispatch = useDispatch()
    const {lists, taskIds, _id} = data
    const boardId = _id

  
    const handleDrop = (res: any) => {
      const {destination, source, draggableId, type} = res
      if(!destination || !source) return
      if(destination.index === source.index && destination.droppableId === source.droppableId){
        return
      } 
      if(type === 'COLUMN'){
        const sourceIndex = source.index
        const destIndex = destination.index
        dispatch(moveList(boardId, sourceIndex, destIndex))
        return 
      }else{
        const sourceDroppableId = source.droppableId
        const destDroppableId = destination.droppableId
        const sourceIndex = source.index
        const destIndex = destination.index
        dispatch(moveTask(boardId, data, sourceDroppableId, sourceIndex, destDroppableId, destIndex))
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
                {lists?.map((list: List, index: number) => (
                  <BeautifulDragColumn 
                    list={list}
                    index={index}
                    key={list._id}
                    tasks={list.tasks}
                    taskIds={taskIds}
                    id={list._id}
                    onAdd={(text: string)=>dispatch(addTask(_id, list._id, text))}
                  />
                ))}
                {provided.placeholder}
              </BoardColumnContainer>
              )}
          </Droppable>
      </DragDropContext>
        <AddNewItem
          onAdd={text => dispatch(addList( _id,text))} 
          text='Add New List +'
          formText='Add List'
          item='CARD'
        />
      </BoardContainer>
    )
}

export default BeautifulBoard

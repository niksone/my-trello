import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addList, addCard, moveList, moveCard } from '../../redux/AddItem/actionCreators'
import { AddItemState, List } from '../../redux/AddItem/interfaces'
import AddNewItem from '../AddNewItem'
import Button from '../Buttons'
import BeautifulDragColumn from '../Column/BeautifulDragColumn'
import { ColumnContainer, ColumnWrapper } from '../Column/ColumnElements'
import { AddColumnContainer, BoardContainer } from './BoardContainer'
import AddIcon from '../icons/Add/AddIcon'
import AddNewItemBtn from '../AddNewItem/AddNewItemBtn'
import AddItemForm from '../AddNewItem/AddItemForm'
import { useRef, useState } from 'react'
import { Modal, ModalHandle } from '../Modal'
import { addBoard } from '../../redux/Board/actionCreators'

export const BoardColumnContainer = styled.div<BoardColumnWrapperProps>`
  display: flex;
  height: 100%;
  position: relative;

  & > div{
    margin: 0 8px;
    /* position: absolute;
    top: 0;
    left: 0;
    transform: translateX(${({count}) => count ? `${count * 100}%` + `${4 * count}px` : 0}); */
  } 

  @media screen and (max-width:425px){
    & > div{
      margin: 0 calc((100vw - (100vw - 40px)) / 2);
    }

    & > div:first-child{
      margin-left: 0;
    }
  }
`

interface BoardColumnWrapperProps {
  count?: number,
  isDragging?: boolean,
  isOver?: boolean
}

export const BoardColumnWrapper = styled.div<BoardColumnWrapperProps>`
    ${({isDragging, isOver, count}) => !isDragging && count && `
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transform: translateX(calc(${count * 100}% + ${16 * count}px));
      z-index: 0;
  `}
`

export interface BoardProps {
  data: AddItemState
}

const BeautifulBoard = ({data}: BoardProps) => {
    const dispatch = useDispatch()
    const {lists, cardIds, _id} = data
    const boardId = _id
    const [showModal, setShowModal] = useState(false)

    const modalRef = useRef<ModalHandle>(null)

    const handleAddItem = (text: string) => {
      dispatch(addList(boardId, text))
      setShowModal(false)
    }

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
        dispatch(moveCard(boardId, data, sourceDroppableId, sourceIndex, destDroppableId, destIndex))
      }
    }

    return (
      <BoardContainer>
        <DragDropContext onDragEnd={res => handleDrop(res)}>
          <Droppable droppableId='droppable' type='COLUMN' direction='horizontal' >
            {(provided, snapshot) => (
              <BoardColumnContainer 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {lists?.map((list: List, index: number) => (
                  // <BoardColumnWrapper count={index} key={list._id}>
                    <BeautifulDragColumn 
                      list={list}
                      index={index}
                      cards={list.cards}
                      cardIds={cardIds}
                      id={list._id}
                      key={list._id}
                      onAdd={(text: string)=>dispatch(addCard(_id, list._id, text))}
                    />
                  // </BoardColumnWrapper>
                ))}
                {provided.placeholder}
              </BoardColumnContainer>
              )}
          </Droppable>
      </DragDropContext>
      <BoardColumnContainer>
        {/* <BoardColumnWrapper count={lists.length - 1}> */}
          <ColumnWrapper>
            <AddColumnContainer>
            <Button 
                widthFill 
                Icon={AddIcon}
                onClick={() => setShowModal(true)}
                variant='unstyle'
                fw='700'
            >
                ADD NEW LIST
            </Button>
            {
            showModal && 
                <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                    <AddItemForm btnItem='ADD' item='FORM' title='add list' onAdd={(title: string) => handleAddItem(title)} /> 
                </Modal>
            }
            </AddColumnContainer>
          </ColumnWrapper>
        {/* </BoardColumnWrapper> */}
      </BoardColumnContainer>
      </BoardContainer>
    )
}

export default BeautifulBoard

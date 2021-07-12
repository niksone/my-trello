import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addList, addCard, moveList, moveCard } from '../../redux/AddItem/actionCreators'
import { AddItemState, List } from '../../redux/AddItem/interfaces'
import AddNewItem from '../AddNewItem'
import Button from '../Buttons'
import BeautifulDragColumn from '../Column/BeautifulDragColumn'
import { ColumnContainer, ColumnWrapper } from '../Column/ColumnElements'
import { AddColumnContainer, BoardContainer, BoardWrapper } from './BoardContainer'
import AddIcon from '../icons/Add/AddIcon'
import AddNewItemBtn from '../AddNewItem/AddNewItemBtn'
import AddItemForm from '../AddNewItem/AddItemForm'
import { Ref, useEffect, useRef, useState } from 'react'
import { Modal, ModalHandle } from '../Modal'
import { addBoard } from '../../redux/Board/actionCreators'
import { BoardSectionWrapper } from '../../BoardPage'

import {debounce} from '../../utils/debounce'
import ButtonGroup from '../Buttons/ButtonGroup'
import ArrowIcon from '../icons/Arrow/Arrow'
import { ShowContainer } from '../../HomePage/HomePageElements'

export const BoardColumnContainer = styled.div<BoardColumnWrapperProps>`
  display: flex;
  height: 100%;
  position: relative;

  & > div{
    margin: 0 8px;
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
  display: flex;
  flex-direction: column;
`

export const BoardFooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 32px 20px;
  background-color: #fff;
`

const BoardFooterTitle = styled.h4`
  font-size: var(--text-h4);
`

const BoardFooterNav = styled.div`

`

export interface BoardProps {
  data: AddItemState
}

interface BoardRef extends HTMLDivElement {
  initialScroll: number
}

const BeautifulBoard = ({data}: BoardProps) => {
    const dispatch = useDispatch()
    const {lists, cardIds, _id} = data
    const boardId = _id
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef<ModalHandle>(null)

    const boardRef = useRef<BoardRef>(null)

    const handleAddItem = (text: string) => {
      dispatch(addList(boardId, text))
      setShowModal(false)
    }

    const [currentListId, setCurrentListId] = useState('')

    const handleDrop = (res: any) => {
      const {destination, source, draggableId, type} = res
      if(!destination || !source) return
      if(destination.index === source.index && destination.droppableId === source.droppableId){
        return
      } 
      if(type === 'COLUMN'){
        return dispatch(moveList(boardId, source.index, destination.index))
      }else{
        const sourceDroppableId = source.droppableId
        const destDroppableId = destination.droppableId
        const sourceIndex = source.index
        const destIndex = destination.index
        dispatch(moveCard(boardId, data, sourceDroppableId, sourceIndex, destDroppableId, destIndex))
      }
    }

    const slide = (index: number) => {
      if(lists[index]){
        boardRef.current?.scrollTo({
          left: window.innerWidth * (index)| 0,
          behavior: 'smooth'
        })
        setCurrentListId(prev => lists[index]._id)
      }
    }

    const findListIndex = () => {
      return lists.findIndex(list => list._id === currentListId)
    }

    const getPosition = (posLists: List[]) => {
      if( boardRef.current && boardRef.current?.scrollLeft !== null){
        const currentScrollPosition = Math.floor(boardRef.current.scrollLeft)
        const initialScrollPosition = Math.floor(boardRef.current.initialScroll)

        if(currentScrollPosition === initialScrollPosition) return

        const breakpoints = posLists.map((list, index, arr) => ({
          scrollStart: index * window.innerWidth,
          scrollEnd: (index) * window.innerWidth + 50 ,
        }))

        breakpoints.forEach((breakpoint, index, arr) => {
          if(breakpoint.scrollEnd < currentScrollPosition && arr[index + 1].scrollStart > currentScrollPosition && currentScrollPosition > initialScrollPosition){
              return slide(index + 1)
          } 

          if(breakpoint.scrollStart - 50 >= currentScrollPosition && arr[index - 1].scrollEnd < currentScrollPosition  && currentScrollPosition < initialScrollPosition) {
            return slide(index - 1)
          }

          if (breakpoint.scrollStart - 50 <= currentScrollPosition && breakpoint.scrollEnd + 50 >= currentScrollPosition){
            return slide(index)
          }
        })

        console.log(currentScrollPosition, boardRef.current.initialScroll, breakpoints)
      }
    }

    const checkPos = () => {
      boardRef.current && (boardRef.current.initialScroll = boardRef.current?.scrollLeft )
    }

    useEffect(() => {
      const debounceFunc = debounce(() => getPosition(lists), 100)
      console.log('board')
        

      if(window.innerWidth <= 425){
        console.log(lists, 'lists')
        setCurrentListId(prev => lists[0]?._id || prev)
        checkPos()
        getPosition(lists)  
        boardRef.current?.addEventListener('touchstart',checkPos, {passive: true  })
       

        boardRef.current?.addEventListener('scroll', debounceFunc)
        console.log(currentListId);
      }

      return () => {
        boardRef.current?.removeEventListener('scroll', debounceFunc)
        boardRef.current?.removeEventListener('touchstart', checkPos)
      }
    }, [lists])

    return (
      <>
      <BoardSectionWrapper ref={boardRef}>
        <BoardContainer >
          <DragDropContext onDragEnd={res => handleDrop(res)}>
            <Droppable droppableId='droppable' type='COLUMN' direction='horizontal' >
              {(provided, snapshot) => (
                <BoardColumnWrapper
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  
                >
                  <BoardColumnContainer>
                  {lists?.map((list: List, index: number) => (
                      <BeautifulDragColumn 
                        list={list}
                        index={index}
                        cards={list.cards}
                        cardIds={cardIds}
                        id={list._id}
                        key={list._id}
                        onAdd={(text: string)=>dispatch(addCard(_id, list._id, text))}
                      />
                  ))}
                  {provided.placeholder}
                  </BoardColumnContainer>
                </BoardColumnWrapper>
                )}
            </Droppable>
        </DragDropContext>

        <ShowContainer mobile={false} show={true}>
          <BoardColumnContainer>
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
          </BoardColumnContainer>
        </ShowContainer>

        </BoardContainer>
      </BoardSectionWrapper>
        <ShowContainer mobile={true} show={true}>
          <BoardFooterContainer>
            <BoardFooterTitle>{lists[findListIndex()]?.title}</BoardFooterTitle>
            <BoardFooterNav>
              <ButtonGroup spacing={2} widthFill={false}>
                <Button shape='icon' size='lg' variant='outline'
                  onClick={() => slide(findListIndex() - 1)}
                >
                  <ArrowIcon direction='left'/>
                </Button>
                <Button shape='icon' size='lg' variant='outline'
                  onClick={() => slide(findListIndex() + 1)}

                >
                  <ArrowIcon direction='right'/>
                </Button>
              </ButtonGroup>
            </BoardFooterNav>
          </BoardFooterContainer>
        </ShowContainer>

      </>
    )

}

export default BeautifulBoard

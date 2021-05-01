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
import { useSwipeable } from 'react-swipeable'
import { ShowContainer } from '../../HomePage'
import { BoardSectionWrapper } from '../../BoardPage'

import {debounce} from 'lodash'
import ButtonGroup from '../Buttons/ButtonGroup'
import ArrowIcon from '../icons/Arrow/Arrow'

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
  display: flex;
  flex-direction: column;
    /* ${({isDragging, isOver, count}) => !isDragging && count && `
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transform: translateX(calc(${count * 100}% + ${16 * count}px));
      z-index: 0;
  `} */
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

    const slide = (index: any) => {
      if(lists[index]){
        boardRef.current?.scrollTo({
          top: 0,
          left: window.innerWidth * (index)| 0,
          behavior: 'smooth'
        })
        setCurrentListId(prev => lists[index]._id)
      }
    }

    const findListIndex = () => {
      return lists.findIndex(list => list._id === currentListId)
    }

    const getDirection = (start: number, end: number) => {
      console.log('sign',Math.sign(end - start), end, start);
      return Math.sign(end - start)
    }

    const getPosition = (posLists: List[]) => {
      // console.log(boardRef.current, boardRef.current?.scrollLeft);
      if( boardRef.current && boardRef.current?.scrollLeft !== null){
        const currentScrollPosition = Math.floor(boardRef.current.scrollLeft)
        const initialScrollPosition = Math.floor(boardRef.current.initialScroll)

        if(currentScrollPosition === initialScrollPosition) return
        // console.log(currentScrollPosition)

        const breakpoints = posLists.map((list, index, arr) => ({
              scrollStart: index * window.innerWidth,
              scrollEnd: (index) * window.innerWidth + 50 ,
            }))
          // : lists.map((list, index, arr) => ({
          //   scrollStart: (iwwndex + 1) * window.innerWidth - 50,
          //   scrollEnd: (index) * window.innerWidth ,
          // }))
        
        // console.log('start');
        // console.log(breakpoints);
        // if(breakpoints.map(breakpoint => breakpoint.scrollStart).includes(undefined))
        breakpoints.forEach((breakpoint, index, arr) => {
          // console.log(breakpoint.scrollStart, breakpoint.scrollEnd, currentScrollPosition);
          if(breakpoint.scrollEnd < currentScrollPosition && arr[index + 1].scrollStart > currentScrollPosition && currentScrollPosition > initialScrollPosition){
              slide(index + 1)
              return
          } 

          else if(breakpoint.scrollStart - 50 >= currentScrollPosition && arr[index - 1].scrollEnd < currentScrollPosition  && currentScrollPosition < initialScrollPosition) {
            slide(index - 1)
            // setCurrentListId(prev => lists[index - 1]._id)
            return
          }

            if (breakpoint.scrollStart - 50 <= currentScrollPosition && breakpoint.scrollEnd + 50 >= currentScrollPosition){
              slide(index)
              return
            }
          })

        console.log(currentScrollPosition, boardRef.current.initialScroll, breakpoints)
      }
    }

    const checkPos = () => {
      // setCurrentScroll(prev => boardRef.current?.scrollLeft || prev)
      boardRef.current && (boardRef.current.initialScroll = boardRef.current?.scrollLeft )
      // alert( boardRef.current?.scrollLeft +  'curr scroll')
    }

    useEffect(() => {
      const debounceFunc = debounce(() => getPosition(lists), 100)
        // debounce(( ) => {}, 100, { 'leading': true, 'trailing': false })
        

      if(window.innerWidth <= 425){
        console.log(lists, 'lists')
        // slide(lists.length - 1)
        checkPos()
        getPosition(lists)  
        boardRef.current?.addEventListener('touchstart',checkPos, {passive: true  })
       

        boardRef.current?.addEventListener('scroll', debounceFunc)
        console.log(currentListId);
      }

      return () => {
        boardRef.current?.removeEventListener('scroll', debounceFunc)
        // boardRef.current?.removeEventListener('touchstart', checkPos)
      }
    }, [lists])

    return (
      <>
      <BoardSectionWrapper
      //  {...handlers}  ref={e => refPassthrough(e as HTMLElement)} 
      ref={boardRef}
       >
        <BoardContainer >
          {/* <BoardWrapper> */}
          <DragDropContext onDragEnd={res => handleDrop(res)}>
            <Droppable droppableId='droppable' type='COLUMN' direction='horizontal' >
              {(provided, snapshot) => (
                <BoardColumnWrapper
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  
                >
                  <BoardColumnContainer>
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
                </BoardColumnWrapper>
                )}
            </Droppable>
        </DragDropContext>
        <ShowContainer mobile={false} show={true}>
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
        </ShowContainer>
        {/* </BoardWrapper> */}
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

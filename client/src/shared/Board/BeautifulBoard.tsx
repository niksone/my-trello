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
import { FormBlock, FormBlockTitle } from '../Column/AddCardForm'
import { BoardSectionWrapper } from '../../BoardPage'

import _ from 'lodash'
import e from 'express'

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

export const BoardColumnFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 0 32px 0;
  background-color: #fff;
`

export interface BoardProps {
  data: AddItemState
}

const BeautifulBoard = ({data}: BoardProps) => {
    const dispatch = useDispatch()
    // const boardRef = useRef<HTMLDivElement>(null)
    const {lists, cardIds, _id} = data
    const boardId = _id
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef<ModalHandle>(null)

    const boardRef = useRef<HTMLDivElement>(null)

    const handleAddItem = (text: string) => {
      dispatch(addList(boardId, text))
      setShowModal(false)
    }

    const [currentScroll, setCurrentScroll] = useState(0)

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


    const slideListNext = () => {
      const currListIndex = lists.findIndex(list => list._id === currentListId)
      const resultListIndex = currListIndex + 1 < lists.length ? currListIndex + 1 : currListIndex

      // if(myRef.current){ 

      //   myRef.current.scrollTo({
      //     top: 0,
      //     left: window.innerWidth * resultListIndex | 0,
      //     behavior: 'smooth'
      //   })
      // }
      return lists[resultListIndex]?._id
    }

    const slideListPrev = () => {
      const currListIndex = lists.findIndex(list => list._id === currentListId)
      const resultListIndex = currListIndex - 1 >= 0 ? currListIndex - 1 : currListIndex
      
      // if(myRef.current){ 

      //   myRef.current.scrollTo({
      //     top: 0,
      //     left: window.innerWidth * resultListIndex | 0,
      //     behavior: 'smooth'
      //   })
      // }
      return lists[resultListIndex]._id
    }

    const findListIndex = () => {
      console.log(lists.findIndex(list => list._id === currentListId));

      return lists.findIndex(list => list._id === currentListId)
    }
    
    // // const scrollListPosition = () => {
      
    // // }

    // const myRef = useRef<HTMLElement>()


    // const scroll = (direction: 'prev' | 'next') => {
    //   console.log(`slide ${direction}`);

    //   // dispatch(slide(direction))

    //     direction === 'prev' && setCurrentListId(prev => slideListPrev())
    //     direction === 'next' && setCurrentListId(prev => slideListNext())
      
    //   setTimeout(
    //     () => console.log(myRef.current?.scrollLeft, window.innerWidth, window.innerWidth * findListIndex())
    //   ,1000)
    
    //   }

    // const handlers = useSwipeable({
    //   onSwipedRight: (eventData) => scroll('prev'),
    //   onSwipedLeft: (eventData) => scroll('next'),
    //   // onSwiped: (eventData) => console.log(`User Swiped!, ${eventData}`),
    //   preventDefaultTouchmoveEvent: true,
    //   trackTouch: true
    // })

    // const refPassthrough = (el: HTMLElement) => {
    //   // call useSwipeable ref prop with el
    //   handlers.ref(el);
  
    //   // set myRef el so you can access it yourself
    //   myRef.current = el;
    // }

    const getPosition = () => {
      if( boardRef.current && boardRef.current?.scrollLeft){
        const currentScrollPosition = boardRef.current.scrollLeft
        if(currentScrollPosition === currentScroll) return
        console.log(currentScrollPosition);
        const breakpoints = lists.map((list, index, arr) => ({
          scrollStart: index * window.innerWidth,
          scrollEnd: (index + 1) * window.innerWidth - window.innerWidth / 2,
        }))
        
        breakpoints.forEach((breakpoint, index, arr) => {
          if(breakpoint.scrollEnd < currentScrollPosition && arr[index + 1].scrollStart > currentScrollPosition ){
              boardRef.current?.scrollTo({
                top: 0,
                left: window.innerWidth * (index +1 )| 0,
                behavior: 'smooth'
              })
              setCurrentListId(prev => lists[index + 1]._id)
          } 

          if (breakpoint.scrollStart < currentScrollPosition && breakpoint.scrollEnd > currentScrollPosition){
            boardRef.current?.scrollTo({
              top: 0,
              left: window.innerWidth * (index)| 0,
              behavior: 'smooth'
            })
            setCurrentListId(prev => lists[index]._id)
          }
          // else{
          //   boardRef.current?.scrollTo({
          //     top: 0,
          //     left: window.innerWidth * index| 0,
          //     behavior: 'smooth'
          //   })                
          // }
          setCurrentScroll(prev => boardRef.current?.scrollLeft || prev)
        })
        console.log(currentScrollPosition, breakpoints)
      }
    }

    useEffect(() => {
      setCurrentListId(prev => lists.length > 0 ? lists[0]._id : '')
      boardRef.current?.addEventListener('scroll',
        _.debounce(() => {}, 100,
        { 'leading': true, 'trailing': false })
      ) 

      boardRef.current?.addEventListener('scroll',
      _.debounce(getPosition, 100,
      )
    ) 
    }, [lists])

    return (
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
                  <BoardColumnFooter>
                    <ShowContainer mobile={true} show={true}>
                      <FormBlock><FormBlockTitle>jopa {lists[findListIndex()]?.title}</FormBlockTitle></FormBlock>
                    </ShowContainer>
                  </BoardColumnFooter>
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
    )
}

export default BeautifulBoard

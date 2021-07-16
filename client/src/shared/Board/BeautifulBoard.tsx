import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { addList, addCard, moveList, moveCard } from '../../redux/AddItem/actionCreators'
import { AddItemState, List } from '../../redux/AddItem/interfaces'
import Button from '../Buttons'
import BeautifulDragColumn from '../Column/BeautifulDragColumn'
import { ColumnWrapper } from '../Column/ColumnElements'
import AddIcon from '../icons/Add/AddIcon'
import AddItemForm from '../AddNewItem/AddItemForm'
import { useEffect, useRef, useState } from 'react'
import { Modal, ModalHandle } from '../Modal'

import {debounce} from '../../utils/debounce'
import ButtonGroup from '../Buttons/ButtonGroup'
import ArrowIcon from '../icons/Arrow/Arrow'
import { ShowContainer } from '../../HomePage/HomePageElements'
import { BoardSectionWrapper } from '../../BoardSection/BoardElements'
import { AddColumnContainer, BoardColumnContainer, BoardColumnWrapper, BoardContainer, BoardFooterContainer, BoardFooterNav, BoardFooterTitle } from './BoardElements'
import { isMobileWidth } from '../constants'



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

    const handleDrop = (res: DropResult) => {
      const {destination, source, type} = res
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

    const setPos = () => {
      boardRef.current && (boardRef.current.initialScroll = boardRef.current?.scrollLeft )
    }

    useEffect(() => {
      const ref = boardRef.current

      const debounceFunc = debounce(() => getPosition(lists), 100)

      if(isMobileWidth){
        console.log(lists, 'lists')

        setCurrentListId(prev => lists[0]?._id || prev)
        setPos()
        getPosition(lists)  

        ref?.addEventListener('touchstart',setPos, {passive: true  })
        ref?.addEventListener('scroll', debounceFunc)

        console.log(currentListId);
      }


      return () => {
        ref?.removeEventListener('scroll', debounceFunc)
        ref?.removeEventListener('touchstart', setPos)
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
                    Icon={<AddIcon />}
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

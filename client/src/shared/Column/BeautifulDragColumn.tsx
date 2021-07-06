import { MutableRefObject, useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ShowContainer } from '../../HomePage'
import { addCard, deleteList, updateListTitle } from '../../redux/AddItem/actionCreators'
import { Card, List, SimpleCard, Task } from '../../redux/AddItem/interfaces'
import { RootReducerType } from '../../redux/store'
import AddNewItem from '../AddNewItem'
import AddNewItemBtn from '../AddNewItem/AddNewItemBtn'
import { BoardColumnWrapper } from '../Board/BeautifulBoard'
import Button from '../Buttons'
import BeautifulCard from '../Card/BeautifulCard'
import { CardContainer } from '../Card/CardElements'
import EditableItem from '../EditableItem'
import CardForm from '../Forms/CardForm'
import AddIcon from '../icons/Add/AddIcon'
import {Modal, ModalHandle } from '../Modal'
import { AddCardContainer, ColumnCardContainer, ColumnCardWrapper, ColumnContainer, ColumnTitle, ColumnTitleContainer, ColumnWrapper } from './ColumnElements'

interface ColumnPropsI {
    title?: string,
    id: string,
    list: List,
    index: number,
    cardIds: string[],
    cards: Card[],
    onAdd(text: string): void,
}

const BeautifulDragColumn = ({title, id, list, index, cardIds, cards, onAdd}: ColumnPropsI) => {
    const boardId = useSelector((state: RootReducerType) => state.addItem)._id
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const modalRef = useRef<ModalHandle>(null)

    // type ModalHandle = React.ElementRef<typeof Modal>;


    const handleDeleteList = () => {
      dispatch(deleteList(boardId, id))
    }

    const editList = (title: string) => {
      dispatch(updateListTitle(boardId, list._id, title))
    }
    
    return (
      // <div>
        <Draggable 
          draggableId={list._id} 
          index={index} key={list._id}
          
        >
            {(provided, snapshot) => (
                  <ColumnContainer
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                        <ColumnWrapper

                        >
                          <ColumnTitleContainer>
                          <ColumnTitle>
                            <EditableItem
                              deleteItem={handleDeleteList}
                              editItem={editList}
                              initialText={list.title}
                              placeholder='Enter List Title'
                              updateItem={(title: string) => dispatch(updateListTitle(boardId, id, title))}
                            />
                          </ColumnTitle>
                          <Button
                              Icon={AddIcon}
                              onClick={() => setShowModal(true)}
                              variant='unstyle'
                              fw='700'
                            >
                              ADD NEW CARD
                            </Button>
                          </ColumnTitleContainer>                     
                        <Droppable droppableId={list._id}>
                          {(provided, snapshot) => (
                            <ColumnCardContainer 
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <ColumnCardWrapper>
                              {
                                cards?.map((card: Card, index: number) => (
                                  <BeautifulCard 
                                    cardId={card._id}
                                    card={card}
                                    key={card._id}
                                    listId={id}
                                  />
                                ))
                              }
                                {provided.placeholder}
                              </ColumnCardWrapper>
                            {
                              showModal &&
                                <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                                  <CardForm 
                                    boardName='Add Card'
                                    title=''
                                    subtitle=''
                                    description=''
                                    columnId={id}
                                    cardId={''}
                                    onSave={
                                      (card: SimpleCard) => 
                                      // {console.log(...Object.values(card))}
                                      dispatch(addCard(boardId, id, card.title, card.subtitle, card.description, card.tasks))
                                    }                                  
                                    onExit={() => modalRef.current.close()}
                                    tasks={[] as Task[]}
                                  />
                                </Modal>
                            }
                          </ColumnCardContainer>
                          )}
                          </Droppable>

                          <ShowContainer show={true} mobile={true}>
                            <AddCardContainer>
                              <Button
                                Icon={AddIcon}
                                onClick={() => setShowModal(true)}
                                variant='dashed'
                                bg='inherit'
                                fw='700'
                                widthFill
                              >
                                ADD NEW CARD
                              </Button>
                            </AddCardContainer>
                          </ShowContainer>
                        </ColumnWrapper>
                  </ColumnContainer>
            )}
        </Draggable>

    )
}

export default BeautifulDragColumn

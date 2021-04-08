import { MutableRefObject, useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { addCard, deleteList, updateListTitle } from '../../redux/AddItem/actionCreators'
import { Card, List, SimpleCard, Task } from '../../redux/AddItem/interfaces'
import { RootReducerType } from '../../redux/store'
import AddNewItem from '../AddNewItem'
import AddNewItemBtn from '../AddNewItem/AddNewItemBtn'
import Button from '../Buttons'
import BeautifulCard from '../Card/BeautifulCard'
import EditableItem from '../EditableItem'
import AddIcon from '../icons/Add/AddIcon'
import {Modal, ModalHandle } from '../Modal'
import CardForm from './AddCardForm'
import { ColumnCardContainer, ColumnCardWrapper, ColumnContainer, ColumnTitle, ColumnTitleContainer, ColumnWrapper } from './ColumnElements'

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
        <Draggable draggableId={list._id} index={index} key={list._id}>
                {(provided, snapshot) => (
                  <ColumnContainer
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <Droppable droppableId={list._id}>
                      {(provided, snapshot) => (
                        <ColumnWrapper
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <ColumnTitleContainer>
                          <ColumnTitle>
                            <EditableItem
                              deleteItem={handleDeleteList}
                              editItem={editList}
                              initialText={list.title}
                              // Wrapper={ColumnTitle}
                              updateItem={(title: string) => dispatch(updateListTitle(boardId, id, title))}
                            />
                          </ColumnTitle>

                              {/* <ColumnTitle>{list.title}</ColumnTitle> */}
                            {/* </EditableItem>    */}
                          </ColumnTitleContainer>                     
                          <ColumnCardContainer >
                            <ColumnCardWrapper>
                            {cards?.map((card: Card, index: number) => (
                                <BeautifulCard 
                                  cardId={card._id}
                                  card={card}
                                  key={card._id}
                                  listId={id}
                                />
                            ))}
                            {provided.placeholder}
                            </ColumnCardWrapper>
                            {/* <AddNewItem 
                              text='Add New Task' 
                              formText='Add Task' 
                              onAdd={text => onAdd(text)}
                              item='COLUMN'
                              Button={<Button>add New Task</Button>}
                            /> */}
                            {/* <AddNewItemBtn 
                              widthFill 
                              Icon={AddIcon} 
                              onAdd={(text: string) => onAdd(text)}
                              title='Add New Card'
                              Form={<CardForm />}
                            >
                                add new card
                            </AddNewItemBtn> */}
                            <Button
                              widthFill 
                              Icon={AddIcon}
                              onClick={() => setShowModal(true)}
                            >
                              add new card
                            </Button>
                            {showModal &&
                              <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                                <CardForm 
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
                        </ColumnWrapper>
                      )}
                    </Droppable>
                  </ColumnContainer>
                )}
            </Draggable>
    )
}

export default BeautifulDragColumn

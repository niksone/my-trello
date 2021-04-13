import { useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCard, updateCard } from '../../redux/AddItem/actionCreators'
import { Card, SimpleCard, Task } from '../../redux/AddItem/interfaces'
import { RootReducerType } from '../../redux/store'
import EditableItem from '../EditableItem'
import ProgressBar from '../ProgressBar'
import { CardProgressContainer, CardContainer, CardContainerBlock, CardDescription, CardSubtitle, CardTitle, CardTitleContainer, CardTitleWrapper, CardProgressInfo, CardProgressLabel, CardProgressStage, CardProgressIcon } from './CardElements'
import {ReactComponent as ChecklistIcon} from '../icons/tasks.svg'
import Button from '../Buttons'
import {ReactComponent as MoreIcon} from '../icons/more.svg'
import {Modal, ModalHandle} from '../Modal'
import CardForm from '../Column/AddCardForm'

interface CardPropsI {
    cardId: string,
    card: Card,
    listId: string
}

export const getCompletedTasks = (tasks: Task[]) => {
  // console.log('completed tasks - ' + JSON.stringify(tasks.filter(task => task.completed === true)));
  return tasks.filter(task => task.completed === true).length
}

const BeautifulCard = ({cardId, card, listId}: CardPropsI) => {
  const {cardIds} = useSelector((state: RootReducerType) => state.addItem)
  const boardId = useSelector((state: RootReducerType) => state.addItem)._id
  const index = cardIds.findIndex(card => card === cardId)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const modalRef = useRef<ModalHandle>(null)

  const editCard = (text: string) => {
    // dispatch(updateTaskText(boardId, listId, taskId, text))
    // dispatch(updateCard(boardId, listId, cardId, card))
  }

  const handleDeleteCard = () => {
    dispatch(deleteCard(boardId, listId, cardId))
  }

  // const handleEdit = () => {
  //   setIsEdit(!isEdit)
  // }

  const handleSave = (savedCard: SimpleCard) => {
    console.log('handlesave');
    dispatch(updateCard(boardId, listId, cardId, {_id: card._id, ...savedCard}))
  }

  const [completedTasks, allTasks] = [getCompletedTasks(card.tasks), card.tasks.length]
  
  // console.log(completedTasks, allTasks);

    return ( 
        <Draggable draggableId={cardId} index={index} key={cardId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          > 
            <CardContainer onClick={() => setShowModal(true)} isDragging={snapshot.isDragging}>
              <CardContainerBlock>
                <CardTitleContainer>
                  <CardTitleWrapper>
                    <CardTitle>{card.title}</CardTitle>
                    <CardSubtitle>{card.subtitle}</CardSubtitle>
                  </CardTitleWrapper>
                  <Button shape='icon' variant='outline' size='lg'>
                    <MoreIcon />
                  </Button>
                </CardTitleContainer>
              </CardContainerBlock>
              {
                card.description !== '' &&
                  <CardContainerBlock>
                    <CardDescription>
                      {card.description}
                    </CardDescription>
                  </ CardContainerBlock>
              }

              {
                card.tasks.length > 0 &&
                  <CardContainerBlock>
                    <CardProgressContainer>
                      <CardProgressInfo>
                        <CardProgressLabel>
                          <CardProgressIcon><ChecklistIcon/></CardProgressIcon>
                          Checklist
                        </CardProgressLabel>
                        <CardProgressStage> {completedTasks} / {allTasks}</CardProgressStage>
                      </CardProgressInfo>
                      <ProgressBar variant='default' value={completedTasks / allTasks * 100}/>
                    </CardProgressContainer>
                  </ CardContainerBlock>
              }
            </CardContainer>
            {showModal &&
              <Modal ref={modalRef} show={showModal} exit={() => setShowModal(false)}>
                <CardForm 
                  columnId={listId}
                  cardId={card._id}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  tasks={card.tasks}
                  onExit={() => modalRef.current.close()}
                  onSave={(savedCard: SimpleCard) => handleSave(savedCard)}
                  
                />
              </Modal>
            }
          </div>
        )}
      </Draggable>
    )
}

export default BeautifulCard

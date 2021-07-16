import { useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCard, updateCard } from '../../redux/HandleItems/actionCreators'
import { Card, SimpleCard, Task } from '../../redux/HandleItems/interfaces'
import { RootReducerType } from '../../redux/store'
import ProgressBar from '../ProgressBar'
import { CardProgressContainer, CardContainer, CardContainerBlock, CardDescription,CardProgressInfo, CardProgressLabel, CardProgressStage, CardProgressIcon } from './CardElements'
import {ReactComponent as ChecklistIcon} from '../icons/tasks.svg'
import {Modal, ModalHandle} from '../Modal'
import CardForm from '../Forms/CardForm'

import CardHeader from './CardHeader'

interface CardPropsI {
    cardId: string,
    card: Card,
    listId: string
}

export const getCompletedTasks = (tasks: Task[]) => {
  return tasks.filter(task => task.completed === true).length
}

const BeautifulCard = ({cardId, card, listId}: CardPropsI) => {
  const {cardIds} = useSelector((state: RootReducerType) => state.addItem)
  const boardId = useSelector((state: RootReducerType) => state.addItem)._id
  const index = cardIds.findIndex(card => card === cardId)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const modalRef = useRef<ModalHandle>(null)

  const handleDeleteCard = () => {
    dispatch(deleteCard(boardId, listId, cardId))
  }

  const handleSave = (savedCard: SimpleCard) => {
    console.log('handlesave');
    dispatch(updateCard(boardId, listId, cardId, {_id: card._id, ...savedCard}))
  }

  const [completedTasks, allTasks] = [getCompletedTasks(card.tasks), card.tasks.length]
  

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
                <CardHeader
                  title={card.title}
                  subtitle={card.subtitle}
                  headerTitle='Edit Card'
                  onClick={() => setShowModal(true)}
                  onDelete={handleDeleteCard}
                />
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
                boardName='Edit Card'
                  columnId={listId}
                  cardId={card._id}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  tasks={card.tasks}
                  onExit={() => modalRef?.current?.close()}
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

import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteList, updateListTitle } from '../../redux/AddItem/actionCreators'
import { List, Task } from '../../redux/AddItem/interfaces'
import { RootReducerType } from '../../redux/store'
import AddNewItem from '../AddNewItem'
import AddNewItemBtn from '../AddNewItem/AddNewItemBtn'
import Button from '../Buttons'
import BeautifulCard from '../Card/BeautifulCard'
import EditableItem from '../EditableItem'
import AddIcon from '../icons/Add/AddIcon'
import CardForm from './AddCardForm'
import { ColumnCardContainer, ColumnCardWrapper, ColumnContainer, ColumnTitle, ColumnTitleContainer, ColumnWrapper } from './ColumnElements'

interface ColumnPropsI {
    title?: string,
    id: string,
    list: List,
    index: number,
    taskIds: string[],
    tasks: Task[],
    onAdd(text: string): void,
}

const BeautifulDragColumn = ({title, id, list, index, taskIds, tasks, onAdd}: ColumnPropsI) => {
    const boardId = useSelector((state: RootReducerType) => state.addItem)._id
    const dispatch = useDispatch()

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
                
                          <EditableItem
                              deleteItem={handleDeleteList}
                              editItem={editList}
                              initialText={list.title}
                              Wrapper={ColumnTitleContainer}
                          >
                            <ColumnTitle>{list.title}</ColumnTitle>
                          </EditableItem>                        
                          <ColumnCardContainer >
                            <ColumnCardWrapper>
                            {tasks?.map((task: Task, index: number) => (
                                <BeautifulCard 
                                  taskId={task._id}
                                  task={task}
                                  key={task._id}
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
                            <AddNewItemBtn 
                              widthFill 
                              Icon={AddIcon} 
                              onAdd={(text: string) => onAdd(text)}
                              title='Add New Card'
                              Form={CardForm}
                            >
                                add new card
                            </AddNewItemBtn>
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

import ObjectID from 'bson-objectid'
import { useState } from 'react'
import { ShowContainer, BoardName, AppContainer, BoardSectionContainer} from '../../../HomePage'
import { Card, SimpleCard, Task } from '../../../redux/AddItem/interfaces'
import AddItemForm from '../../AddNewItem/AddItemForm'
import Button from '../../Buttons'
import ButtonGroup from '../../Buttons/ButtonGroup'
import { getCompletedTasks } from '../../Card/BeautifulCard'
import Checkbox from '../../Checkbox'
import EditableItem from '../../EditableItem'
import { FormBlock, FormBlockTitle, FormButtonsContainer, 
    FormChecklistContainer, FormChecklistDone, FormChecklistItemsWrapper,
    FormChecklistTitle, FormContent, FormDescription, FormDescriptionContainer,
    FormListItem, FormListItems, FormSubtitle, FormTitle, FormTitleContainer,
    FormWrapper, FormContainer, FormHeaderContainer, FormHeaderWrapper} from '../FormElements'
// import { HeaderContainer, HeaderWrapper } from '../../Header/HeaderElements'
import ArrowIcon from '../../icons/Arrow/Arrow'
import MoreIcon from '../../icons/More/MoreIcon'
import TrashcanIcon from '../../icons/Trashcan/TrashcanIcon'
import ProgressBar from '../../ProgressBar'
import Tooltip from '../../Tooltip'
import { AddCardFormContainer, AddCardFormWrapper, DeleteIconWrapper, FormMobileBlock, FormMobileTitleContainer, MobileFormContainer } from './AddCardFormElements'
import SaveIcon from '../../icons/Save/SaveIcon'
import Div100vh from '../../Div100vh'
import ConditionalWrapper from '../../ConditionalWrapper'
import FormHeader from '../FormHeader'

interface CardFormProps {
    columnId: string,
    cardId: string,
    title: string,
    subtitle: string,
    description: string,
    tasks: Task[],
    onExit?: any,
    onSave?: any
}

const CardForm = ({columnId, cardId, title, subtitle, description, tasks, onExit, onSave}: CardFormProps) => {
    const [card, setCard] = useState<SimpleCard>({title, subtitle, description, tasks})

    const handleUpdate = (title: string, subtitle: string, description: string, tasks: Task[]) => {
        setCard(prev => ({...prev, title, subtitle, description, tasks}))
    }

    const updateTask = (tasks: Task[], taskId: string, text: string, completed: boolean) => {

        return tasks.map((task, index) => {
            if(task._id === taskId){
                console.log('update', task.completed, completed, tasks)
                return {...task, text, completed}
            }else{
                return task
            }
        })
    }

    const addTask = (text: string) => {
        setCard(prev => (
            {...prev, tasks: tasks.concat({_id: String(new ObjectID()), completed: false, text})}
        ))
    }

    const removeTask = (taskId: string, tasks: Task[]) => {
        return tasks.filter(task => task._id !== taskId)
    }

    const handleSave = () => {
        console.log(card);
        onSave(card)
        onExit()
    }
    
    return (
        <ConditionalWrapper Wrapper={Div100vh} condition={window.innerWidth <= 425}>
        <AddCardFormContainer>
        <AddCardFormWrapper>
        <FormWrapper>
            <FormHeaderContainer>
                <FormContainer>
                    <FormHeaderWrapper>
                        <Button shape='icon' variant='outline' size='lg'
                            onClick={onExit}>
                            <ArrowIcon direction='left' />
                        </Button>
                        <BoardName>Edit Card</BoardName>

                        <Tooltip
                            content={
                                <Button onClick={() => {}}
                                Icon={TrashcanIcon}>
                                        Delete Card
                                    </Button>
                            } 
                            direction='bottom'
                            >
                            <Button shape='icon' variant='outline' size='lg' onClick={handleSave}>
                                <SaveIcon />
                            </Button>
                        </Tooltip>
                    </FormHeaderWrapper>
                </FormContainer>
            </FormHeaderContainer>
                    
                <FormHeader
                    title={card.title}
                    handleTitleUpdate={(title) => handleUpdate(title, card.subtitle, card.description, card.tasks)}
                    subtitle={card.subtitle}
                    handleSubtitleUpdate={(subtitle) => handleUpdate(card.title, subtitle, card.description, card.tasks)}
                    // editable
                />
                    <FormContent>
                <FormContainer>
                        <FormBlock>
                            <FormDescriptionContainer>
                                <FormBlockTitle>
                                    Description
                                </FormBlockTitle>
                                <FormDescription>
                                    <EditableItem
                                        initialText={card.description}
                                        deleteItem={() => {}}
                                        editItem={() => {}}
                                        placeholder='Enter Description'
                                        updateItem={(text) => handleUpdate(card.title, card.subtitle, text, card.tasks)}
                                    />
                                </FormDescription>
                            </FormDescriptionContainer>
                        </FormBlock>
                    {card.tasks &&
                        <FormBlock>
                            <FormChecklistContainer>
                                <FormChecklistTitle>
                                    <FormBlockTitle>Checklist</FormBlockTitle>
                                    <FormChecklistDone>{getCompletedTasks(card.tasks)} / {card.tasks.length}</FormChecklistDone>
                                </FormChecklistTitle>  
                                <ProgressBar variant='default' value={getCompletedTasks(card.tasks) / card.tasks.length * 100 || getCompletedTasks(card.tasks)}/>
                                <FormChecklistItemsWrapper>
                                    <FormListItems>
                                        {card.tasks?.map(task =>
                                            <FormListItem
                                                key={task._id} 
                                            >
                                                <Checkbox 
                                                    checked={task.completed} 
                                                    key={task._id} 
                                                    onChange={() => handleUpdate(card.title, card.subtitle, card.description, updateTask(card.tasks, task._id, task.text, !task.completed))}
                                                >
                                                    <EditableItem 
                                                        initialText={task.text}
                                                        deleteItem={() => {}}
                                                        editItem={(text: string) => {}}
                                                        placeholder='Enter task text'
                                                        updateItem={(text: string) => handleUpdate(card.title, card.subtitle, card.description, updateTask(card.tasks, task._id, text, task.completed))}
                                                    />
                                                </Checkbox>
                                                <DeleteIconWrapper onClick={() => handleUpdate(card.title, card.subtitle, card.description, removeTask(task._id, card.tasks))}>
                                                    <TrashcanIcon />
                                                </DeleteIconWrapper>
                                            </FormListItem>

                                        )}
                                        <AddItemForm 
                                            title='Add new Task' 
                                            placeholder='Start Typing...'
                                            item='TASK'
                                            onAdd={(text: string) => handleUpdate(card.title, card.subtitle, card.description, [...card.tasks, {_id: String(new ObjectID()), text, completed: false}])}
                                        />
                                    </FormListItems>
                                </FormChecklistItemsWrapper>
                            </FormChecklistContainer>
        
                        </FormBlock>
                    }
                    </FormContainer>
                    </FormContent>
            </FormWrapper>
            </AddCardFormWrapper>
            </AddCardFormContainer>

        </ ConditionalWrapper>

    )
}

export default CardForm

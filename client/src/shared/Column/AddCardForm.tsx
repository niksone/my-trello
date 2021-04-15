import ObjectID from 'bson-objectid'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ShowContainer } from '../../HomePage'
import { updateTask } from '../../redux/AddItem/actionCreators'
import { Card, SimpleCard, Task } from '../../redux/AddItem/interfaces'
import AddItemForm from '../AddNewItem/AddItemForm'
import Button from '../Buttons'
import ButtonGroup from '../Buttons/ButtonGroup'
import { getCompletedTasks } from '../Card/BeautifulCard'
import Checkbox from '../Checkbox'
import { CheckboxText } from '../Checkbox/CheckboxElements'
import EditableItem from '../EditableItem'
import TrashcanIcon from '../icons/Trashcan/TrashcanIcon'
import ProgressBar from '../ProgressBar'

export const AddCardFormContainer = styled.div`
    width: 650px;
    height: 85%;

    @media screen and (max-width: 425px){
        width: 100%;
        height: 100%;
    }

`

export const FormContainer= styled.div`
    display: flex;
    flex-direction: column;
    /* min-width: 30%; */
    height: 100%;
    width: 100%;
    border-radius: 4px;
`

export const FormContent = styled.div`
    padding: 22px 28px 0 28px;
    height: 100%;
    overflow: auto;

    @media screen and (max-width: 425px){
        padding: 0px 12px;
    }
`

export const FormBlockTitle = styled.h4`
    font-size: var(--text-h4);
    color: var(--color-primary-dark);
`

export const FormTitleContainer = styled.div`
    display: block;

    @media screen and (max-width: 425px){
        display: none;
    }
`

// export const FormWrapper = styled.div``

export const FormSubtitle = styled.p`
    font-size: var(--text-regular);
    color: var(--color-primary-grey);
`

export const FormTitle = styled.h3`
    font-size: var(--text-h3);
    color: var(--color-primary-dark);
`


export const FormDescriptionContainer = styled.div``

export const FormDescription = styled.p`
    font-size: var(--text-regular);
`

export const FormBlock = styled.div`
    padding: 26px 0px;
    border-bottom: 1px solid var(--color-resting-outline);

    &:first-child {
        padding-top: 0;
    }
    
    &:last-child{
        border-bottom: none;
    }

    @media screen and (max-width: 425px){
        background-color: #fff;
        border-radius: 6px;
        border-bottom: none;
        padding: 12px 16px;
        margin-bottom: 4px;

        &:first-child {
            padding-top: 12px;
        }
    }
`

export const FormButtonsContainer = styled.div`
    padding: 18px 28px;
    background-color: var(--color-primary-light);
`

export const FormChecklistContainer = styled.div`

`

export const FormChecklistTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
`

export const FormChecklistDone = styled.p``

export const FormListItems = styled.div`
    /* padding-top: 35px; */

    & > * {
        padding: 7px 0;
    }
`

export const FormChecklistItemsWrapper = styled.div`
    padding-top: 35px;
`

export const FormListItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    color: var(--color-primary-grey);
`


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

export const DeleteIconWrapper = styled.span`
    display: flex;
    color: var(--color-primary-dark);
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover{
        color: var(--color-error);
    }

    & > svg {
        width: 16px;
    }
`

export const AddCardFormWrapper = styled.div`
    background-color: #fff;

    @media screen and (max-width: 425px){
        background-color: var(--color-background-light);
    }
`

export const FormMobileTitleContainer = styled.div`
    display: none;

    @media screen and (max-width: 425px){
        display: block;
    }

`

export const FormMobileBlock = styled.div`
    background-color: #fff;
    border-radius: 0;
    padding: 26px 12px 30px 12px;
    margin-bottom: 14px;
`



const CardForm = ({columnId, cardId, title, subtitle, description, tasks, onExit, onSave}: CardFormProps) => {
    const [card, setCard] = useState<SimpleCard>({title, subtitle, description, tasks})
    // const completedTasks = getCompletedTasks(card.tasks)

    const handleUpdate = (title: string, subtitle: string, description: string, tasks: Task[]) => {
        setCard(prev => ({...prev, title, subtitle, description, tasks}))
    }

    const dispatch = useDispatch()

    const updateTask = (tasks: Task[], taskId: string, text: string, completed: boolean) => {
        // console.log({text, completed}, tasks, 'upd')

        return tasks.map((task, index) => {
            // task._id === taskId ? {...task, text, completed} : task
            if(task._id === taskId){
                console.log('update', task.completed, completed, tasks)
                return {...task, text, completed}
            }else{
                return task
            }
        })
        console.log({text, completed}, tasks, 'upd')

    }

    const addTask = (text: string) => {
        setCard(prev => (
            {...prev, tasks: tasks.concat({_id: String(new ObjectID()), completed: false, text})}
        ))
    }

    const editTask = (taskId: string, text: string) => {
        // setCard(prev => (
        //     {...prev, tasks: tasks.map(task => (
        //         task._id === taskId ? {task._id, task.completed, text}: task
        //     ))}
        // ))
        // updateTask(taskId, text, completed)
        console.log(card.tasks);
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
        <AddCardFormContainer>
        <AddCardFormWrapper>
        <FormContainer>
            <FormMobileTitleContainer>
            <FormMobileBlock>
                <FormTitle>
                    <EditableItem
                        initialText={card.title}
                        deleteItem={() => {}}
                        editItem={() => {}}
                        placeholder='Enter Title'
                        updateItem={(text) => handleUpdate(text, card.subtitle, card.description, card.tasks)}
                    />
                </FormTitle>
                <FormSubtitle>
                    <EditableItem
                        initialText={card.subtitle}
                        deleteItem={() => {}}
                        editItem={() => {}}
                        placeholder='Enter subtitle'
                        updateItem={(text) => handleUpdate(card.title, text, card.description, card.tasks)}
                    />
                </FormSubtitle>
                </FormMobileBlock>
            </FormMobileTitleContainer>
            <FormContent>
                <ShowContainer show={true} mobile={false}>
                    <FormBlock>
                        <FormTitleContainer>
                            <FormTitle>
                                <EditableItem
                                    initialText={card.title}
                                    deleteItem={() => {}}
                                    editItem={() => {}}
                                    placeholder='Enter Title'
                                    updateItem={(text) => handleUpdate(text, card.subtitle, card.description, card.tasks)}
                                />
                            </FormTitle>
                            <FormSubtitle>
                                <EditableItem
                                    initialText={card.subtitle}
                                    deleteItem={() => {}}
                                    editItem={() => {}}
                                    placeholder='Enter subtitle'
                                    updateItem={(text) => handleUpdate(card.title, text, card.description, card.tasks)}
                                />
                            </FormSubtitle>
                        </FormTitleContainer>
                    </FormBlock>
                    </ShowContainer>
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
            </FormContent>
            <FormButtonsContainer>
                <ButtonGroup spacing={10}>
                    <Button onClick={onExit}>Close</Button>
                    <Button onClick={handleSave}>Save</Button>
                </ButtonGroup>
            </FormButtonsContainer>
        </FormContainer>
        </AddCardFormWrapper>
        </AddCardFormContainer>

    )
}

export default CardForm

import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { BoardName } from '../../../HomePage'
import Button from '../../Buttons'
import ConditionalWrapper from '../../ConditionalWrapper'
import Div100vh from '../../Div100vh'
import EditableItem from '../../EditableItem'
import ArrowIcon from '../../icons/Arrow/Arrow'
import SaveIcon from '../../icons/Save/SaveIcon'
import TrashcanIcon from '../../icons/Trashcan/TrashcanIcon'
import Tooltip from '../../Tooltip'
import { CardFormContainer, CardFormWrapper } from '../CardForm/CardFormElements'
import { FormBlock, FormBlockTitle, FormChecklistContainer, FormChecklistDone, FormChecklistTitle, FormContainer, FormContent, FormDescription, FormDescriptionContainer, FormHeaderContainer, FormHeaderWrapper, FormWrapper } from '../FormElements'
import FormHeader from '../FormHeader'

interface MoveItemsFormProps {
    headerTitle: string
    title: string
    subtitle: string
    items: any[]
    itemLabelField: 'title' | 'name'
    
    onExit: () => void,
    onUpdate: (sourceIndex: number, destIndex: number) => void,

}

export const MoveItem = styled.div`
    background-color: #fff;
    padding: 12px 16px;
    margin-bottom: 7px;
    border-radius: 12px;
    border: 1px solid var(--color-resting-outline);
`

export const MoveItemFormContainer = styled.div`
    height: 100%;
    width: 100vw;
`

const MoveItemsForm = ({headerTitle, title, subtitle, items, itemLabelField, onUpdate, onExit}: MoveItemsFormProps) => {
    const [moveItems, setMoveItems] = useState(items)
    

    const handleUpdate = (res: any) => {
        const {source, destination} = res
        console.log(source.index, destination.index);
        onUpdate(source.index, destination.index)
    }

    return (
    <ConditionalWrapper Wrapper={Div100vh} condition={window.innerWidth <= 425}>
    <MoveItemFormContainer>
                <FormWrapper>
                    <FormHeaderContainer>
                        <FormContainer>
                            <FormHeaderWrapper>
                                <Button shape='icon' variant='outline' size='lg'
                                    onClick={onExit}>
                                    <ArrowIcon direction='left' />
                                </Button>
                                <BoardName>Move Lists</BoardName>

                                <Tooltip
                                    content={
                                        <Button onClick={() => {}}
                                        Icon={TrashcanIcon}>
                                                Delete Card
                                            </Button>
                                    } 
                                    direction='bottom'
                                    >
                                    <Button shape='icon' variant='invisible' size='lg'>
                                        <SaveIcon />
                                    </Button>
                                </Tooltip>
                            </FormHeaderWrapper>
                        </FormContainer>
                    </FormHeaderContainer>
                        
                    <FormHeader
                        title={title}
                        handleTitleUpdate={() => {}}
                        subtitle={subtitle}
                        handleSubtitleUpdate={() => {}}
                    />
                    <FormContent>
                        <FormContainer>
                            <DragDropContext onDragEnd={(res) => handleUpdate(res)}>
                                <Droppable droppableId='move-list'>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef} 
                                        {...provided.droppableProps}
                                    >
                                        {
                                            moveItems.map((item, index) => 
                                                <Draggable draggableId={item._id} index={index} key={item._id}>      
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                        >
                                                            <MoveItem>{item[itemLabelField]}</MoveItem>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                
                                )}
                                </Droppable>

                            </DragDropContext>

                        </FormContainer>
                    </FormContent>
                </FormWrapper>
        </MoveItemFormContainer>
    
    </ ConditionalWrapper>

    )
}

export default MoveItemsForm

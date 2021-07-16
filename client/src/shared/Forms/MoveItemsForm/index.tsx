import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { BoardName } from '../../../HomePage/HomePageElements'
import Button from '../../Buttons'
import ConditionalWrapper from '../../ConditionalWrapper'
import { isMobileWidth } from '../../constants'
import Div100vh from '../../Div100vh'
import ArrowIcon from '../../icons/Arrow/Arrow'
import SaveIcon from '../../icons/Save/SaveIcon'
import { FormContainer, FormContent,FormHeaderContainer, FormHeaderWrapper, FormWrapper } from '../FormElements'
import FormHeader from '../FormHeader'
import { MoveItem, MoveItemFormContainer } from './MoveItensFormElements'

interface MoveItemsFormProps {
    headerTitle: string
    title: string
    subtitle: string
    items: any[]
    itemLabelField: 'title' | 'name'
    
    onExit: () => void,
    onUpdate: (sourceIndex: number, destIndex: number) => void,

}



const MoveItemsForm = ({headerTitle, title, subtitle, items, itemLabelField, onUpdate, onExit}: MoveItemsFormProps) => {
    const [moveItems, setMoveItems] = useState(items)
    

    const handleUpdate = (res: any) => {
        const {source, destination} = res
        console.log(source.index, destination.index);
        onUpdate(source.index, destination.index)
    }

    return (
    <ConditionalWrapper Wrapper={Div100vh} condition={isMobileWidth}>
    <MoveItemFormContainer>
                <FormWrapper>
                    <FormHeaderContainer>
                        <FormContainer>
                            <FormHeaderWrapper>
                                <Button shape='icon' variant='outline' size='lg'
                                    onClick={onExit}>
                                    <ArrowIcon direction='left' />
                                </Button>
                                <BoardName >{headerTitle}</BoardName>

                                <Button shape='icon' variant='invisible' size='lg'>
                                    <SaveIcon />
                                </Button>
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
                                <Droppable droppableId='move-item'>
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

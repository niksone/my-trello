import React from 'react'
import { BoardName } from '../../../HomePage/HomePageElements'
import AddItemForm from '../../AddNewItem/AddItemForm'
import Button from '../../Buttons'
import ConditionalWrapper from '../../ConditionalWrapper'
import { isMobileWidth } from '../../constants'
import Div100vh from '../../Div100vh'
import EditableItem from '../../EditableItem'
import AddIcon from '../../icons/Add/AddIcon'
import ArrowIcon from '../../icons/Arrow/Arrow'
import SaveIcon from '../../icons/Save/SaveIcon'
import TrashcanIcon from '../../icons/Trashcan/TrashcanIcon'
import { DeleteIconWrapper } from '../CardForm/CardFormElements'
import { FormBlock, FormBoardItem, FormBoardItemName, FormContainer, FormContent, FormHeaderContainer, FormHeaderWrapper, FormListItem, FormListItems, FormWrapper } from '../FormElements'
import FormHeader from '../FormHeader'
import { EditBoardFormContainer } from './EditBoardFormElements'



export interface EditItemsFormProps {
    onExit: () => void,
    onAdd: (name: string) => void
    onEdit: (id:string, name: string) => void
    onDelete: (id: string) => void
    items: any[]
    headerTitle: string
    title: string
    subtitle: string
    formPlaceholder: string
    formItemFieldLabel: 'name' | 'title'
}


const EditItemsForm = ({items, headerTitle, title, subtitle, formItemFieldLabel, formPlaceholder, onExit, onAdd, onDelete, onEdit}: EditItemsFormProps) => {

    return (
        <ConditionalWrapper Wrapper={Div100vh} condition={isMobileWidth}>
        <EditBoardFormContainer>
            <FormWrapper>
            <FormHeaderContainer>
                <FormContainer>
                    <FormHeaderWrapper>
                        <Button shape='icon' variant='outline' size='lg'
                            onClick={onExit}>
                            <ArrowIcon direction='left' />
                        </Button>
                        <BoardName>{headerTitle}</BoardName>
                        
                        <Button shape='icon' variant='invisible' size='lg' >
                            <SaveIcon />
                        </Button>
                    </FormHeaderWrapper>
                </FormContainer>
            </FormHeaderContainer>
            <FormHeader 
                title={title}
                subtitle={subtitle}
            />
                <FormContent>
                    <FormContainer>
                    <FormBlock>
                        <FormListItems>
                            <FormListItem >
                                <FormBoardItem>
                                    <AddItemForm
                                        onAdd={(name: string) => onAdd(name)}
                                        placeholder={formPlaceholder}
                                        variant='icon'
                                        Icon={AddIcon}
                                    />  
                                </FormBoardItem>
                            </FormListItem>
                            {items?.map((item: any) => (
                                <FormListItem key={item._id}>
                                    <FormBoardItem>
                                        <DeleteIconWrapper
                                            onClick={() => onDelete(item._id)}
                                        >
                                            <TrashcanIcon />
                                        </DeleteIconWrapper>
                                        <FormBoardItemName>
                                            <EditableItem
                                                initialText={item[formItemFieldLabel]}
                                                placeholder={''}
                                                deleteItem={() => {}}
                                                updateItem={(name: string) => 
                                                    onEdit(item._id, name)
                                                }
                                                editItem={() => {}}
                                            />
                                        </FormBoardItemName>
                                    </FormBoardItem>
                                </FormListItem>
                            ))}
                        </FormListItems>
                    </FormBlock>
                    </FormContainer>
                </FormContent>
            </FormWrapper>
        </EditBoardFormContainer>
        </ConditionalWrapper>
    )
}

export default EditItemsForm

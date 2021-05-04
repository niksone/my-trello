import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { BoardName } from '../../../HomePage'
import AddItemForm from '../../AddNewItem/AddItemForm'
import Button from '../../Buttons'
import ConditionalWrapper from '../../ConditionalWrapper'
import Div100vh from '../../Div100vh'
import EditableItem from '../../EditableItem'
import AddIcon from '../../icons/Add/AddIcon'
import ArrowIcon from '../../icons/Arrow/Arrow'
import SaveIcon from '../../icons/Save/SaveIcon'
import TrashcanIcon from '../../icons/Trashcan/TrashcanIcon'
import { DeleteIconWrapper } from '../AddCardForm/AddCardFormElements'
import { FormBlock, FormContainer, FormContent, FormHeaderContainer, FormHeaderWrapper, FormListItem, FormListItems, FormWrapper } from '../FormElements'
import FormHeader from '../FormHeader'



interface EditBoardFormProps {
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

export const EditBoardFormContainer = styled.div`
    width: 350px;
    height: 500px;
    background-color: #fff;

    @media screen and (max-width: 425px){
        height: 100%;
        width: 100vw;
    }
`

export const FormBoardItem = styled.div`
    display: flex;
    width: 100%;
    color: var(--color-primary-dark);
    font-weight: 700;

    & > *{
        margin-right: 13px;
    }
`

export const FormBoardItemName = styled.div`
    flex-basis: 100%;
`

export const EditIconWrapper = styled.span`
    display: flex;
`

const EditItemsForm = ({items, headerTitle, title, subtitle, formItemFieldLabel, formPlaceholder, onExit, onAdd, onDelete, onEdit}: EditBoardFormProps) => {

    return (
        <ConditionalWrapper Wrapper={Div100vh} condition={window.innerWidth <= 425}>
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

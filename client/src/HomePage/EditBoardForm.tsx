import ObjectID from 'bson-objectid'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deleteBoard, editBoardName, addBoard} from '../redux/Board/actionCreators'
import { Board, SimpleBoard } from '../redux/Board/interfaces'
import AddNewItem from '../shared/AddNewItem'
import AddItemForm from '../shared/AddNewItem/AddItemForm'
import AddNewItemBtn from '../shared/AddNewItem/AddNewItemBtn'
import Button from '../shared/Buttons'
import ButtonGroup from '../shared/Buttons/ButtonGroup'
import {FormContainer, FormBlock, FormSubtitle,
     FormTitle, FormTitleContainer, FormContent, FormButtonsContainer,
      FormListItems, FormListItem, DeleteIconWrapper } from '../shared/Column/AddCardForm'
import EditableItem from '../shared/EditableItem'
import AddIcon from '../shared/icons/Add/AddIcon'
import EditIcon from '../shared/icons/Edit/EditIcon'
import TrashcanIcon from '../shared/icons/Trashcan/TrashcanIcon'

interface EditBoardFormProps {
    onExit: () => void,
    onSave: (boards: SimpleBoard[]) => void
    boards: Board[]
    userId: string
}

export const EditBoardFormContainer = styled.div`
    width: 350px;
    height: 500px;
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

const EditBoardForm = ({boards, onSave, onExit, userId}: EditBoardFormProps) => {

    const dispatch = useDispatch()
    const [editBoards, setEditBoards] = useState<SimpleBoard[]>(boards)

    const handleSave = () => {
        onSave(editBoards)
    }

    const updateBoards = (boards: SimpleBoard[]) => {
        setEditBoards(prev => boards)
    }

    const editBoard = (id: string, name: string) => {
        return editBoards.map(board => (
            board._id === id ? {...board, name} : board
        ))
    }

    // const deleteBoard = (id: string) => {
    //     return editBoards.filter(board => board._id !== id)
    //     // setEditBoards(prev => ({...prev, }))
    // }

    // const addBoard = (name: string) => {
    //     return editBoards.concat({_id: String(new ObjectID()), name})
    // }

    return (
        <EditBoardFormContainer>
            <FormContainer>
                <FormContent>
                    <FormBlock>
                        <FormTitleContainer>
                            <FormTitle>Edit Board</FormTitle>
                            <FormSubtitle>Rename, add or delete a board</FormSubtitle>
                        </FormTitleContainer>
                    </FormBlock>
                    <FormBlock>
                        <FormListItems>
                            <FormListItem >
                                <FormBoardItem>
                                    <AddItemForm
                                        onAdd={(name: string) => dispatch(addBoard(userId, name))}
                                        title='test'
                                        placeholder='Create Board'
                                        variant='icon'
                                        Icon={AddIcon}
                                    />  
                                </FormBoardItem>
                            </FormListItem>
                            {boards?.map(board => (
                                <FormListItem key={board._id}>
                                    <FormBoardItem>
                                        <DeleteIconWrapper 
                                            onClick={() => 
                                                // updateBoards(deleteBoard(board._id))
                                                dispatch(deleteBoard(board._id))
                                            }
                                        >
                                            <TrashcanIcon />
                                        </DeleteIconWrapper>
                                        <FormBoardItemName>
                                            <EditableItem
                                                initialText={board.name}
                                                placeholder={''}
                                                deleteItem={() => {}}
                                                updateItem={(name: string) => 
                                                    // updateBoards(editBoard(board._id, name))
                                                    dispatch(editBoardName(board._id, name))
                                                }
                                                editItem={() => {}}
                                            />
                                        </FormBoardItemName>
                                        <EditIconWrapper onClick={() => {}}>
                                            <EditIcon />
                                        </EditIconWrapper>
                                    </FormBoardItem>
                                </FormListItem>
                            ))}
                        </FormListItems>
                    </FormBlock>
                </FormContent>
                <FormButtonsContainer>
                    <ButtonGroup spacing={10}>
                        <Button onClick={onExit}>Close</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </ButtonGroup>
                </FormButtonsContainer>
            </FormContainer>
        </EditBoardFormContainer>
    )
}

export default EditBoardForm

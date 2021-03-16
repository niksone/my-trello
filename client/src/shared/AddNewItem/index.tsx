import React, { useState } from 'react'
import { factory } from 'typescript'
import { ColumnWrapper } from '../Column/ColumnElements'
import AddItemForm from './AddItemForm'
import { AddItemButton, AddItemContainer, AddItemContainerProps, AddItemContainerTypes } from './AddNewItemElements'

interface AddNewItemProps {
    text: string,
    formText: string,
    onAdd(text: string): void,
    item: AddItemContainerTypes
}

const AddNewItem = ({text, formText, onAdd, item}: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false)
    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleForm = (text: string) => {
        const trimText = text.trim()
        if(trimText !== ''){
            onAdd(trimText)
            setShowForm(false)
        }
    }

    return (
            <AddItemContainer item={item}>
                {
                    !showForm 
                        ? <AddItemButton onClick={toggleForm}>{text}</AddItemButton>
                        : <AddItemForm onAdd={handleForm} title={formText}/>
                }
            </AddItemContainer>

    )
}

export default AddNewItem

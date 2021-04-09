import React, { useState } from 'react'
import Button from '../Buttons'
import {Modal} from '../Modal'
import AddItemForm from './AddItemForm'
import { AddItemButton, AddItemContainer, AddItemContainerProps, AddItemContainerTypes } from './AddNewItemElements'

interface AddNewItemProps {
    text: string,
    formText: string,
    onAdd(text: string): void,
    item: AddItemContainerTypes,
    Button: any
}

const AddNewItem = ({text, formText, onAdd, item, Button}: AddNewItemProps) => {
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
                        ? <Button onClick={toggleForm}>{text}</Button>
                        // ? {Button}
                        // : <AddItemForm />onAdd={handleForm} title={formText}/>
                        : <Modal exit={toggleForm}></Modal>
                }
            </AddItemContainer>
    )
}

export default AddNewItem

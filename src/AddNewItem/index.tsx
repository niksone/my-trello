import React, { useState } from 'react'
import { factory } from 'typescript'
import AddItemForm from './AddItemForm'
import { AddItemButton } from './AddNewItemElements'

interface AddNewItemProps {
    text: string,
    formText: string,
    onAdd(text: string): void
}

const AddNewItem = ({text, formText, onAdd}: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false)
    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleForm = (text: string) => {
        // if(text.trim() !== ''){
            onAdd(text)
            setShowForm(false)
        // }
    }

    return (
        !showForm 
            ? <AddItemButton onClick={toggleForm}>{text}</AddItemButton>
            : <AddItemForm onAdd={handleForm} title={formText}/>
    )
}

export default AddNewItem

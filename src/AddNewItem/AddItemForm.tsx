import React, { useState } from 'react'
import { AddItemButton, AddItemFormButton, AddItemFormContainer, AddItemFormInput } from './AddNewItemElements'


interface AddItemFormProps {
    title: string,
    onAdd(text: string): void
}

const AddItemForm = ({title, onAdd}: AddItemFormProps) => {
    const [text, setText] = useState('')
    
    const handleAddItem = () => {
        text.trim() !== '' && onAdd(text)
    }

    return (
        <AddItemFormContainer>
            <AddItemFormInput type='text' value={text} onChange={e => setText(e.currentTarget.value)}/>
            <AddItemFormButton onClick={handleAddItem}>{title}</AddItemFormButton>
        </AddItemFormContainer>
    )
}

export default AddItemForm

import React, { useState } from 'react'
import { AddItemButton, AddItemFormButton, AddItemFormContainer, AddItemFormInput } from './AddNewItemElements'


interface AddItemFormProps {
    title: string,
    onAdd(text: string): void
}

const AddItemForm = ({title, onAdd}: AddItemFormProps) => {
    const [text, setText] = useState('')

    return (
        <AddItemFormContainer>
            <AddItemFormInput type='text' value={text} onChange={e => setText(e.currentTarget.value)}/>
            <AddItemFormButton onClick={() => onAdd(text)}>{title}</AddItemFormButton>
        </AddItemFormContainer>
    )
}

export default AddItemForm

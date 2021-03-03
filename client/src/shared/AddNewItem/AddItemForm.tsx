import React, { useRef, useState } from 'react'
import { ResizeableTextArea } from '../ResizableTextArea'
import { AddItemButton, AddItemFormButton, AddItemFormContainer,AddItemFormWrapper } from './AddNewItemElements'


interface AddItemFormProps {
    title: string,
    onAdd(text: string): void
}

const AddItemForm = ({title, onAdd}: AddItemFormProps) => {
    const test = useRef<HTMLSpanElement>(null)
    const handleAddItem = () => {
        const text = test?.current?.innerHTML || '';
        text.trim() !== '' && onAdd(text)
    }

    return (
        <AddItemFormContainer>
            <AddItemFormWrapper><ResizeableTextArea ref={test}/></AddItemFormWrapper>
            {/* <AddItemFormInput type='text' value={text} onChange={e => setText(e.currentTarget.value)}/> */}
            <AddItemFormButton onClick={handleAddItem}>{title}</AddItemFormButton>
        </AddItemFormContainer>
    )
}

export default AddItemForm

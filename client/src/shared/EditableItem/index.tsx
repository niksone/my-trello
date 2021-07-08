import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ResizableTextArea from '../ResizableTextArea'
import { EditableItemContainer, EditButton, EditableItemWrapper, SubmitEditButton } from './EditableItemElements'

interface EditableItemProps {
    // children: React.ReactChild,
    initialText: string,
    deleteItem: () => void,
    updateItem: (text: string) => void
    editItem: (text: string) => void,
    Wrapper?: any,
    placeholder: string
    placeholderColor?: string
}



const EditableItem = ({deleteItem, editItem, updateItem, initialText, placeholder, placeholderColor, Wrapper}: EditableItemProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const test = useRef<HTMLSpanElement>(null)

    const handleIsEdit = () => {
      setIsEdit(!isEdit)
    }

    const handleEdit = () => {
        const text = test.current && (test.current.innerText)
        if(text === null) return
        editItem(text)
        // setIsEdit(false)
    }

    useEffect(() => {
        test.current && (test.current.innerText = initialText)
    })


    const handleClick = () => {
        console.log('handle click');
         const onExit = (e: any) => {
            updateItem(test?.current?.innerText.trim() || '') 
            document.removeEventListener('focusout', onExit)            
        }
        document.addEventListener('focusout', onExit)
    }


    return (
        <EditableItemContainer onClick={handleClick}>
            <ResizableTextArea 
                ref={test}
                onChange={() => {}}
                placeholder={placeholder}
                placeholderColor={placeholderColor}
            />
        </EditableItemContainer>
    )
}

export default EditableItem

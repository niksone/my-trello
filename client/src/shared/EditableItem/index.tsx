import {useEffect, useRef } from 'react'
import ResizableTextArea from '../ResizableTextArea'
import { EditableItemContainer } from './EditableItemElements'

interface EditableItemProps {
    initialText: string,
    deleteItem: () => void,
    updateItem: (text: string) => void
    editItem: (text: string) => void,
    placeholder: string
    placeholderColor?: string
}



const EditableItem = ({deleteItem, editItem, updateItem, initialText, placeholder, placeholderColor}: EditableItemProps) => {
    const textAreaRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        textAreaRef.current && (textAreaRef.current.innerText = initialText)
    }, [initialText])


    const handleClick = () => {
        console.log('handle click');

         const onExit = () => {
            updateItem(textAreaRef?.current?.innerText.trim() || '') 
            document.removeEventListener('focusout', onExit)            
        }

        document.addEventListener('focusout', onExit)
    }


    return (
        <EditableItemContainer onClick={handleClick}>
            <ResizableTextArea 
                ref={textAreaRef}
                onChange={() => {}}
                placeholder={placeholder}
                placeholderColor={placeholderColor}
            />
        </EditableItemContainer>
    )
}

export default EditableItem

import {useEffect, useRef } from 'react'
import { replaceCaret } from '../../utils/replaceCaret'
import ResizableTextArea from '../ResizableTextArea'
import { EditableItemContainer } from './EditableItemElements'

interface EditableItemProps {
    initialText: string,
    deleteItem: () => void,
    updateItem: (text: string) => void
    editItem: (text: string) => void,
    placeholder: string
    placeholderColor?: string
    maxLength?: number
}



const EditableItem = ({deleteItem, editItem, updateItem, initialText, placeholder, placeholderColor, maxLength}: EditableItemProps) => {
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

    const handleChange = () => {

        if(maxLength && textAreaRef!.current!.innerText.length > maxLength){
            textAreaRef.current!.innerText = textAreaRef.current!.innerText.substring(0,maxLength)
            textAreaRef.current  && replaceCaret(textAreaRef.current)
    }
}

    return (
        <EditableItemContainer onClick={handleClick}>
            <ResizableTextArea 
                ref={textAreaRef}
                placeholder={placeholder}
                placeholderColor={placeholderColor}
                onChange={handleChange}
            />
        </EditableItemContainer>
    )
}

export default EditableItem

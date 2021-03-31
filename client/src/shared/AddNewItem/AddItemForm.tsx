import { useRef } from 'react'
import Button from '../Buttons'
import ResizableTextArea from '../ResizableTextArea'
import { AddItemFormButton, AddItemFormContainer,AddItemFormWrapper } from './AddNewItemElements'


interface AddItemFormProps {
    title: string,
    onAdd(text: string): void
}

const AddItemForm = ({title, onAdd}: AddItemFormProps) => {
    const test = useRef<HTMLSpanElement>(null)
    
    const handleAddItem = () => {
        const text = test?.current?.innerText || '';
        console.log(text);
        console.log(title);
        text.trim() !== '' && onAdd(text)
    }

    return (
        <AddItemFormContainer>
            <AddItemFormWrapper><ResizableTextArea ref={test}/></AddItemFormWrapper>
            {/* <AddItemFormInput type='text' value={text} onChange={e => setText(e.currentTarget.value)}/> */}
            <Button onClick={handleAddItem}>{title}</Button>
        </AddItemFormContainer>
    )
}

export default AddItemForm

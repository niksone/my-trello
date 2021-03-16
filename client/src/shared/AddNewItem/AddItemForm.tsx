import { useRef } from 'react'
import ResizableTextArea from '../ResizableTextArea'
import { AddItemFormButton, AddItemFormContainer,AddItemFormWrapper } from './AddNewItemElements'


interface AddItemFormProps {
    title: string,
    onAdd(text: string): void
}

const AddItemForm = ({title, onAdd}: AddItemFormProps) => {
    const test = useRef<HTMLSpanElement>(null)
    const handleAddItem = () => {
        const text = test?.current?.innerHTML || '';
        console.log(text);
        text.trim() !== '' && onAdd(text)
    }

    return (
        <AddItemFormContainer>
            <AddItemFormWrapper><ResizableTextArea ref={test}/></AddItemFormWrapper>
            {/* <AddItemFormInput type='text' value={text} onChange={e => setText(e.currentTarget.value)}/> */}
            <AddItemFormButton onClick={handleAddItem}>{title}</AddItemFormButton>
        </AddItemFormContainer>
    )
}

export default AddItemForm

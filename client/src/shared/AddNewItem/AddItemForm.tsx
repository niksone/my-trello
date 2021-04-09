import { useRef } from 'react'
import Button from '../Buttons'
import ResizableTextArea from '../ResizableTextArea'
import { AddItemContainerTypes, AddItemFormButton, AddItemFormContainer,AddItemFormWrapper } from './AddNewItemElements'


interface AddItemFormProps {
    title: string,
    placeholder?: string
    onAdd(text: string): void
    item?: AddItemContainerTypes
}

const AddItemForm = ({title, placeholder, item, onAdd}: AddItemFormProps) => {
    const test = useRef<HTMLSpanElement>(null)
    
    const handleAddItem = () => {
        const text = test?.current?.innerText || '';
        console.log(text);
        console.log(title);
        text.trim() !== '' && onAdd(text)
        test.current && (test.current.innerText = "")
    }

    return (
        <AddItemFormContainer >
            <AddItemFormWrapper item={item}><ResizableTextArea ref={test} placeholder={placeholder}/></AddItemFormWrapper>
            {/* <AddItemFormInput type='text' value={text} onChange={e => setText(e.currentTarget.value)}/> */}
            <Button onClick={handleAddItem} size='md'>{title}</Button>
        </AddItemFormContainer>
    )
}

export default AddItemForm

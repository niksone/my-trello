import { RefObject, useRef } from 'react'
import useFocus from '../../utils/useFocus'
import Button from '../Buttons'
import ResizableTextArea from '../ResizableTextArea'
import { AddItemContainerTypes, AddItemFormButtonContainer, AddItemFormButtonContainerTypes, AddItemFormContainer,AddItemFormWrapper, FormIcon } from './AddNewItemElements'

type FormVariant = 'icon' | 'default'


interface AddItemFormProps {
    title?: string,
    placeholder?: string
    onAdd(text: string): void
    item?: AddItemContainerTypes,
    btnItem?: AddItemFormButtonContainerTypes
    Icon?: JSX.Element
    variant?: FormVariant

}

const AddItemForm = ({title, placeholder, item, btnItem = 'DEFAULT', onAdd, Icon, variant = 'default'}: AddItemFormProps) => {
    const textAreaRef = useRef<HTMLSpanElement>(null)

    const handleAddItem = () => {
        const text = (textAreaRef?.current?.innerText || '').trim();
        text !== '' && onAdd(text)
        textAreaRef.current && (textAreaRef.current.innerText = "")
    }

    useFocus(textAreaRef as RefObject<HTMLElement>)

    const getForm = (variant: FormVariant) => {
        switch(variant){
            case 'default': {
                return (
                    <AddItemFormContainer  item={item}>
                        <AddItemFormWrapper item={item}>
                            <ResizableTextArea ref={textAreaRef} placeholder={placeholder}/>
                        </AddItemFormWrapper>
                        <AddItemFormButtonContainer item={btnItem}>
                            <Button onClick={handleAddItem} size='md'>{title}</Button>
                        </AddItemFormButtonContainer>
                    </AddItemFormContainer>
                )
            }

            case 'icon': {
                return (
                    <AddItemFormContainer fd='row' alignItems='center' item={item}>
                        {Icon && 
                            <FormIcon onClick={handleAddItem}>
                                {Icon}
                            </FormIcon> 
                        } 
                        <AddItemFormWrapper item={item}>
                            <ResizableTextArea ref={textAreaRef} placeholder={placeholder}/>
                        </AddItemFormWrapper>
                    </AddItemFormContainer>
                )
            }


        }
    }

    return (
        getForm(variant)
    )
}

export default AddItemForm

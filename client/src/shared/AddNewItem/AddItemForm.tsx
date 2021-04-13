import { useRef } from 'react'
import Button from '../Buttons'
import ResizableTextArea from '../ResizableTextArea'
import { AddItemContainerTypes, AddItemFormButton, AddItemFormContainer,AddItemFormWrapper, FormIcon } from './AddNewItemElements'

type FormVariant = 'icon' | 'default'


interface AddItemFormProps {
    title: string,
    placeholder?: string
    onAdd(text: string): void
    item?: AddItemContainerTypes,
    Icon?: any
    variant?: FormVariant
}

const AddItemForm = ({title, placeholder, item, onAdd, Icon, variant = 'default'}: AddItemFormProps) => {
    const test = useRef<HTMLSpanElement>(null)
    // const FormIcon = Icon
    const handleAddItem = () => {
        const text = test?.current?.innerText || '';
        console.log(text);
        console.log(title);
        text.trim() !== '' && onAdd(text)
        test.current && (test.current.innerText = "")
    }

    const getForm = (variant: FormVariant) => {
        switch(variant){
            case 'default': {
                return (
                    <AddItemFormContainer>
                        <AddItemFormWrapper item={item}>
                            <ResizableTextArea ref={test} placeholder={placeholder}/>
                        </AddItemFormWrapper>
                        <Button onClick={handleAddItem} size='md'>{title}</Button>
                    </AddItemFormContainer>
                )
            }

            case 'icon': {
                return (
                    <AddItemFormContainer fd='row' alignItems='center'>
                        {Icon && 
                            <FormIcon onClick={handleAddItem}>
                                <Icon />
                            </FormIcon> 
                        }
                        <AddItemFormWrapper item={item}>
                            <ResizableTextArea ref={test} placeholder={placeholder}/>
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

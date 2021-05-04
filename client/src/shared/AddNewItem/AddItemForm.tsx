import { useRef } from 'react'
import Button from '../Buttons'
import ResizableTextArea from '../ResizableTextArea'
import { AddItemContainerTypes, AddItemFormButton, AddItemFormButtonContainer, AddItemFormButtonContainerTypes, AddItemFormContainer,AddItemFormWrapper, FormIcon } from './AddNewItemElements'

type FormVariant = 'icon' | 'default'


interface AddItemFormProps {
    title?: string,
    placeholder?: string
    onAdd(text: string): void
    item?: AddItemContainerTypes,
    btnItem?: AddItemFormButtonContainerTypes
    Icon?: any
    variant?: FormVariant

}

const AddItemForm = ({title, placeholder, item, btnItem = 'DEFAULT', onAdd, Icon, variant = 'default'}: AddItemFormProps) => {
    const test = useRef<HTMLSpanElement>(null)
    // const FormIcon = Icon
    const handleAddItem = () => {
        const text = (test?.current?.innerText || '').trim();
        console.log(text);
        console.log(title);
        text !== '' && onAdd(text)
        test.current && (test.current.innerText = "")
    }

    const getForm = (variant: FormVariant) => {
        switch(variant){
            case 'default': {
                return (
                    <AddItemFormContainer  item={item}>
                        <AddItemFormWrapper item={item}>
                            <ResizableTextArea ref={test} placeholder={placeholder}/>
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

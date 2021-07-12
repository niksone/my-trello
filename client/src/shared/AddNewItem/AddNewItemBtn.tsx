import { useState } from 'react'
import Button from '../Buttons'
import {Modal} from '../Modal'

const AddNewItemBtn = ({children, onAdd, title, Form, ...rest}: any) => {
    const [showForm, setShowForm] = useState(false)
    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleForm = (text: string) => {
        const trimText = text.trim()
        console.log(text);
        if(trimText !== ''){
            onAdd(trimText)
            setShowForm(false)
        }
        // onAdd()
    }

    return (
        <>
        <Button onClick={toggleForm} {...rest}>
            {children}
        </Button>

        {
            showForm 
                &&  <Modal exit={toggleForm}>
                        {Form}
                    </Modal>
        }
        </>
    )
}

export default AddNewItemBtn

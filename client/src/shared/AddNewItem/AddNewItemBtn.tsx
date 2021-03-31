import React, { useState } from 'react'
import Button from '../Buttons'
import Modal from '../Modal'
import AddItemForm from './AddItemForm'

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
                        <Form 
                            title={title}
                            onAdd={handleForm}
                        />
                    </Modal>
        }
        </>
    )
}

export default AddNewItemBtn

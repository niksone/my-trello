import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ResizableTextArea from '../ResizableTextArea'
import { EditableItemContainer, EditButton, EditableItemWrapper, SubmitEditButton } from './EditableItemElements'

interface EditableItemProps {
    children: React.ReactChild,
    initialText: string,
    deleteItem: () => void,
    editItem: (text: string) => void,
    Wrapper?: any
}



const EditableItem = ({children, deleteItem, editItem, initialText, Wrapper}: EditableItemProps) => {
    const [isEdit, setIsEdit] = useState(false)
    const test = useRef<HTMLSpanElement>(null)

    const handleIsEdit = () => {
      setIsEdit(!isEdit)
    }

    const handleEdit = () => {
        const text = test.current && (test.current.innerText)
        if(text === null) return
        editItem(text)
        setIsEdit(false)
    }

    useEffect(() => {
        // test?.current?.focus()
        test.current && (test.current.innerText = initialText)
    })

    return (
        !isEdit
            ?  
            <EditableItemContainer>
                    <Wrapper>
                            {children}
                            <EditButton onClick={handleIsEdit}/>
                    </Wrapper>
                    </EditableItemContainer>

            : 
        
        <EditableItemContainer>
                    {/* <CardContainer> */}
                    <Wrapper>
                        <ResizableTextArea ref={test}/>
                        <EditButton style={{backgroundColor: 'red'}} onClick={deleteItem}/>
                    </Wrapper>
                    {/* </CardContainer> */}
            <SubmitEditButton onClick={handleEdit}>submit</SubmitEditButton>
        </EditableItemContainer>   

   
        
    )
}

export default EditableItem

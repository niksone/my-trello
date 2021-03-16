import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ResizableTextArea from '../ResizableTextArea'
import { CardContainer } from './CardElements'

const EditCardContainer = styled.div`
    display: flex;
    flex-direction: column;
`

interface EditCardProps {
    listId: string,
    taskId: string,
    text: string
}


const EditCard = ({listId, taskId, text}: EditCardProps) => {
    const dispatch = useDispatch()
    const test = useRef<HTMLSpanElement>(null)

    const editCard = () => {
        const text = test?.current?.innerText
        dispatch({type: 'EDIT_CARD', payload: {listId, taskId, text}})
    }

    const deleteCard = () => {
        dispatch({type: 'DELETE_CARD', payload: {listId, taskId}})
    }

    useEffect(() => {
        // test?.current?.focus()
        test.current && (test.current.innerText = text)
    })

    return (
        <EditCardContainer>
            <CardContainer>
                <ResizableTextArea ref={test}/>
                {/* <EditButton style={{backgroundColor: 'red'}} onClick={deleteCard}/> */}
            </CardContainer>
            <button style={{backgroundColor: 'green'}} onClick={editCard}>submit</button>
        </EditCardContainer>
    )
}

export default EditCard

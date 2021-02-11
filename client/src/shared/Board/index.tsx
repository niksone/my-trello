import React from 'react'
import AddNewItem from '../AddNewItem'
import DragColumn from '../Column/DragColumn'
import CustomDragLayer from '../CustomDragLayer'
import { BoardContainer } from './BoardContainer'
import {AddItemState} from '../../redux/reducer'
import { useDispatch } from 'react-redux'

interface BoardProps {
    data: AddItemState
}

const Board = ({data}: BoardProps) => {
    const dispatch = useDispatch()

    return (
        <BoardContainer>
            {/* <FpsView width={100} height={100} left={0} top={0}/> */}
            <CustomDragLayer />
            {
            data.lists.map(list => 
                <DragColumn 
                title={list.title} 
                tasks={list.tasks} 
                id={list.id} 
                key={list.id}
                onAdd={(text: string)=>dispatch({type: 'ADD_TASK', payload: {text, listId: list.id}})}
                />
            )
            }
            <AddNewItem
            onAdd={text => dispatch({type: "ADD_LIST", payload: text})} 
            text='Add New List +'
            formText='Add List'
            item='ADDITEM'
            />
        </ BoardContainer>
    )
}

export default Board

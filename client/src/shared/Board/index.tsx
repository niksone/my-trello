import React from 'react'
import AddNewItem from '../AddNewItem'
import { BoardContainer } from './BoardContainer'
import {AddItemState} from '../../redux/AddItem/reducer'
import { useDispatch } from 'react-redux'

export interface BoardProps {
    data: AddItemState
}

const Board = ({data}: BoardProps) => {
    const dispatch = useDispatch()

    return (
        <BoardContainer>
           
        </ BoardContainer>
    )
}

export default Board

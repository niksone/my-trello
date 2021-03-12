import React, { MutableRefObject, Ref } from 'react'
import { isDebuggerStatement } from 'typescript'
import AddNewItem from '../AddNewItem'
import Card from '../Card'
import { AddItemState, Task } from '../../redux/AddItem/reducer'
import { ColumnCardContainer, ColumnContainer, ColumnTitle, ColumnTitleContainer, ColumnWrapper } from './ColumnElements'

export interface ColumnProps {
    title: string,
    tasks: Task[],
    id: string,
    onAdd(text: string): any,
    index: number,
    titleRef?: HTMLDivElement,
    isOver?: boolean
    isDragging?: boolean
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(({title, tasks, id, onAdd, isOver, isDragging}, ref) => {
    
    return (
        <ColumnContainer ref={ref}>
            <ColumnWrapper isOver={isOver} isDragging={isDragging} >
                <ColumnTitleContainer >
                    <ColumnTitle>{title}</ColumnTitle>
                </ColumnTitleContainer>
                <ColumnCardContainer>
                    
                    <AddNewItem 
                        text='Add New Task' 
                        formText='Add Task' 
                        onAdd={text => onAdd(text)}
                        item='COLUMN'
                    />
                </ColumnCardContainer>
            </ColumnWrapper>
        </ColumnContainer>
    )
})

export default Column

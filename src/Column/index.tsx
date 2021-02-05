import React, { MutableRefObject, Ref } from 'react'
import { isDebuggerStatement } from 'typescript'
import AddNewItem from '../AddNewItem'
import Card from '../Card'
import { AddItemState, Task } from '../redux/reducer'
import { ColumnCardContainer, ColumnContainer, ColumnTitle, ColumnTitleContainer, ColumnWrapper } from './ColumnElements'

export interface ColumnProps {
    title: string,
    tasks: Task[],
    id: string,
    onAdd(text: string): any,
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
                    {
                        tasks.map(task =>
                            <Card text={task.text} key={task.id}/>
                        )
                    }
                    <AddNewItem 
                        text='Add New Task' 
                        formText='Add Task' 
                        onAdd={text => onAdd(text)}
                    />
                </ColumnCardContainer>
            </ColumnWrapper>
        </ColumnContainer>
    )
})

export default Column

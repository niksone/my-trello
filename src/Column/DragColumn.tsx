import React, { useEffect, useRef } from 'react'
import {DragItem} from '../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Column, { ColumnProps } from '.'
import styled from 'styled-components'
import { RootReducerType } from '../redux/store'

const ColumnWrapper = styled.div`
    height: fit-content;
`


const DragColumn = ({title, tasks, id, onAdd}: ColumnProps) => { 
    const state = useSelector((state: RootReducerType) => state.addItem)
    const dispatch = useDispatch()

    const ref = useRef<HTMLDivElement>(null)

    // console.log('render');

    const [{isDragging}, drag, preview] = useDrag({
        item: {type: 'COLUMN', id, title, tasks},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
        end: () => dispatch({type: 'SET_DRAGGED_LIST', payload: ''})
    })

    const [{isOver}, drop] = useDrop({
        accept: "COLUMN",
        hover(item: DragItem) {
            const dragId = item.id
            const hoverId = id

            if(hoverId === dragId){
                if(state.draggedListId !== dragId){
                    dispatch({type: 'SET_DRAGGED_LIST', payload: dragId})
                }
                return
            } 
            dispatch({type: 'SET_DRAGGED_LIST', payload: dragId})
            dispatch({type: 'MOVE_LIST', payload: {hoverId, dragId}})
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })
    drag(drop(ref))
    

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
            <Column 
                id={id}
                title={title}
                tasks={tasks}
                isOver={state.draggedListId === id}
                onAdd={onAdd}
                ref={ref}
            />
    )
}

export default DragColumn


import React, { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { CardDragItem, DragItem } from '../redux/reducer'
import { RootReducerType } from '../redux/store'
import { CardContainer } from './CardElements'
import Card, {CardProps} from './index'

const DragCard = ({id, text, columnId}: CardProps) => {
    const state = useSelector((state: RootReducerType) => state.addItem)
    const dispatch = useDispatch()

    const ref = useRef<HTMLDivElement>(null)

    const [{isDragging}, drag, preview] = useDrag({
        item: {type: 'CARD', text, id, columnId},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
        end: () => dispatch({type: 'SET_DRAGGED_CARD', payload: ''})
    })

    const [{isOver}, drop] = useDrop({
        accept: "CARD",
        hover(item: CardDragItem) {
            const dragId = item.id
            const hoverId = id
            const dragColumnId = item.columnId
            const hoverColumnId = columnId

            if(hoverId === dragId){
                if(state.draggedCardId !== dragId){
                    dispatch({type: 'SET_DRAGGED_CARD', payload: dragId})
                }
                return
            } 
            // console.log(state);
            dispatch({type: 'SET_DRAGGED_CARD', payload: dragId})
            dispatch({type: 'MOVE_CARD', payload: {hoverId, dragId, hoverColumnId, dragColumnId}})
            item.columnId = hoverColumnId
        },
        // drop: () => dispatch({type: 'SET_DRAGGED_CARD', payload: ''}), 
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })
    drag(drop(ref))
    

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
        <Card 
            id={id}
            text={text}
            columnId={columnId}
            ref={ref}
            isOver={state.draggedCardId === id}
        />
    )
}

export default DragCard

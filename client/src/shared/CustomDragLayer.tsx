import React, { useCallback, useMemo } from 'react'
import { DragLayer, DragLayerMonitor, useDragLayer, XYCoord } from 'react-dnd'
import styled from 'styled-components'
import AddNewItem from './AddNewItem'
import Card from './Card'
import Column from './Column'
import { ColumnContainer, ColumnTitle } from './Column/ColumnElements'
import {Task} from '../redux/reducer'
const DragLayerContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    /* transform: rotateZ('100deg'); */
    pointer-events: none;
`



  const getItemStyles = (currentOffset: XYCoord | null) => {
    if (!currentOffset) {
        return {
            display: "none"
        }
    }

    const {x,y} = currentOffset
    // console.log(x, y);
    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform
    }
}

export const CustomDragLayer = () => {
    const {isDragging, item, currentOffset} = useDragLayer(monitor => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }))

    // console.log(item)

    const renderItem = (item: any) => {
        // console.log(item);

        switch(item.type){
            case 'COLUMN':
                return (
                    <Column
                        id={item.id}
                        title={item.title}
                        tasks={item.tasks}
                        onAdd={() => {}}
                        isDragging={isDragging}
                    />
                )
            case 'CARD':
                return (
                    <Card 
                        id={item.id}
                        text={item.text}
                        columnId={item.columnId}
                        isDragging={isDragging}
                    />
                )
        }
    }
    return (
        isDragging 
            ?   <DragLayerContainer >
                    <div style={getItemStyles(currentOffset)}>
                        {renderItem(item)}
                    </div>
                </DragLayerContainer> 
            : null
    )

}



// function collect(monitor: DragLayerMonitor) {
//     return {
//       item: monitor.getItem(),
//       itemType: monitor.getItemType(),
//       currentOffset: monitor.getSourceClientOffset(),
//       isDragging: monitor.isDragging()
//     }
//   }  


export default CustomDragLayer

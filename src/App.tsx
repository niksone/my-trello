import React, { useEffect, useRef } from 'react';
import Column from './Column';
import styled from 'styled-components'
import { GlobalStyles } from './globalStyles';
import { data } from './data';
import AddNewItem from './AddNewItem';
import {useDispatch, useSelector} from 'react-redux'
// import {RootReducerType} from './redux/store'
import { AddItemState } from './redux/reducer';
import { RootReducerType } from './redux/store';
import { useDrop } from 'react-dnd';
import CustomDragLayer from './CustomDragLayer';
import DragColumn from './Column/DragColumn';
import {FpsView} from 'react-fps'

const AppContainer = styled.div`
  background-color: lightblue;
  display: flex;
  align-items: flex-start;
  height: 100vh;
  /* width: 100%; */
  padding: 10px;
  overflow-x: scroll;
`


function App() {
  const data = useSelector((state: RootReducerType) => state.addItem)
  const ref = useRef(null)
  const dispatch = useDispatch()
  // console.log(`app ${JSON.stringify(data)}`);
  // console.log(data);

  //   const [{isOver}, drop] = useDrop({
  //     accept: "LIST",
  //     drop: () => console.log('dropped'), 
  //     collect: monitor => ({
  //         isOver: !!monitor.isOver()
  //     })
  // })
  // useEffect(() => {console.log(data)}, [data])
  return (
    <AppContainer>
      <FpsView width={100} height={100} left={0} top={0}/>
      <GlobalStyles />
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
      />
    </ AppContainer>
  );
}

export default App;

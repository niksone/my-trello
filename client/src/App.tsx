import React, { useEffect, useRef } from 'react';
import Column from './shared/Column';
import styled from 'styled-components'
import { GlobalStyles } from './globalStyles';
import { data } from './data';
import AddNewItem from './shared/AddNewItem';
import {useDispatch, useSelector} from 'react-redux'
// import {RootReducerType} from './redux/store'
import { AddItemState } from './redux/reducer';
import { RootReducerType } from './redux/store';
import { useDrop } from 'react-dnd';
import CustomDragLayer from './shared/CustomDragLayer';
import DragColumn from './shared/Column/DragColumn';
import {FpsView} from 'react-fps'
import { BoardContainer } from './shared/Board/BoardContainer';
import Header from './shared/Header';
import Board from './shared/Board';

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-areas: 
    'header'
    'board';
`


function App() {
  const data = useSelector((state: RootReducerType) => state.addItem)
  const ref = useRef(null)
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
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Board data={data}/>
      </AppContainer>
    </>
  );
}

export default App;

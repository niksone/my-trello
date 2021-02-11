import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { GlobalStyles } from './globalStyles';
import {useSelector} from 'react-redux'
import { RootReducerType } from './redux/store';
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

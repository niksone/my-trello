import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
import { GlobalStyles } from './globalStyles';
import {useSelector} from 'react-redux'
import { RootReducerType } from './redux/store';
import Header from './shared/Header';
import Board from './shared/Board';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './Auth/RegisterPage';
import BoardPage from './BoardPage';
import LoginPage from './Auth/LoginPage';



function App() {
  const data = useSelector((state: RootReducerType) => state.addItem)

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path='/' exact>
          <BoardPage data={data} />
        </Route>

        <Route path='/register'>
          <RegisterPage />
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

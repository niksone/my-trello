import React, { useContext, useEffect, useRef } from 'react';
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
import UserContext, { userContext } from './Context';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAuthRoute from './ProtectedAuthRoute';
import { AuthProvider } from './Context/context';



function App() {
  const data = useSelector((state: RootReducerType) => state.addItem)
  // const ctx = useContext(userContext)
  // console.log(ctx);

  return (
    <>
        <GlobalStyles />
        <UserContext>
            <Router>
            <Switch>
              <ProtectedRoute path='/' exact component={() => <BoardPage data={data} />} />
              <ProtectedAuthRoute path='/register' component={() => <RegisterPage />} />
              <ProtectedAuthRoute path='/login' component={() => <LoginPage />} />
              {/* {
              ctx._id ?
                <Route to='/'>
                  <BoardPage data={data} />
                </Route>
                :
              <Route to='/login'>
                <LoginPage />
              </Route>
              }  */}
            </Switch>
            </Router>
        </UserContext>
      </>
      
  );
}

export default App;

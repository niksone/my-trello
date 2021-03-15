import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { GlobalStyles } from './globalStyles';
import {useDispatch, useSelector} from 'react-redux'
import { RootReducerType } from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './Auth/RegisterPage';
import BoardPage from './BoardPage';
import LoginPage from './Auth/LoginPage';
import UserContext, { userContext } from './Context';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAuthRoute from './ProtectedAuthRoute';
import HomePage from './HomePage';
import { authApi } from './api';
import { getBoards } from './redux/Board/reducer';
import { useFetching } from './utils/useFetching';
// import {boards} from './data';



function App() {
  // useEffect(() => {
  //   const getUserBoards = (async () => {
  //     const user = await authApi.getUser()
  //     console.log(user);
  //     dispatch(getBoards(user))
  //   })()
  // }, [])


  return (
    <>
        <GlobalStyles />
        <UserContext>
            <Router>
            <Switch>
              <ProtectedRoute path='/' exact component={() => <HomePage />} />
              <ProtectedRoute path='/board/:id' children={() => <BoardPage />} />
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

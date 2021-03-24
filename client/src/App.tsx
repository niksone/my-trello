import React, { useContext, useEffect, useRef } from 'react';
import { GlobalStyles } from './globalStyles';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import RegisterPage from './Auth/RegisterPage';
import BoardPage from './BoardPage';
import LoginPage from './Auth/LoginPage';
import UserContext, { userContext } from './Context';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAuthRoute from './ProtectedAuthRoute';
import HomePage from './HomePage';
// import {boards} from './data';



function App() {

  return (
    <>
        <GlobalStyles />
        <UserContext>
            <Router>
            <Switch>
              <ProtectedRoute path='/board' exact component={() => <HomePage />} />
              <ProtectedRoute path='/board/:id' children={() => <HomePage />} />
              <ProtectedAuthRoute path='/register' component={() => <RegisterPage />} />
              <ProtectedAuthRoute path='/login' component={() => <LoginPage />} />
              <Redirect to='/board' />
            </Switch>
            </Router>
        </UserContext>
      </>
      
  );
}

export default App;

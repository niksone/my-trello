import React, { Suspense, useContext, useEffect, useRef } from 'react';
import { GlobalStyles } from './globalStyles';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import RegisterPage from './Auth/RegisterPage';
// import BoardPage from './BoardPage';
// import LoginPage from './Auth/LoginPage';
import UserContext, { userContext } from './Context';
import ProtectedRoute from './ProtectedRoute';
// import HomePage from './HomePage';
import Div100vh from './shared/Div100vh';

const HomePage = React.lazy(() => import('./HomePage'))
const RegisterPage = React.lazy(() => import('./Auth/RegisterPage'))
const LoginPage = React.lazy(() => import('./Auth/LoginPage'))


function App() {

  return (
    <Div100vh>
        <GlobalStyles />
        <UserContext>
            <Router>
            <Switch>
              <Suspense fallback={<div>suspense</div>} >
                <ProtectedRoute path='/board' exact component={() => <HomePage />} />
                <ProtectedRoute path='/board/:id' children={() => <HomePage />} />
                <ProtectedRoute auth path='/register' component={() => <RegisterPage />} />
                <ProtectedRoute auth path='/login' component={() => <LoginPage />} />
                <Redirect to='/board' />
              </ Suspense>
            </Switch>
            </Router>
        </UserContext>
      </Div100vh>
      
  );
}

export default App;

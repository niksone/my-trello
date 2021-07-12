import React, { Suspense} from 'react';
import { GlobalStyles } from './globalStyles';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import UserContext from './Context';
import ProtectedRoute from './ProtectedRoute';
import Div100vh from './shared/Div100vh';
import AppLoader from './shared/Loaders/AppLoader';

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
                  <Suspense fallback={<AppLoader />}>
                    <ProtectedRoute path='/board' exact component={() => <HomePage />} />
                    <ProtectedRoute path='/board/:id' component={() => <HomePage />} />
                    <ProtectedRoute auth path='/register' component={() => <RegisterPage />} />
                    <ProtectedRoute auth path='/login' component={() => <LoginPage />} />
                    <Redirect to='/board' />
                  </Suspense>
              </Switch>
            </Router>
        </UserContext>
      </Div100vh>
      
  );
}

export default App;

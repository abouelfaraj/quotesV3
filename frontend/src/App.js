import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import { AuthProvider } from './context/authContext';
import './assets/sass/style.scss';
import Feed from './pages/feeds';
import LoginOrRegister from './pages/auth';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute path="/feeds" component={Feed} />
          <Route path="/auth" component={LoginOrRegister} />
          <Redirect path="/" to="/feeds" />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
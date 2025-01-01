import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import { AuthProvider } from './context/authContext';
import './assets/sass/style.scss';
import Footer from './containers/layout/footer';
import Feed from './containers/feeds';
import LoginOrRegister from './containers/auth';
import PageNotFound from './containers/PageNotFound/PageNotFound';
import Profile from './containers/profile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <ProtectedRoute path="/feeds" exact component={Feed} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/auth" component={LoginOrRegister} />
          <Redirect path="/" to="/feeds" />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
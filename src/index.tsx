import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
} from 'react-router-dom';
import './index.module.css';
import { reportWebVitals } from './core/domain/reportWebVitals';
import { logger } from './core/domain/logger';
import { Navigation } from './core/presentation/Navigation';
import { Login } from './user/presentation/Login';
import { PrivateRoute, PublicRoute } from './core/presentation/Routes';
import { Dashboard } from './patient/presentation/Dashboard';
import { Register } from './user/presentation/Register';

const NoMatchPage: (_props: any) => JSX.Element = (_props: any) => {
  const location = useLocation();

  return (
    <section>
      <h1>😓 404 - Page not found</h1>
      The requested page ({location.pathname}) does not exist.
    </section>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: '/dashboard' }} />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/register">
          <Register />
        </PublicRoute>
        <Route path="*">
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(logger.info);

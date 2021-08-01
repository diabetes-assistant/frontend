import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom';
import './index.module.css';
import { reportWebVitals } from './core/domain/reportWebVitals';
import { logger } from './core/domain/logger';
import { Navigation } from './core/presentation/Navigation';
import { Login } from './user/presentation/Login';
import { PrivateRoute, PublicRoute } from './core/presentation/Routes';
import { Dashboard } from './patient/presentation/Dashboard';
import { Register } from './user/presentation/Register';
import { RegisterConfirmation } from './user/presentation/RegisterConfirmation';
import { NotFound } from './core/presentation/NotFound';

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
        <PublicRoute exact path="/register" component={withRouter(Register)} />
        <PublicRoute
          exact
          path="/register/confirmation"
          component={withRouter(RegisterConfirmation)}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(logger.info);

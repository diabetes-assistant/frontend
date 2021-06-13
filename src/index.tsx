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
import { Login } from './auth/presentation/Login';

const NoMatchPage: (_props: any) => JSX.Element = (_props: any) => {
  const location = useLocation();

  return (
    <section>
      <h1>😓 404 - Seite nicht gefunden</h1>
      Leider wurde diese Seite ({location.pathname}) nicht gefunden.
    </section>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: '/login' }} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(logger.info);

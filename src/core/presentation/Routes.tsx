import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../../auth/domain/loginService';

export function PrivateRoute(props: Readonly<RouteProps>): JSX.Element {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  const { component, ...rest } = props;
  return <Route {...rest} component={component} />;
}

export function PublicRoute(props: Readonly<RouteProps>): JSX.Element {
  if (isAuthenticated()) {
    return <Redirect to="/" />;
  }

  const { component, ...rest } = props;
  return <Route {...rest} component={component} />;
}

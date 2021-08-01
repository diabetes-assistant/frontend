import React, { FormEvent, useState } from 'react';
import classnames from 'classnames';
import { updateState } from '../../core/presentation/formHelper';
import { authenticate } from '../domain/authService';
import { logger } from '../../core/domain/logger';
import { ErrorInfo } from '../../core/presentation/ErrorInfo';
import styles from './Login.module.css';
import buttons from '../../core/presentation/buttons.module.css';

function signIn(
  email: string,
  password: string,
  errorFn: React.Dispatch<React.SetStateAction<string>>,
  successFn: any
) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return authenticate(email, password)
      .then((token) => {
        successFn();
        return token;
      })
      .catch((error: Error) => {
        logger.error('Was not able to authenticate', error);
        errorFn('E-Mail oder Passwort stimmen nicht. Bitte noch einmal versuchen.');
      });
  };
}

export function Login(_props: any): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirect: () => any = () => {
    window.location.href = '/dashboard';
    return true;
  };

  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <ErrorInfo errorMessage={error} />
      <form onSubmit={signIn(email, password, setError, redirect)}>
        <div className="group">
          <label htmlFor="email">
            E-Mail<sup>*</sup>
            <input
              type="email"
              name="email"
              id="email"
              data-testid="email"
              value={email}
              onChange={updateState(setEmail)}
              required
            />
          </label>
        </div>
        <div className="group">
          <label htmlFor="password">
            Passwort<sup>*</sup>
            <input
              type="password"
              name="password"
              id="password"
              data-testid="password"
              value={password}
              onChange={updateState(setPassword)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className={classnames(buttons.button, buttons.buttonPrimary)}
          data-testid="sign-in"
        >
          Anmelden
        </button>
      </form>
    </section>
  );
}

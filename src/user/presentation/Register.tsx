import React, { FormEvent, useState } from 'react';
import classnames from 'classnames';
import styles from './Register.module.css';
import { updateState } from '../../core/presentation/formHelper';
import buttons from '../../core/presentation/buttons.module.css';
import { ErrorInfo } from '../../core/presentation/ErrorInfo';
import { logger } from '../../core/domain/logger';
import { registerUser } from '../domain/userService';

function register(
  email: string,
  password: string,
  passwordConfirmation: string,
  errorFn: React.Dispatch<React.SetStateAction<string>>,
  successFn: any
) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessage =
      'E-Mail oder Passwörter sind ungültig. Bitte noch einmal versuchen.';
    if (passwordConfirmation !== password) {
      logger.error('Was not able to register, passwords do not match');
      errorFn(errorMessage);
      return errorMessage;
    }
    return registerUser(email, password)
      .then((_user) => {
        logger.info('Registered user');
        return successFn();
      })
      .catch((error: Error) => {
        logger.error('Was not able to register', error);
        errorFn(errorMessage);
      });
  };
}

export function Register({
  history,
}: {
  history: { push: (_: string) => any };
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const redirectToConfirmationPage: () => void = () => {
    history.push(`/register/confirmation?email=${email}`);
  };

  return (
    <section className={styles.register}>
      <h1>Registrierung</h1>
      <ErrorInfo errorMessage={error} />
      <form
        onSubmit={register(
          email,
          password,
          passwordConfirmation,
          setError,
          redirectToConfirmationPage
        )}
      >
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
        <div className="group">
          <label htmlFor="passwordConfirmation">
            Passwort bestätigen<sup>*</sup>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              data-testid="passwordConfirmation"
              value={passwordConfirmation}
              onChange={updateState(setPasswordConfirmation)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className={classnames(buttons.button, buttons.buttonPrimary)}
          data-testid="register"
        >
          Account erstellen
        </button>
      </form>
    </section>
  );
}

import React from 'react';
import styles from './RegisterConfirmation.module.css';

export function RegisterConfirmation({
  history,
  location,
}: {
  history: { push: (_: string) => any };
  location: { search: string };
}): JSX.Element {
  const urlParams = new URLSearchParams(location.search);
  const emailFromQuery = urlParams.get('email');
  if (!emailFromQuery || emailFromQuery === '') {
    history.push('/');
  }

  return (
    <section className={styles.confirmation}>
      <h1>
        Thank you for registering{' '}
        <span role="img" aria-label="party popper emoji">
          🎉
        </span>
      </h1>
      <p>
        We will be sending you a confirmation email to{' '}
        <span className={styles.confirmationEmail} data-testid="email">
          {emailFromQuery}
        </span>{' '}
        so you can confirm your registration.
      </p>
      <p>Please make sure to check your inbox for the confirmation mail.</p>
    </section>
  );
}

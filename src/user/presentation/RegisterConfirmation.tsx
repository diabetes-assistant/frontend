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
        Danke für die Registrierung{' '}
        <span role="img" aria-label="party popper emoji">
          🎉
        </span>
      </h1>
      <p>
        Wir werden in kürze eine Bestätigungsmail an die E-Mail{' '}
        <span className={styles.confirmationEmail} data-testid="email">
          {emailFromQuery}
        </span>{' '}
        verschicken. In dieser E-Mail finden Sie die weitere Anleitung zur
        Bestätigung.
      </p>
      <p>Bitte überprüfen Sie ihr E-Mail Postfach.</p>
    </section>
  );
}

import React from 'react';
import styles from './ErrorInfo.module.css';

export function ErrorInfo({
  errorMessage,
}: {
  errorMessage: string;
}): JSX.Element {
  if (errorMessage !== '') {
    return (
      <section className={styles.error} data-testid="error-info">
        {errorMessage}
      </section>
    );
  }
  return <></>;
}

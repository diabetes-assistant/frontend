import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound(_props: any): JSX.Element {
  const location = useLocation();

  return (
    <section className={styles.notFound}>
      <h1>😓 404 - Seite nicht gefunden</h1>
      Die Seite ({location.pathname}) konnte leider nicht gefunden werden.
    </section>
  );
}

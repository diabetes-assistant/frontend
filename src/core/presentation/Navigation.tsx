import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export function Navigation(_props: any): JSX.Element {
  return (
    <nav className={styles.navigation}>
      <section className={styles.logo}>
        <Link to="/">Diabetes Assistant</Link>
      </section>
      <section className={styles.links}>
        <Link to="/login">Login</Link>
      </section>
    </nav>
  );
}

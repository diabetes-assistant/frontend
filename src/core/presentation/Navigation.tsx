import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { isAuthenticated } from '../../user/domain/authService';

function renderLink(link: { name: string; path: string }): JSX.Element {
  return (
    <section className={styles.link}>
      <Link to={link.path}>{link.name}</Link>
    </section>
  );
}

function getLinks(): Array<{ name: string; path: string }> {
  if (isAuthenticated()) {
    return [
      {
        name: 'Dashboard',
        path: '/dashboard',
      },
    ];
  }
  return [
    {
      name: 'Login',
      path: '/login',
    },
    {
      name: 'Register',
      path: '/register',
    },
  ];
}

export function Navigation(_props: any): JSX.Element {
  const links = getLinks();
  return (
    <nav className={styles.navigation}>
      <section className={styles.logo}>
        <Link to="/">Diabetes Assistant</Link>
      </section>
      <section className={styles.links}>{links.map(renderLink)}</section>
    </nav>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Dashboard.module.css';
import buttons from '../../core/presentation/buttons.module.css';

export function Dashboard(_props: any): JSX.Element {
  return (
    <section className={styles.patientManagement}>
      <h1>Patient:innen Management</h1>
      <section className={styles.actionBar}>
        <Link
          to="/patients/add"
          className={classnames(buttons.button, buttons.buttonPrimary)}
          data-testid="add"
        >
          Patient:in hinzufügen
        </Link>
      </section>
    </section>
  );
}

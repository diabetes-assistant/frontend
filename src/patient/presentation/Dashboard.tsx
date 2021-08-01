import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Dashboard.module.css';
import buttons from '../../core/presentation/buttons.module.css';
import { findPatients, Patient } from '../domain/patientService';
import { logger } from '../../core/domain/logger';
import { ErrorInfo } from '../../core/presentation/ErrorInfo';

function renderPatient(patient: Patient): JSX.Element {
  return (
    <tr key={patient.id}>
      <td>{patient.email}</td>
    </tr>
  );
}

function renderPatients(
  patients: Patient[],
  error: undefined | string
): JSX.Element {
  if (error) {
    return <ErrorInfo errorMessage={error} />;
  }

  if (patients.length === 0) {
    return (
      <section className={styles.noPatientsHint}>
        Sie haben leider noch keine Patient:innen. Klicken sie oben auf
        &quot;Patient:in hinzufügen&quot;.
      </section>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.patientManagementEmail}>E-Mail</th>
        </tr>
      </thead>
      <tbody>{patients?.map(renderPatient)}</tbody>
    </table>
  );
}

export function Dashboard(_props: any): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<undefined | string>(undefined);
  useEffect(() => {
    findPatients()
      .then(setPatients)
      .catch((exception) => {
        logger.error('Was not able to get patients', exception);
        setError(
          'Es ist leider ein Fehler aufgetreten. Bitte versuchen sie es später erneut.'
        );
      });
  }, []);

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
      <section className={styles.patientsOverview}>
        {renderPatients(patients, error)}
      </section>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Add.module.css';
import buttons from '../../core/presentation/buttons.module.css';
import {
  Assignment,
  confirmDoctor,
  getOrCreateAssignment,
  Patient,
} from '../domain/patientService';
import { logger } from '../../core/domain/logger';
import { ErrorInfo } from '../../core/presentation/ErrorInfo';
import { getAssignment } from '../data/patientClient';

function renderCode(
  confirmationCode: string | undefined,
  error: string | undefined
): JSX.Element {
  if (error) {
    return (
      <p className={styles.confirmationCodeError}>
        <ErrorInfo errorMessage={error} />
      </p>
    );
  }
  return <p className={styles.confirmationCode}>{confirmationCode}</p>;
}

function renderPatientConfirmation(
  patient: Patient | undefined,
  buttonFn: any
): JSX.Element {
  if (patient) {
    return (
      <>
        <p>
          <b>Patient:in</b>
          <br />
          {patient.email}
        </p>
        <p>
          <button
            type="button"
            className={classNames(buttons.button, buttons.buttonPrimary)}
            onClick={buttonFn}
          >
            Patient:in bestätigen
          </button>
        </p>
      </>
    );
  }
  return (
    <p>
      <button type="button" className={buttons.buttonDeactivated}>
        Patient:in bestätigen
      </button>
    </p>
  );
}

export function AddPatient({
  history,
}: {
  history: { push: (_: string) => any };
}): JSX.Element {
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [error, setError] = useState<undefined | string>(undefined);
  const [patient, setPatient] = useState<undefined | Patient>(undefined);
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    getOrCreateAssignment()
      .then((assignment) => setConfirmationCode(assignment.code))
      .catch((exception) => {
        logger.error('Was not able to create confirmation code', exception);
        setError(
          'Es ist leider ein Fehler aufgetreten. Bitte versuchen Sie es erneut und aktualisieren Sie die Seite.'
        );
      });
  });
  useEffect(() => {
    setTimeout(() => {
      logger.info("Trying to enable confirm doctor")
      logger.info(timer)
        getAssignment(confirmationCode)
        .then((assignment) => setPatient(assignment.patient))
        .catch((exception) => {
          logger.error(
            'Was not able to get confirmed patient, trying again',
            exception
          );
          setTimer(timer + 1);
        });
    }, 1000);
  }, [confirmationCode, timer]);

  const buttonFn: () => Promise<Assignment> = () =>
    confirmDoctor(confirmationCode)
      .then((_) => history.push('/dashboard'))
      .catch(logger.error);

  return (
    <section className={styles.addPatient}>
      <h1>Patient:in hinzufügen</h1>
      <ol>
        <li>
          Informieren Sie den/die Patient:in in der App den Menüpunkt{' '}
          <i>&quot;Doktor:in hinzufügen&quot;</i> auszuwählen
        </li>
        <li>
          Der/die Patient:in muss als nächstes folgenden Bestätigungscode in der
          App eingeben:
          {renderCode(confirmationCode, error)}
        </li>
        <li>
          Als nächstes muss der/die Patient:in Sie as der/die behandelnde
          Doktor:in in der bestätigen
        </li>
        <li>
          Sobald Sie von ihrem/ihrer Patient:in bestätigt wurden, können Sie das
          mit einem Klick auf den unteren Button bestätigen:
          {renderPatientConfirmation(patient, buttonFn)}
        </li>
      </ol>
    </section>
  );
}

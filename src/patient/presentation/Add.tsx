import React, { useEffect, useState } from 'react';
import styles from './Add.module.css';
import buttons from '../../core/presentation/buttons.module.css';
import { createAssignment } from '../domain/patientService';
import { logger } from '../../core/domain/logger';
import { ErrorInfo } from '../../core/presentation/ErrorInfo';

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

export function AddPatient(_props: any): JSX.Element {
  const [confirmationCode, setConfirmationCode] = useState<undefined | string>(
    undefined
  );
  const [error, setError] = useState<undefined | string>(undefined);
  useEffect(() => {
    createAssignment()
      .then((assignment) => setConfirmationCode(assignment.code))
      .catch((exception) => {
        logger.error('Was not able to create confirmation code', exception);
        setError(
          'Es ist leider ein Fehler aufgetreten. Bitte versuchen Sie es erneut und aktualisieren Sie die Seite.'
        );
      });
  });

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
          <p>
            <button type="button" className={buttons.buttonDeactivated}>
              Patient:in bestätigen
            </button>
          </p>
        </li>
      </ol>
    </section>
  );
}

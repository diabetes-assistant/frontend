import React from 'react';
import styles from './Add.module.css';
import buttons from '../../core/presentation/buttons.module.css';

export function AddPatient(_props: any): JSX.Element {
  const confirmationCode = 'AAF3J';

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
          <p className={styles.confirmationCode}>{confirmationCode}</p>
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

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Dashboard } from './Dashboard';
import { findPatients, Patient } from '../domain/patientService';

jest.mock('../domain/patientService');

const findPatientsMock = findPatients as jest.Mock<Promise<Patient[]>>;

describe('Dashboard component', () => {
  it('should route to patient add', async () => {
    const patients = [{ id: 'foobar', email: 'foo@bar.com' }];
    findPatientsMock.mockResolvedValue(patients);
    const history = createMemoryHistory();
    await waitFor(() => {
      render(
        <Router history={history}>
          <Dashboard />
        </Router>
      );
    });

    const button = screen.getByTestId(/add/i);
    fireEvent.click(button);
    const actual = history.location.pathname;
    const expected = '/patients/add';

    expect(actual).toBe(expected);
  });

  it('should show one patient', async () => {
    const patients = [{ id: 'foobar', email: 'foo@bar.com' }];
    findPatientsMock.mockResolvedValue(patients);
    const history = createMemoryHistory();
    await waitFor(() => {
      render(
        <Router history={history}>
          <Dashboard />
        </Router>
      );
    });

    const patient = screen.getByText(/foo@bar.com/i);

    expect(patient).toBeInTheDocument();
  });

  it('should show no patient hint', async () => {
    const patients: Patient[] = [];
    findPatientsMock.mockResolvedValue(patients);
    const history = createMemoryHistory();
    await waitFor(() => {
      render(
        <Router history={history}>
          <Dashboard />
        </Router>
      );
    });

    const hint = screen.getByText(/noch keine patient:innen/i);

    expect(hint).toBeInTheDocument();
  });

  it('should show error hint', async () => {
    findPatientsMock.mockRejectedValue(new Error());
    const history = createMemoryHistory();
    await waitFor(() => {
      render(
        <Router history={history}>
          <Dashboard />
        </Router>
      );
    });

    const hint = screen.getByText(/fehler/i);

    expect(hint).toBeInTheDocument();
  });
});

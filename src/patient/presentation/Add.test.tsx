import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { AddPatient } from './Add';
import { Assignment, getOrCreateAssignment } from '../domain/patientService';

jest.mock('../domain/patientService');

const createAssignmentMock = getOrCreateAssignment as jest.Mock<
  Promise<Assignment>
>;

describe('AddPatient component', () => {
  it('should render', () => {
    createAssignmentMock.mockResolvedValue({ code: 'foobar' });
    render(<AddPatient />);

    const addElements = screen.getAllByText(/hinzufügen/i);

    expect(addElements.length).not.toBe(0);
  });

  it('should render the confirmation code', async () => {
    createAssignmentMock.mockResolvedValue({ code: 'foobar' });
    await waitFor(() => render(<AddPatient />));

    const confirmationCode = screen.getByText('foobar');

    return expect(confirmationCode).toBeInTheDocument();
  });

  it('should render repeat message when not able to create confirmation code', async () => {
    createAssignmentMock.mockRejectedValue(new Error('foo'));
    await waitFor(() => render(<AddPatient />));

    const errorMessage = screen.getByText(/fehler/i);

    await expect(errorMessage).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';
import { AddPatient } from './Add';

describe('AddPatient component', () => {
  it('should render', () => {
    render(<AddPatient />);
    const title = screen.getByText(/hinzufügen/i);

    expect(title).toBeInTheDocument();
  });
});

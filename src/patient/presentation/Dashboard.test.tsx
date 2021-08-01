import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Dashboard } from './Dashboard';

describe('Dashboard component', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );
  });

  it('should render', () => {
    const text = screen.getByText(/Patient:innen Management/i);

    expect(text).toBeInTheDocument();
  });

  it('should route to patient add', async () => {
    const button = screen.getByTestId(/add/i);

    fireEvent.click(button);

    await expect(screen.getByText(/hinzufügen/i)).toBeInTheDocument();
  });
});

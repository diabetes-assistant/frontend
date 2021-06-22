import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';

describe('Dashboard component', () => {
  it('should render', () => {
    render(<Dashboard />);

    const text = screen.getByText(/dashboard/i);

    expect(text).toBeInTheDocument();
  });
});

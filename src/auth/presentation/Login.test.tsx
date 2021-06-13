import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Login } from './Login';
import { authenticate, IDToken } from '../domain/loginService';

jest.mock('../domain/loginService');

const authenticateMock = authenticate as jest.Mock<Promise<IDToken>>;

describe('Login component', () => {
  beforeEach(() => {
    render(<Login />);
    authenticateMock.mockResolvedValue({
      name: 'foo bar',
      email: 'foo@bar.com',
      email_verified: true,
      sub: 'foo-000',
    });
  });

  it('should render login', () => {
    const text = screen.getByText(/login/i);

    expect(text).toBeInTheDocument();
  });

  it('should set state accordingly', () => {
    const emailField = screen.getByTestId(/email/i);
    const passwordField = screen.getByTestId(/password/i);

    fireEvent.change(emailField, { target: { value: 'foo@bar.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });

    expect(emailField).toHaveValue('foo@bar.com');
    expect(passwordField).toHaveValue('password');
  });

  it('should send state to service', async () => {
    const signInButton = screen.getByText(/sign in/i);
    const emailField = screen.getByTestId(/email/i);
    const passwordField = screen.getByTestId(/password/i);

    const email = 'foo@bar.com';
    fireEvent.change(emailField, { target: { value: email } });
    const password = 'password';
    fireEvent.change(passwordField, { target: { value: password } });

    await fireEvent.click(signInButton);

    await expect(authenticateMock).toHaveBeenCalledWith(email, password);
  });
});

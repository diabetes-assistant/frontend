import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Register } from './Register';
import { createUser, User } from '../domain/userService';

jest.mock('../domain/userService');

const registerMock = createUser as jest.Mock<Promise<User>>;

describe('Register component', () => {
  beforeEach(() => {
    render(<Register />);
    registerMock.mockResolvedValue({
      id: '1337',
      email: 'foo@bar.com',
    });
  });

  it('should render', () => {
    const text = screen.getByText(/create account/i);

    expect(text).toBeInTheDocument();
  });

  it('should set state accordingly', () => {
    const emailField = screen.getByTestId(/email/i);
    const passwordField = screen.getByTestId('password');
    const passwordConfirmationField = screen.getByTestId(
      'passwordConfirmation'
    );

    fireEvent.change(emailField, { target: { value: 'foo@bar.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: 'password' },
    });

    expect(emailField).toHaveValue('foo@bar.com');
    expect(passwordField).toHaveValue('password');
    expect(passwordConfirmationField).toHaveValue('password');
  });

  it('should send state to service', async () => {
    const emailField = screen.getByTestId(/email/i);
    const passwordField = screen.getByTestId('password');
    const passwordConfirmationField = screen.getByTestId(
      'passwordConfirmation'
    );
    const registerButton = screen.getByTestId('register');

    const email = 'foo@bar.com';
    const password = 'password';
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: password },
    });
    await fireEvent.click(registerButton);

    await expect(registerMock).toHaveBeenCalledWith(email, password);
  });

  it('should error when passwords do not match', async () => {
    const emailField = screen.getByTestId(/email/i);
    const passwordField = screen.getByTestId('password');
    const passwordConfirmationField = screen.getByTestId(
      'passwordConfirmation'
    );
    const registerButton = screen.getByTestId('register');

    const email = 'foo@bar.com';
    const password = 'password';
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(passwordConfirmationField, { target: { value: 'foo' } });
    await fireEvent.click(registerButton);

    await expect(registerMock).not.toBeCalled();
  });
});

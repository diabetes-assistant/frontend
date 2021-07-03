import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Register } from './Register';
import { registerUser, User } from '../domain/userService';

jest.mock('../domain/userService');

const registerMock = registerUser as jest.Mock<Promise<User>>;

describe('Register component', () => {
  let emailField: Node;
  let passwordField: Node;
  let passwordConfirmationField: Node;
  let registerButton: Node;
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    render(<Register history={{ push: pushMock }} />);
    registerMock.mockResolvedValue({
      id: '1337',
      email: 'foo@bar.com',
    });
    emailField = screen.getByTestId('email');
    passwordField = screen.getByTestId('password');
    passwordConfirmationField = screen.getByTestId('passwordConfirmation');
    registerButton = screen.getByTestId('register');
  });

  it('should render', () => {
    const text = screen.getByText(/create account/i);

    expect(text).toBeInTheDocument();
  });

  it('should set state accordingly', () => {
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
    const email = 'foo@bar.com';
    const password = 'password';
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: password },
    });
    await fireEvent.click(registerButton);

    await expect(registerMock).toHaveBeenCalledWith(email, password);
    await expect(pushMock).toHaveBeenCalled();
  });

  it('should error when passwords do not match', async () => {
    const email = 'foo@bar.com';
    const password = 'password';
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(passwordConfirmationField, { target: { value: 'foo' } });
    await fireEvent.click(registerButton);

    await expect(registerMock).not.toBeCalled();
  });
});

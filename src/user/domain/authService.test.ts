import { verify } from 'jsonwebtoken';
import { authenticate } from './authService';
import { createToken, TokenDTO } from '../data/loginClient';

jest.mock('../data/loginClient');
jest.mock('jsonwebtoken');

const createTokenMock = createToken as jest.Mock<Promise<TokenDTO>>;
const verifyMock = verify as jest.Mock;

describe('authenticate', () => {
  const validIdToken = {
    sub: 'foo bar',
    email: 'foo@bar.com',
  };
  const signedIdToken = 'foo';

  beforeEach(() => {
    createTokenMock.mockResolvedValue({
      idToken: signedIdToken,
      accessToken: signedIdToken,
    });
    verifyMock.mockReturnValue(validIdToken);
  });

  it('should send successful request to backend', async () => {
    const email = 'foo@bar.com';
    const password = 'password';

    const actual = authenticate(email, password);
    const expected = {
      userId: validIdToken.sub,
      email: validIdToken.email,
    };

    await expect(createTokenMock).toHaveBeenCalledWith({ email, password });
    await expect(verifyMock).toHaveBeenCalledWith(signedIdToken, 'secret');
    await expect(actual).resolves.toStrictEqual(expected);
  });

  it('should send error when verifying token fails', async () => {
    verifyMock.mockImplementation(() => {
      throw new Error('expected error when verifying token');
    });
    const email = 'foo@bar.com';
    const password = 'password';

    const actual = authenticate(email, password);

    await expect(createTokenMock).toHaveBeenCalledWith({ email, password });
    await expect(verifyMock).toHaveBeenCalledWith(signedIdToken, 'secret');
    await expect(actual).rejects.toThrow(Error);
  });
});

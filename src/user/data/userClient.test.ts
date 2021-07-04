import axios, { AxiosInstance } from 'axios';
import { postUser } from './userClient';

jest.mock('axios');

const axiosMock: jest.Mocked<AxiosInstance> = axios as any;
const AXIOS_CONFIG = { withCredentials: true };

describe('userClient', () => {
  it('should return created UserDTO', async () => {
    const email = 'foo@bar.com';
    const userDTO = { id: '1337', email };
    axiosMock.post.mockResolvedValue({ data: userDTO });
    const secret = 'secret';

    const actual = postUser(email, secret);
    const expected = userDTO;

    await expect(actual).resolves.toStrictEqual(expected);
    await expect(axiosMock.post).toHaveBeenCalledWith(
      'backend/user',
      {
        email,
        password: secret,
        role: 'doctor',
      },
      AXIOS_CONFIG
    );
  });
});

import { postUser, UserDTO } from '../data/userClient';
import { registerUser } from './userService';

jest.mock('../data/userClient');

const postUserMock = postUser as jest.Mock<Promise<UserDTO>>;

describe('userService', () => {
  it('should return created user', () => {
    const userDTO = { id: '1337', email: 'foo@bar.com' };
    postUserMock.mockResolvedValue(userDTO);

    const actual = registerUser('foo@bar.com', 'secret');
    const expected = { id: userDTO.id, email: userDTO.email };

    return expect(actual).resolves.toStrictEqual(expected);
  });

  it('should return any error', () => {
    const error = new Error();
    postUserMock.mockRejectedValue(error);

    const actual = registerUser('foo@bar.com', 'secret');
    const expected = error;

    return expect(actual).rejects.toStrictEqual(expected);
  });
});

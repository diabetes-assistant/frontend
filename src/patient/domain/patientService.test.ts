import { findPatients } from './patientService';
import { getPatients } from '../data/patientClient';
import { authenticatedUser } from '../../user/domain/authService';

jest.mock('../data/patientClient');
jest.mock('../../user/domain/authService');

const getPatientsMock = getPatients as jest.Mock;
const authenticatedUserMock = authenticatedUser as jest.Mock;

describe('patientService', () => {
  it('should get all patients from backend', () => {
    const patients = [{ id: 'foobar', email: 'foo@bar.com' }];
    getPatientsMock.mockResolvedValue(patients);
    const user = {
      userId: '1337',
      email: 'foo@bar.com',
    };
    authenticatedUserMock.mockReturnValue(user);

    const actual = findPatients();
    const expected = [{ id: 'foobar', email: 'foo@bar.com' }];

    expect(getPatientsMock).toHaveBeenCalledWith(user.userId);
    return expect(actual).resolves.toStrictEqual(expected);
  });

  it('should return error when user not authenticated', () => {
    authenticatedUserMock.mockReturnValue(undefined);

    const actual = findPatients();

    expect(getPatientsMock).not.toHaveBeenCalled();
    return expect(actual).rejects.not.toBeNull();
  });
});

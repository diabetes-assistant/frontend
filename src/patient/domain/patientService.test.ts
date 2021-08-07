import {
  getOrCreateAssignment,
  findPatients,
  findAssignment,
} from './patientService';
import {
  getAssignment,
  getInitialAssignments,
  getPatients,
  postAssignment,
} from '../data/patientClient';
import { authenticatedUser } from '../../user/domain/authService';

jest.mock('../data/patientClient');
jest.mock('../../user/domain/authService');

const getPatientsMock = getPatients as jest.Mock;
const postAssignmentMock = postAssignment as jest.Mock;
const getAssignmentsMock = getInitialAssignments as jest.Mock;
const getAssignmentMock = getAssignment as jest.Mock;
const authenticatedUserMock = authenticatedUser as jest.Mock;

describe('patientService', () => {
  describe('findPatients', () => {
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

  describe('getOrCreateAssignment', () => {
    it('should return created assignment', async () => {
      const user = {
        userId: '1337',
        email: 'foo@bar.com',
      };
      authenticatedUserMock.mockReturnValue(user);
      const assignment = { code: 'foobar' };
      getAssignmentsMock.mockResolvedValue([]);
      postAssignmentMock.mockResolvedValue(assignment);

      const actual = getOrCreateAssignment();
      const expected = { code: assignment.code };

      await expect(actual).resolves.toStrictEqual(expected);
    });

    it('should return already existing assignment', async () => {
      const user = {
        userId: '1337',
        email: 'foo@bar.com',
      };
      authenticatedUserMock.mockReturnValue(user);
      const assignment = { code: 'foobar' };
      getAssignmentsMock.mockResolvedValue([assignment]);

      const actual = getOrCreateAssignment();
      const expected = { code: assignment.code };

      await expect(actual).resolves.toStrictEqual(expected);
      await expect(postAssignment).not.toHaveBeenCalled();
    });

    it('should return error when user not authenticated', () => {
      authenticatedUserMock.mockReturnValue(undefined);

      const actual = getOrCreateAssignment();

      expect(postAssignmentMock).not.toHaveBeenCalled();
      return expect(actual).rejects.not.toBeNull();
    });
  });

  describe('getAssignment', () => {
    it('should return an assignment', () => {
      const assignment = {
        code: 'foobar',
        patient: {
          id: 'foo',
          email: 'foo@bar.com',
        },
      };
      getAssignmentMock.mockResolvedValue(assignment);
      const user = {
        userId: '1337',
        email: 'foo@bar.com',
      };
      authenticatedUserMock.mockReturnValue(user);

      const actual = findAssignment('foo');
      const expected = {
        code: 'foobar',
        patient: {
          id: 'foo',
          email: 'foo@bar.com',
        },
      };

      return expect(actual).resolves.toStrictEqual(expected);
    });

    it('should return error when user not authenticated', () => {
      authenticatedUserMock.mockReturnValue(undefined);

      const actual = findAssignment('foobar');

      expect(getAssignmentMock).not.toHaveBeenCalled();
      return expect(actual).rejects.not.toBeNull();
    });
  });
});

import {
  getOrCreateAssignment,
  findPatients,
  findAssignment,
  confirmDoctor,
} from './patientService';
import {
  getAssignment,
  getInitialAssignments,
  getPatients,
  postAssignment,
  putAssignment,
} from '../data/patientClient';
import { authenticatedUser } from '../../user/domain/authService';

jest.mock('../data/patientClient');
jest.mock('../../user/domain/authService');

const getPatientsMock = getPatients as jest.Mock;
const postAssignmentMock = postAssignment as jest.Mock;
const putAssignmentMock = putAssignment as jest.Mock;
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
      const assignment = { code: 'foobar', state: 'initial' };
      getAssignmentsMock.mockResolvedValue([]);
      postAssignmentMock.mockResolvedValue(assignment);

      const actual = getOrCreateAssignment();
      const expected = { code: assignment.code, state: 'initial' };

      await expect(actual).resolves.toStrictEqual(expected);
    });

    it('should return already existing assignment', async () => {
      const user = {
        userId: '1337',
        email: 'foo@bar.com',
      };
      authenticatedUserMock.mockReturnValue(user);
      const assignment = { code: 'foobar', state: 'initial' };
      getAssignmentsMock.mockResolvedValue([assignment]);

      const actual = getOrCreateAssignment();
      const expected = {
        code: assignment.code,
        patient: undefined,
        doctor: undefined,
        state: 'initial',
      };

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
        state: 'initial',
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
        state: 'initial',
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

  describe('confirmDoctor', () => {
    it('should confirm a doctor successfully', () => {
      const user = {
        userId: '1337',
        email: 'foo@bar.com',
      };
      authenticatedUserMock.mockReturnValue(user);
      const confirmationCode = 'foobar';
      const assignment = {
        code: confirmationCode,
        state: 'confirmed',
        doctor: undefined,
        patient: undefined,
      };
      getAssignmentMock.mockResolvedValue(assignment);
      const updatedAssignment = {
        code: confirmationCode,
        state: 'confirmed',
        doctor: { id: user.userId, email: user.email },
        patient: undefined,
      };
      putAssignmentMock.mockResolvedValue(updatedAssignment);

      const actual = confirmDoctor(confirmationCode);
      const expected = {
        code: confirmationCode,
        state: 'confirmed',
        doctor: { id: user.userId, email: user.email },
        patient: undefined,
      };

      return expect(actual).resolves.toStrictEqual(expected);
    });

    it('should return error when user not authenticated', () => {
      authenticatedUserMock.mockReturnValue(undefined);

      const actual = getOrCreateAssignment();

      expect(postAssignmentMock).not.toHaveBeenCalled();
      return expect(actual).rejects.not.toBeNull();
    });
  });
});

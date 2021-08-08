import axios, { AxiosInstance } from 'axios';
import {
  getAssignment,
  getInitialAssignments,
  getPatients,
  postAssignment,
  putAssignment,
} from './patientClient';

jest.mock('axios');

const axiosMock: jest.Mocked<AxiosInstance> = axios as any;
const AXIOS_CONFIG = {
  withCredentials: false,
  headers: { Authorization: 'Bearer null' },
};

describe('patientClient', () => {
  it('should return patients', async () => {
    const patients = [{ id: 'foobar', email: 'foo@bar.com' }];
    axiosMock.get.mockResolvedValue({ data: patients });

    const actual = getPatients('foobar');
    const expected = [{ id: 'foobar', email: 'foo@bar.com' }];

    await expect(actual).resolves.toStrictEqual(expected);
    await expect(axiosMock.get).toHaveBeenCalledWith(
      'backend/patient?doctorId=foobar',
      AXIOS_CONFIG
    );
  });

  it('should return created assignment', async () => {
    const code = { code: 'foobar' };
    axiosMock.post.mockResolvedValue({ data: code });

    const actual = postAssignment('bar');
    const expected = { code: 'foobar' };

    await expect(actual).resolves.toStrictEqual(expected);
    await expect(axiosMock.post).toHaveBeenCalledWith(
      'backend/assignment',
      { doctorId: 'bar' },
      AXIOS_CONFIG
    );
  });

  it('should return existing assignment', async () => {
    const code = { code: 'foobar' };
    axiosMock.get.mockResolvedValue({ data: [code] });

    const actual = getInitialAssignments('bar');
    const expected = [{ code: 'foobar' }];

    await expect(actual).resolves.toStrictEqual(expected);
    await expect(axiosMock.get).toHaveBeenCalledWith(
      'backend/assignment?doctorId=bar&state=initial',
      AXIOS_CONFIG
    );
  });

  it('should return an assignment', async () => {
    const patient = { id: 'foobar', email: 'foo@bar.com' };
    const assignment = { code: 'bar', patient };
    axiosMock.get.mockResolvedValue({ data: assignment });

    const actual = getAssignment('bar');
    const expected = { code: 'bar', patient };

    await expect(actual).resolves.toStrictEqual(expected);
    await expect(axiosMock.get).toHaveBeenCalledWith(
      'backend/assignment/bar',
      AXIOS_CONFIG
    );
  });

  it('should update an assignment', async () => {
    const patient = { id: 'foobar', email: 'foo@bar.com' };
    const doctor = { id: 'foobar', email: 'foo@bar.com' };
    const assignment = { code: 'code', patient, doctor, state: 'completed' };
    axiosMock.put.mockResolvedValue({ data: assignment });

    const actual = putAssignment(assignment);
    const expected = assignment;

    await expect(actual).resolves.toStrictEqual(expected);
    await expect(axiosMock.put).toHaveBeenCalledWith(
      'backend/assignment/code',
      assignment,
      AXIOS_CONFIG
    );
  });
});

import axios, { AxiosInstance } from 'axios';
import { getPatients, postAssignment } from './patientClient';

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

  it('should return assignment', async () => {
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
});

import axios from 'axios';
import { baseUrl, errorLogging, withTokenConfig } from '../../core/data/client';

export interface PatientDTO {
  id: string;
  email: string;
}

export function getPatients(userId: string): Promise<PatientDTO[]> {
  return axios
    .get(`${baseUrl}patient?doctorId=${userId}`, withTokenConfig)
    .then(({ data }) => data)
    .catch(errorLogging);
}

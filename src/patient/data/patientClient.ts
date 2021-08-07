import axios from 'axios';
import { baseUrl, errorLogging, withTokenConfig } from '../../core/data/client';

export interface PatientDTO {
  id: string;
  email: string;
}

export interface AssignmentDTO {
  code: string;
}

export function getPatients(userId: string): Promise<PatientDTO[]> {
  return axios
    .get(`${baseUrl}patient?doctorId=${userId}`, withTokenConfig)
    .then(({ data }) => data)
    .catch(errorLogging);
}

export function postAssignment(doctorId: string): Promise<AssignmentDTO> {
  return axios
    .post(`${baseUrl}assignment`, { doctorId }, withTokenConfig)
    .then(({ data }) => data)
    .catch(errorLogging);
}

export function getAssignments(doctorId: string): Promise<AssignmentDTO[]> {
  return axios
    .get(
      `${baseUrl}assignment?doctorId=${doctorId}&notCompleted=y`,
      withTokenConfig
    )
    .then(({ data }) => data)
    .catch(errorLogging);
}

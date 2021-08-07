import axios from 'axios';
import { baseUrl, errorLogging, withTokenConfig } from '../../core/data/client';

export interface PatientDTO {
  id: string;
  email: string;
}

export interface AssignmentDTO {
  code: string;
  patient?: PatientDTO;
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

export function getInitialAssignments(
  doctorId: string
): Promise<AssignmentDTO[]> {
  return axios
    .get(
      `${baseUrl}assignment?doctorId=${doctorId}&state=initial`,
      withTokenConfig
    )
    .then(({ data }) => data)
    .catch(errorLogging);
}

export function getAssignment(code: string): Promise<AssignmentDTO> {
  return axios
    .get(`${baseUrl}assignment?code=${code}`, withTokenConfig)
    .then(({ data }) => data)
    .catch(errorLogging);
}

import {
  getAssignment,
  getInitialAssignments,
  getPatients,
  PatientDTO,
  postAssignment,
  putAssignment,
} from '../data/patientClient';
import { authenticatedUser } from '../../user/domain/authService';

export interface Doctor {
  id: string;
  email: string;
}

export interface Patient {
  id: string;
  email: string;
}

function toPatient(dto: PatientDTO): Patient {
  return {
    id: dto.id,
    email: dto.email,
  };
}

export interface Assignment {
  code: string;
  patient?: Patient;
  doctor?: Doctor;
}

export function findPatients(): Promise<Patient[]> {
  const user = authenticatedUser();
  if (!user) {
    return Promise.reject(
      new Error('Was not able to get all patients, user not logged in')
    );
  }
  return getPatients(user.userId).then((dtos) => dtos.map(toPatient));
}

export function findAssignment(code: string): Promise<Assignment> {
  const user = authenticatedUser();
  if (!user) {
    return Promise.reject(
      new Error('Was not able to get all patients, user not logged in')
    );
  }

  return getAssignment(code).then((dto) => {
    if (!dto.patient) {
      throw new Error(
        'No patient available, it seems the assignment did not go as planned.'
      );
    }
    const patient = toPatient(dto.patient);
    return {
      code: dto.code,
      patient,
    };
  });
}

export async function getOrCreateAssignment(): Promise<Assignment> {
  const user = authenticatedUser();
  if (!user) {
    throw new Error('Was not able to create assignment, user not logged in');
  }

  const assignments = await getInitialAssignments(user.userId);
  if (assignments.length === 0) {
    const dto = await postAssignment(user.userId);
    return {
      code: dto.code,
    };
  }

  return {
    code: assignments[0].code,
  };
}

export function confirmDoctor(confirmationCode: string): Promise<Assignment> {
  const user = authenticatedUser();
  if (!user) {
    throw new Error('Was not able to create assignment, user not logged in');
  }

  return putAssignment(user.userId, confirmationCode);
}

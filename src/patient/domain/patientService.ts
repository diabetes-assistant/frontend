import {
  getAssignments,
  getPatients,
  PatientDTO,
  postAssignment,
} from '../data/patientClient';
import { authenticatedUser } from '../../user/domain/authService';

export interface Assignment {
  code: string;
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

export function findPatients(): Promise<Patient[]> {
  const user = authenticatedUser();
  if (!user) {
    return Promise.reject(
      new Error('Was not able to get all patients, user not logged in')
    );
  }
  return getPatients(user.userId).then((dtos) => dtos.map(toPatient));
}

export async function getOrCreateAssignment(): Promise<Assignment> {
  const user = authenticatedUser();
  if (!user) {
    throw new Error('Was not able to create assignment, user not logged in');
  }

  const assignments = await getAssignments(user.userId);
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

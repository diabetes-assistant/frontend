import { getPatients, PatientDTO } from '../data/patientClient';
import { authenticatedUser } from '../../user/domain/authService';

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

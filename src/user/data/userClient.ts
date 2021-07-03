import axios from 'axios';
import { baseUrl, config, errorLogging } from '../../core/data/client';

export interface UserDTO {
  id: string;
  email: string;
}

export function postUser(email: string, password: string): Promise<UserDTO> {
  return axios
    .post(`${baseUrl}user`, { email, password }, config)
    .then(({ data }) => data)
    .catch(errorLogging);
}

import axios from 'axios';
import { baseUrl, config, errorLogging } from '../../core/data/client';

export interface TokenDTO {
  idToken: string;
  accessToken: string;
}

export interface UserDTO {
  email: string;
  password: string;
}

export function createToken(dto: UserDTO): Promise<TokenDTO> {
  return axios
    .post(`${baseUrl}auth/token`, dto, config)
    .then(({ data }) => data)
    .catch(errorLogging);
}

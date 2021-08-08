import { JwtPayload, verify } from 'jsonwebtoken';
import { createToken } from '../data/loginClient';
import { logger } from '../../core/domain/logger';

const ID_TOKEN_KEY = 'idToken';
const ACCESS_TOKEN_KEY = 'accessToken';

export interface IDToken {
  userId: string;
  email: string;
}

export function isAuthenticated(): boolean {
  if (process.env.REACT_APP_LOCAL) {
    return true;
  }

  const idToken = localStorage.getItem(ID_TOKEN_KEY) || '';
  if (idToken === '') {
    return false;
  }

  const idTokenSecret: string = process.env.REACT_APP_ID_TOKEN_SECRET || '';
  try {
    verify(idToken, idTokenSecret, { audience: 'diabetes-assistant-client', issuer: 'diabetes-assistant-backend', ignoreExpiration: false});
    return true;
  } catch (error) {
    logger.error(error);
    signOutUser();
    return false;
  }
}

function extractIDToken(token: string): IDToken {
  const idTokenSecret: string = process.env.REACT_APP_ID_TOKEN_SECRET || '';
  const decodedIdToken = verify(token, idTokenSecret) as JwtPayload;
  return {
    userId: `${decodedIdToken.sub}`,
    email: `${decodedIdToken.email}`,
  };
}

export function authenticatedUser(): IDToken | undefined {
  if (process.env.REACT_APP_LOCAL) {
    return {
      userId: '1337',
      email: 'foo@bar.com',
    };
  }
  if (!isAuthenticated()) {
    return undefined;
  }

  const rawIdToken = localStorage.getItem(ID_TOKEN_KEY) || '';
  try {
    return extractIDToken(rawIdToken);
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export function signOutUser(): void {
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function authenticate(
  email: string,
  password: string
): Promise<IDToken> {
  return createToken({ email, password }).then((token) => {
    try {
      const idToken: IDToken = extractIDToken(token.idToken);
      localStorage.setItem(ID_TOKEN_KEY, token.idToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
      return idToken;
    } catch (error) {
      logger.error('Error verifying idToken', error);
      throw new Error('Was not able to login. Please try again.');
    }
  });
}

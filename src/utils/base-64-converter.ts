/* eslint-disable prettier/prettier */
import { LoginPayload } from '../auth/dto/loginPayload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayload => {

  const authorizationSplited = authorization.split('.');

  if (authorizationSplited.length < 3 || authorizationSplited[1] == undefined) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );

};

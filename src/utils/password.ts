/* eslint-disable prettier/prettier */
import { compare, hash } from 'bcrypt';

export const createHashedPassword = async (
  password: string
): Promise<string> => {
  const salt = 12;
  return hash(password, salt);
}

export const verifyHashedPassword = async (password:string, userPassword: string): Promise<boolean> => {
  return compare(password, userPassword)
}
import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt();
  return hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};

export default {
  hashPassword,
  comparePasswords,
};

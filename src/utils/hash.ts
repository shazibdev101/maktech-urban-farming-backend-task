import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * Hashes a plain text password using bcrypt.
 * @param password - Plain text password from user.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain text password with a stored hash.
 * @param password - Plain text input.
 * @param hash - Stored bcrypt hash.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

import bcryptjs from 'bcryptjs';

const saltRounds = 12; // Menentukan banyaknya salt rounds untuk hashing
const salt = await bcryptjs.genSalt(saltRounds);

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - Resolves with the hashed password.
 */
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

/**
 * Compares a plain password with a hashed password for validation.
 * @param {string} plainPassword - The plain password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - Resolves with true if the passwords match, otherwise false.
 */
export const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcryptjs.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error(`Error comparing passwords: ${error.message}`);
  }
};

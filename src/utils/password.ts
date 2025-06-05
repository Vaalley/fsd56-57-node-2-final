import argon2 from "argon2";
import logger from "./logger";

/**
 * Hash a password using Argon2.
 *
 * @param {string} password The password to hash.
 *
 * @returns {Promise<string>} The hashed password.
 */
export const hashPassword = async (password: string) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    logger.error("Erreur lors du hashage de mot de passe");
  }
};

/**
 * Verify a hashed password against a clear password.
 *
 * @param {string} hashed The hashed password.
 * @param {string} clear The clear password to verify against.
 *
 * @returns {Promise<boolean>} Whether the password is valid.
 */
export const verifyPassword = async (hashed: string, clear: string) => {
  try {
    const verify = await argon2.verify(hashed, clear);
    return verify;
  } catch (err) {
    logger.error("Erreur lors de la vérification: ", err);
  }
};

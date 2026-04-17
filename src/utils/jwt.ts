import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "maktech_urban_farming_super_secret_key_2024";

/**
 * Payload structure for JWT tokens.
 */
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Generates a signed JWT token with a 7-day expiration.
 * @param payload - User data to include in the token.
 */
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

/**
 * Verifies a JWT token string.
 * @param token - Bearer token from request.
 * @returns Decoded payload or null if invalid/expired.
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

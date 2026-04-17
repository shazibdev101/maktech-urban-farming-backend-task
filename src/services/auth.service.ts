import prisma from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

/**
 * Registers a new user and creates a vendor profile if the role is VENDOR.
 * @param userData - Object containing name, email, password, and role.
 * @returns Object with created user and JWT token.
 * @throws Error if user already exists.
 */
export const registerUser = async (userData: any) => {
  const { name, email, password, role } = userData;

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "CUSTOMER",
    },
  });

  // If vendor, create vendor profile
  if (role === "VENDOR") {
    await prisma.vendorProfile.create({
      data: {
        userId: user.id,
        farmName: `${name}'s Farm`, // Default farm name
        farmLocation: "Not Specified",
      },
    });
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
};

/**
 * Authenticates a user and returns a JWT token.
 * @param credentials - Object containing email and password.
 * @returns Object with user details and JWT token.
 * @throws Error if invalid credentials or inactive account.
 */
export const loginUser = async (credentials: any) => {
  const { email, password } = credentials;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("User account is inactive. Please contact admin.");
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return { user, token };
};

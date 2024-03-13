import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

// create jwt token
export const createToken = (
  JwtPayload: { userId: string; role: string; email: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(JwtPayload, secret, { expiresIn });
};

// verify jwt token
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

// bcrypt hash password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

// bcrypt compare password
export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

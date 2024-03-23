import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
    reset_password_secret: process.env.RESET_PASSWORD_TOKEN,
    reset_expires_in: process.env.RESET_EXPIRES_IN,
  },
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  emailSender: {
    smtp_email: process.env.SMTP_EMAIL,
    smtp_password: process.env.SMTP_PASSWORD,
  },
};

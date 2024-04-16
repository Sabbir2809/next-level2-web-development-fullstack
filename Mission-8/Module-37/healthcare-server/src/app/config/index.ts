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
  cloudinary: {
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  SSLCommerz: {
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
    is_live: process.env.IS_LIVE,
    ssl_payment_api: process.env.SSL_PAYMENT_API,
    ssl_validation_api: process.env.SSL_VALIDATION_API,
    success_url: process.env.SUCCESS_URL,
    fail_url: process.env.FAIL_URL,
    cancel_url: process.env.CANCEL_URL,
    ipn_url: process.env.IPN_URL,
  },
};

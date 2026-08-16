// config.ts
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret =  process.env.JWT_USER_PASSWORD;

if (!jwtSecret) {
  throw new Error(' JWT_USER_PASSWORD is not set in your .env file');
}

export const JWT_SECRET: string = jwtSecret;

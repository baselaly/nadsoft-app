import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT,
  RATE_TTL: process.env.RATE_TTL,
  RATE_LIMIT: process.env.RATE_LIMIT,
  DATABASE_URL: process.env.DATABASE_URL,
  USER_NAME: process.env.USER_NAME,
  PASSWORD: process.env.PASSWORD,
};


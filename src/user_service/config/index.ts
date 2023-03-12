import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  /**
   * Server port
   */
  port: parseInt(process.env.SERVER_PORT, 10),

  /**
   * Long string for DB connection
   */
  databaseUrl: process.env.POSTGRES_URL,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  jwtSecret: process.env.JWT_SECRET,
};

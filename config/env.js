// config/env.js
import { config } from "dotenv";

config(); 

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const ARC_JET_ENV = process.env.ARC_JET_ENV || 'development';



export const {
  JWT_SECRET, JWT_EXPIRES_IN,
  ARC_JET_KEY,
  QSTASH_NEXT_SIGNING_KEY, QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_TOKEN, QSTASH_URL,EMAIL_PASS
} = process.env;

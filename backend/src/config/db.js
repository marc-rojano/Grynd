import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// TODO: crear el pool de conexión a PostgreSQL usando process.env.DATABASE_URL
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// NOTE: This file should only be used in the backend service
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'arclimafrio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
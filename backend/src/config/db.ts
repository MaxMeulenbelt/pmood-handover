import mysql from 'mysql2'

/**
 * Creates a connection pool that can be used to execute sql queries on the database.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export default pool.promise()

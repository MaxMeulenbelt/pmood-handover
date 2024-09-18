import db from '../config/db'

/**
 * Gets all the records from the user table in the database and returns it.
 *
 * @returns records All the records in the user table.
 */
const getAllRecords = async () => {
  const sql = 'SELECT * FROM user;'

  const [records] = await db.execute(sql)

  return records
}

export default {
  getAllRecords,
}
